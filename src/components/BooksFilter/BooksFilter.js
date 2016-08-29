import React from 'react'
import SearchBar from 'components/SearchBar'
import classes from './BooksFilter.scss'

export const BooksFilter = (props) => (
  <div className={classes['BooksFilter']}>
    <SearchBar {...{bookFilter: props.bookFilter, updateFilterText: props.updateFilterText}} />
    <button className={classes.button} onClick={filterOwned} >我自己的书</button>
    <button className={classes.button} onClick={filterBorrowed} >我借阅的书</button>
    <button className={classes.button} onClick={showDeleteButton}>删除(显/隐)</button>
  </div>
)

BooksFilter.propTypes = {
  bookFilter: React.PropTypes.object,
  updateFilterText: React.PropTypes.string
}

export default BooksFilter
