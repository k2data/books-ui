import React from 'react'
import BookEdit from 'components/BookEdit'
// import classes from './NewBook.scss'

// Props.book 并没有使用，不需要传入
const Props = {
  book: React.PropTypes.object,
  postBook: React.PropTypes.func,
  push: React.PropTypes.func
}

export class NewBook extends React.Component {
  props: Props

  constructor (props) {
    super(props)

    this.saveNewBook = this.saveNewBook.bind(this)
  }

  saveNewBook (book) {
    this.props.postBook(book)
    this.props.push('/')
  }

  render () {
    return (
      <div>
        <BookEdit {...{book: {}, save: this.saveNewBook}} />
      </div>
    )
  }
}

export default NewBook
