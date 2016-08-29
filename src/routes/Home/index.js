import { injectReducer } from '../../store/reducers'

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Home = require('./containers/HomeContainer').default
      const booksReducer = require('./modules/books').default
      const booksFilter = require('./modules/filter').default

      injectReducer(store, { key: 'books', reducer: booksReducer })
      injectReducer(store, { key: 'booksFilter', reducer: booksFilter })
      cb(null, Home)
    }, 'home')
  }
})
