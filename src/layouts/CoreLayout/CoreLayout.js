import React from 'react'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import 'font-awesome/css/font-awesome.css'

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
