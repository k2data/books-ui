import { applyMiddleware, compose, createStore } from 'redux'
import { createMiddleware, createLoader } from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
import filter from 'redux-storage-decorator-filter'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import { RESPONSE_LOGIN, SET_TOKEN, LOGOUT } from './modules/user'

export default (initialState = {}, history) => {
  // redux locale storage
  let engine = createEngine('books-user')
  engine = filter(engine, ['user'])
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, routerMiddleware(history),
    createMiddleware(engine, [],
      [ RESPONSE_LOGIN, SET_TOKEN, LOGOUT ])]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  const load = createLoader(engine)
  load(store)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
