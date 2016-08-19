import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'newBook',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const NewBook = require('./containers/NewBookContainer').default
      const reducer = require('./modules/newBook').default

      /*  Add the reducer to the store on key 'bookShow'  */
      injectReducer(store, { key: 'newBook', reducer })

      /*  Return getComponent   */
      cb(null, NewBook)

    /* Webpack named bundle   */
    }, 'newBook')
  }
})
