import React from 'react'
import SearchBar from 'components/SearchBar'
import classes from './BooksFilter.scss'

export const BooksFilter = (props) => (
  <div className={classes['BooksFilter']}>
    <SearchBar {...{bookFilter: props.bookFilter, updateFilterText: props.updateFilterText}} />
  </div>
)

BooksFilter.propTypes = {
  bookFilter: React.PropTypes.object,
  updateFilterText: React.PropTypes.string
}

export default BooksFilter
