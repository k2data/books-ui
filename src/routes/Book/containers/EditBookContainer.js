import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ModifyBook from 'components/ModifyBook'
import { pushBook } from '../modules/book'

const mapActionCreators = {
  pushBook, push
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapActionCreators)(ModifyBook)
