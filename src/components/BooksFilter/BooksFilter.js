import React from 'react'
import { Checkbox } from 'antd'
import SearchBar from 'components/SearchBar'
import classes from './BooksFilter.scss'

const Props = {
  filter: React.PropTypes.object,
  actions: React.PropTypes.object,
  updateFilterText: React.PropTypes.func,
  filterOwned: React.PropTypes.func,
  filterBorrowed: React.PropTypes.func,
  showDeleteButton: React.PropTypes.func,
  fetchBooks: React.PropTypes.func
}

export class BooksFilter extends React.Component {
  props: Props

  constructor (props) {
    super(props)

    this.handleOwnedChange = this.handleOwnedChange.bind(this)
    this.handleBorrowedChange = this.handleBorrowedChange.bind(this)
    this.handleShowDeleteBtnChange = this.handleShowDeleteBtnChange.bind(this)
  }

  handleOwnedChange (e) {
    this.props.actions.filterOwned(e.target.checked)
    this.props.fetchBooks()
  }

  handleBorrowedChange (e) {
    this.props.actions.filterBorrowed(e.target.checked)
    this.props.fetchBooks()
  }

  handleShowDeleteBtnChange (e) {
    this.props.actions.showDeleteButton(e.target.checked)
  }

  render () {
    const { filter, updateFilterText } = this.props
    const { owned, borrowed, showDeleteBtn } = filter

    return (
      <div className={classes['BooksFilter']}>
        <SearchBar {...{filter, updateFilterText}} />
        <Checkbox checked={owned} onChange={this.handleOwnedChange}>我自己的书</Checkbox>
        <Checkbox checked={borrowed} onChange={this.handleBorrowedChange}>我借阅的书</Checkbox>
        <Checkbox checked={showDeleteBtn} onChange={this.handleShowDeleteBtnChange}>编辑</Checkbox>
      </div>
    )
  }
}

export default BooksFilter
