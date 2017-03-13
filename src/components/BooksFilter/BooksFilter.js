import React from 'react'
import { Checkbox } from 'antd'
import SearchBar from 'components/SearchBar'
import ViewSelector from 'components/ViewSelector'
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
    const { filter, updateFilterText, actions } = this.props
    const { owned, borrowed, showDeleteBtn, view } = filter
    const { changeView } = actions

    return (
      <div className={classes['filter']}>
        <SearchBar {...{filter, updateFilterText}} />
        <div className={classes['oprs']}>
          <Checkbox checked={owned} onChange={this.handleOwnedChange}>我自己的书</Checkbox>
          <Checkbox checked={borrowed} onChange={this.handleBorrowedChange}>我借阅的书</Checkbox>
          <Checkbox checked={showDeleteBtn} onChange={this.handleShowDeleteBtnChange}>编辑</Checkbox>

          {/* Do not show edit-button for users
            ==============================================================
            this.props.user.user && this.props.user.user.name === 'admin'
              ? <Checkbox checked={showDeleteBtn} onChange={this.handleShowDeleteBtnChange}>编辑</Checkbox>
              : false
          */}
          <div style={{ float: 'right' }}>
            <ViewSelector view={view} onChange={changeView} />
          </div>
        </div>
      </div>
    )
  }
}

export default BooksFilter
