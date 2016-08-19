import { connect } from 'react-redux'
import { updateToken, fetchToken } from '../modules/login'
import Login from 'components/Login'

const mapActionCreators = {
  updateToken, fetchToken
}

const mapStateToProps = (state) => ({
  login: state.login
})

export default connect(mapStateToProps, mapActionCreators)(Login)
