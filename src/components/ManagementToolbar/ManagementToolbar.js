import React from 'react'
import { Link } from 'react-router'
import { Button } from 'antd'
import classes from './ManagementToolbar.scss'

export const ManagementToolbar = (props) => (
  <div className={classes['ManagementToolbar']}>
    <div className={classes.icon}>
      <Link to='/'>
        <i className='fa fa-book' aria-hidden='true' />
        K2 Books
      </Link>
    </div>
    <div className={classes.right}>
      {
        props.user.user && props.user.user.name === 'admin'
          ? <Link to='/books/creating'><Button type='ghost'>新建</Button></Link>
          : false
      }
      {
        props.user.token
          ? <Link to='/login'><Button type='ghost' onClick={props.logout}>登出</Button></Link>
          : <Link to='/login'><Button type='ghost'>登录</Button></Link>
      }

    </div>
  </div>
)

ManagementToolbar.propTypes = {
  user: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

export default ManagementToolbar
