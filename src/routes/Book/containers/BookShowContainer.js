import { connect } from 'react-redux'
import { fetchBook, clearBook, borrowBook, returnBook } from '../modules/book'
import { fetchBRs, clearBRs } from '../modules/borrowRecord'
import { removeBook } from 'routes/Home/modules/books'
import BookShow from 'components/BookShow'

const mapActionCreators = {
  fetchBook, clearBook, borrowBook, returnBook, removeBook, fetchBRs, clearBRs
}

const mapStateToProps = (state) => ({
  book: state.book,
  borrowRecords: state.borrowRecords,
  user: state.user.user
})

export default connect(mapStateToProps, mapActionCreators)(BookShow)
