import { connect } from 'react-redux'
import { fetchBook, clearBook, borrowBook, returnBook } from '../modules/book'
import { fetchBRs, clearBRs } from '../modules/borrowRecord'
import { removeBook } from 'routes/Home/modules/books'
import BookShow from 'components/BookShow'

const mapActionCreators = {
  fetchBook, clearBook, borrowBook, returnBook, removeBook, fetchBRs, clearBRs
}

// state.borrowRecords.sort is not a functin
// state.borrowRecords  ===> state.borrowRecords.data

const mapStateToProps = (state) => ({
  book: state.book,
  borrowRecords: state.borrowRecords.data.sort((br1, br2) => {
    const s1 = new Date(br1.startAt).getTime()
    const s2 = new Date(br2.startAt).getTime()
    return s2 - s1
  }),
  user: state.user.user
})

export default connect(mapStateToProps, mapActionCreators)(BookShow)
