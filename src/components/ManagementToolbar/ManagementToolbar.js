import React from 'react'
import { Link } from 'react-router'
import { Button } from 'antd'
import classes from './ManagementToolbar.scss'

export const ManagementToolbar = () => (
  <div className={classes['ManagementToolbar']}>
    <Link to='/newBook'><Button type='ghost'>新建</Button></Link>
    <Link to='/login'><Button type='ghost'>登录</Button></Link>
  </div>
)

export default ManagementToolbar
