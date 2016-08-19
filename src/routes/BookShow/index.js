import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'bookShow/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const BookShow = require('./containers/BookShowContainer').default
      const reducer = require('./modules/bookShow').default

      /*  Add the reducer to the store on key 'bookShow'  */
      injectReducer(store, { key: 'bookShow', reducer })

      /*  Return getComponent   */
      cb(null, BookShow)

    /* Webpack named bundle   */
    }, 'bookShow')
  }
})
