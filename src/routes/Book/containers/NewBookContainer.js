import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import NewBook from 'components/NewBook'
import { postBook } from '../modules/book'

const mapActionCreators = {
  postBook, push
}

const mapStateToProps = (state) => ({
  book: state.book
})

export default connect(mapStateToProps, mapActionCreators)(NewBook)
