import React from 'react'
import update from 'react-addons-update'
import { Link } from 'react-router'
import BookEdit from 'components/BookEdit'
import classes from './NewBook.scss'

const Props = {
  newBook: React.PropTypes.object
}

export class NewBook extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.state = { book: {} }
    this.convert = this.convert.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  convert (value, name) {
    switch (name) {
      case 'pages':
        return Number(value)
      default:
        return value
    }
  }

  handleSubmit (id) {
    fetch(`${__API_URL__}/books`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'eyJleHAiOjE0NzE2MjA4NjgsImlkIjoiYWRtaW4iLCJvcmlnX2lhdCI6MTQ3' +
        'MTU3NzY2OH0.9lksGXubWCY7e3nj-xyk056Or-94nJGWM2mOX6zSgWU'
      },
      body: JSON.stringify(this.state.book)
    })
  }

  handleChange (event) {
    this.setState({book: update(this.state.book, {
      [event.target.name]: {$set: this.convert(event.target.value, event.target.name)}
    })})
  }

  render () {
    const { book } = this.state
    console.log(this.state.book)

    return (
      <div>
        <Link to='/'>
          <button className={classes.button} onClick={this.handleSubmit}>
          新建</button>
        </Link>
        < BookEdit {...{book, handleChange: this.handleChange}} />
      </div>
     )
  }
}

export default NewBook
