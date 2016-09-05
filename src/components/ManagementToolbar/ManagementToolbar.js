import React from 'react'
import { Link } from 'react-router'
import { Button } from 'antd'
import classes from './ManagementToolbar.scss'

export const ManagementToolbar = (props) => (
  <div className={classes['ManagementToolbar']}>
    <Link to='/newBook'><Button type='ghost'>新建</Button></Link>
    {
      props.user.token
        ? <Link to='/login'><Button type='ghost' onClick={props.logout}>登出</Button></Link>
        : <Link to='/login'><Button type='ghost'>登录</Button></Link>
    }

  </div>
)

ManagementToolbar.propTypes = {
  user: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

export default ManagementToolbar
