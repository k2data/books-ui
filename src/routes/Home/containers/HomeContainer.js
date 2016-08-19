import { connect } from 'react-redux'
import { updateFilterText, fetchBooks, removeBook } from '../modules/bookFilter'
import HomeView from '../components/HomeView'

const mapActionCreators = {
  updateFilterText, fetchBooks, removeBook
}

const mapStateToProps = (state) => ({
  bookFilter: state.bookFilter
})

export default connect(mapStateToProps, mapActionCreators)(HomeView)
