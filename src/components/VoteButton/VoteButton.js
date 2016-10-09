import React from 'react'
import classes from './VoteButton.scss'

function VoteButton (props) {
  return (
    <div className={classes['VoteButton']}>
      <svg width='20px' height='20px' viewBox='0 0 10 10'
        className={classes.voteUp}>
        <polygon id='voteUp' points='0,7 5,0 10,7 0,7' />
      </svg>
      <div className={classes.vote}>{props.vote || 0}</div>
      <svg width='20px' height='20px' viewBox='0 0 10 10'
        className={classes.voteDown}>
        <polygon id='voteDown' points='0,7 5,0 10,7 0,7' />
      </svg>
    </div>
  )
}

VoteButton.propTypes = {
  vote: React.PropTypes.number
}

export default VoteButton
