import { connect } from 'react-redux'
import { logout } from 'store/modules/user'
import ManagementToolbar from 'components/ManagementToolbar'

const mapActionCreators = {
  logout
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, mapActionCreators)(ManagementToolbar)
