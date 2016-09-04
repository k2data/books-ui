import React from 'react'
import { Button } from 'antd'
import SearchBar from 'components/SearchBar'
import classes from './BooksFilter.scss'

export const BooksFilter = (props) => (
  <div className={classes['BooksFilter']}>
    <SearchBar {...{filter: props.filter, updateFilterText: props.updateFilterText}} />
    <Button type='ghost' onClick={props.filterOwned}>我自己的书</Button>
    <Button type='ghost' onClick={props.filterBorrowed}>我借阅的书</Button>
    <Button type='ghost' onClick={props.showDeleteButton}>删除(显/隐)</Button>
  </div>
)

BooksFilter.propTypes = {
  filter: React.PropTypes.object,
  updateFilterText: React.PropTypes.func,
  filterOwned: React.PropTypes.func,
  filterBorrowed: React.PropTypes.func,
  showDeleteButton: React.PropTypes.func
}

export default BooksFilter
