import React, { Component } from 'react'
import { Input } from 'antd'
import classes from './SearchBar.scss'

type Props = {
  updateFilterText: Object,
  filter: String
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
      <div className={classes.SearchBar}>
        <Input type='text' placeholder='Search'
          onChange={this.handleChange} value={this.props.filter.text} />
      </div>
    )
  }
}
