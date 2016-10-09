import { connect } from 'react-redux'
import { fetchBook, clearBook, borrowBook } from '../modules/book'
import { fetchBRs } from '../modules/borrowRecord'
import { removeBook } from 'routes/Home/modules/books'
import BookShow from 'components/BookShow'

const mapActionCreators = {
  fetchBook, clearBook, borrowBook, removeBook, fetchBRs
}

const mapStateToProps = (state) => ({
  book: state.book,
  borrowRecords: state.borrowRecords,
  user: state.user.user
})

export default connect(mapStateToProps, mapActionCreators)(BookShow)
