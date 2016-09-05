import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer } from 'redux-storage'
import user from './modules/user'

export const makeRootReducer = (asyncReducers) => {
  return reducer(combineReducers({
    user,
    router,
    ...asyncReducers
  }))
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
