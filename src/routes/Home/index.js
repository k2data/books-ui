import { injectReducer } from '../../store/reducers'

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Home = require('./containers/HomeContainer').default
      const reducer = require('./modules/bookFilter').default

      injectReducer(store, { key: 'bookFilter', reducer })
      cb(null, Home)
    }, 'home')
  }
})
