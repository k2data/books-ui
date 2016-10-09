import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'books/:bookId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */

      const Book = nextState.params.bookId !== 'creating'
        ? require('./containers/BookShowContainer').default
        : require('./containers/NewBookContainer').default
      const bookReducer = require('./modules/book').default
      const brReducer = require('./modules/borrowRecord').default

      /*  Add the reducer to the store on key 'bookShow'  */
      injectReducer(store, { key: 'book', reducer: bookReducer })
      injectReducer(store, { key: 'borrowRecords', reducer: brReducer })

      /*  Return getComponent   */
      cb(null, Book)

    /* Webpack named bundle   */
    }, 'newBook')
  }
})
