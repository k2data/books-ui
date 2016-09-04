import { connect } from 'react-redux'
// import { updateFilterText } from 'store/modules/user'
import ManagementToolbar from 'components/ManagementToolbar'

const mapActionCreators = {
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, mapActionCreators)(ManagementToolbar)
