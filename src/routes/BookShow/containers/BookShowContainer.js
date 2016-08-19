import { connect } from 'react-redux'
import { fetchBook } from '../modules/bookShow'
import BookShow from 'components/BookShow'

const mapActionCreators = {
  fetchBook
}

const mapStateToProps = (state) => ({
  bookShow: state.bookShow
})

export default connect(mapStateToProps, mapActionCreators)(BookShow)
