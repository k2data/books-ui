import React from 'react'
import { Link } from 'react-router'
import classes from './Login.scss'

type Props = {
  book: Object,
  username: String,
  password: String,
  handleClick: Function,
  fetchToken: Function
}

export class Login extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    return () => {
      this.props.fetchToken(creds)
    }
  }

  render () {
    return (
      <div className={classes.page}>
        <h1>欢迎登录图书管理系统</h1>
        <form className={classes.login} onSubmit={this.handleSubmit}>
          <div className={classes.wrapper}>
            <label className={classes.label} htmlFor='username'>帐号</label>
            <input className={classes.input} type='text' ref='username' />
            <br />
            <label className={classes.label} htmlFor='password'>密码</label>
            <input className={classes.input} type='password' ref='password' />
          </div>
          <button className={classes.button} onClick={this.handleClick}>
          登录系统</button>
          <Link to='/'><button className={classes.button}>返回主页</button></Link>
        </form>
      </div>
    )
  }
}

export default Login
