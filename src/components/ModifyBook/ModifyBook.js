import React from 'react'

import BookModify from 'components/BookModify'

const Props = {
  book: React.PropTypes.object,
  pushBook: React.PropTypes.func,
  push: React.PropTypes.func
}

export class ModifyBook extends React.Component {
  props: Props

  constructor (props) {
    super(props)

    this.bookId = this.props.location.query.modifyBookId

    this.modifyBook = this.modifyBook.bind(this)
  }

  modifyBook (book, bookId) {
    this.props.pushBook(book, bookId)
    this.props.push('/')
  }

  render () {
    let bookMessage = this.props.location.state

    return (
      <div>
        <BookModify {...{bookMessage: bookMessage, modify: this.modifyBook}} />
      </div>
    )
  }
}

export default ModifyBook
