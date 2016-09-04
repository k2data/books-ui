import { connect } from 'react-redux'
import { login } from 'store/modules/user'
import Login from 'components/Login'

const mapActionCreators = {
  login
}

const mapStateToProps = (state) => ({
  // user: state.user
  isLoggingIn: state.user.isLoggingIn
})

export default connect(mapStateToProps, mapActionCreators)(Login)
