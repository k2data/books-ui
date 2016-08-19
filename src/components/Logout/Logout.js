import React, { PropTypes } from 'react'
import classes from './Logout.scss'

export class Logout extends React.Component {

  render () {
    const { onLogoutClick } = this.props
    return (
      <button onClick={onLogoutClick()} className={classes.button}>
        Logout
      </button>
    )
  }
}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired
}
export default Logout
