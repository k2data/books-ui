import { connect } from 'react-redux'
import { fetchBook } from '../modules/book'
import BookShow from 'components/BookShow'

const mapActionCreators = {
  fetchBook
}

const mapStateToProps = (state) => ({
  bookShow: state.bookShow
})

export default connect(mapStateToProps, mapActionCreators)(BookShow)
