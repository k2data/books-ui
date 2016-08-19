import { connect } from 'react-redux'
import NewBook from 'components/NewBook'

const mapActionCreators = {
}

const mapStateToProps = (state) => ({
  newBook: state.newBook
})

export default connect(mapStateToProps, mapActionCreators)(NewBook)
