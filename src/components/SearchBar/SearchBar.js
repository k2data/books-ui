import React, { Component } from 'react'
import classes from './SearchBar.scss'

type Props = {
  updateFilterText: Function,
  bookFilter: String
}

export default class SearchBar extends Component {
  props: Props
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (e) {
    this.props.updateFilterText(e.target.value)
  }
  render () {
    return (
      <div>
        <input type='text' className={classes.searchBar} placeholder='Search'
          onChange={this.handleChange} value={this.props.bookFilter.text} />
      </div>
    )
  }
}
