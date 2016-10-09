import React from 'react'
import classes from './BookTag.scss'

export function BookTag (props) {
  return (
    <span className={classes['BookTag']}>
      {props.title}
    </span>
  )
}

BookTag.propTypes = {
  title: React.PropTypes.string
}

export default BookTag
