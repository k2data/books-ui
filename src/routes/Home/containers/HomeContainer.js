import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSelector } from 'reselect'
import { fetchBooks, removeBook } from '../modules/books'
import { updateFilterText, actions } from '../modules/filter'
import HomeView from '../components/HomeView'

/**
 * 通过rest接口过滤
 */
const getFilterText = (state) => state.booksFilter ? state.booksFilter.text : ''
const getBooks = (state) => state.books ? state.books.data : []
// const getUser = (state) => state.user

const getTextFilteredBooks = createSelector(
  [ getFilterText, getBooks ],
  (filterText, books) => {
    return books.filter((book) => {
      return JSON.stringify(book).indexOf(filterText) !== -1
    })
  }
)
//
// export const getOwnedBooks = createSelector(
//   [ getUser, getBooks ],
//   (user, books) => {
//     return books.filter((book) => {
//       return book.owner === user.name
//     })
//   }
// )
//
// export const getBorrowedBooks = createSelector(
//   [ getUser, getBooks ],
//   (user, books) => {
//     return books.filter((book) => {
//       return books.borrowers.indexOf(user.name) >= 0
//     })
//   }
// )
//
// // TODO: filterBorrowed === true ???? filterBorrowed === true

const mapActionCreators = (dispatch) => {
  let mappedActions = bindActionCreators(
    {updateFilterText, fetchBooks, removeBook}, dispatch)

  mappedActions.filterActions = bindActionCreators(actions, dispatch)

  return mappedActions
}

const mapStateToProps = (state) => ({
  books: getTextFilteredBooks(state),
  filter: state.booksFilter
})

export default connect(mapStateToProps, mapActionCreators)(HomeView)
