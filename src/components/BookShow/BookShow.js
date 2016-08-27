import React from 'react'
import update from 'react-addons-update'
import BookEdit from 'components/BookEdit'
import BookView from 'components/BookView'
import classes from './BookShow.scss'

const Props = {
  bookShow: React.PropTypes.object,
  fetchBook: React.PropTypes.func
}

export class BookShow extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.state = { book: {} }
    this.state = { showBookEditDiv: false }
    this.convert = this.convert.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRenewBook = this.handleRenewBook.bind(this)
    this.handleRemoveBook = this.handleRemoveBook.bind(this)
  }

  componentDidMount () {
    this.props.fetchBook(this.props.routeParams.id)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ book: nextProps.bookShow.book })
  }

  handleChange (event) {
    this.setState({book: update(this.state.book, {
      [event.target.name]: {$set: this.convert(event.target.value, event.target.name)}
    })})
  }

  handleRemoveBook () {
    fetch(`${__API_URL__}/books/${this.state.book.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'eyJleHAiOjE0NzE0NjM4NDQsImlkIjoiYWRtaW4iLCJvcmlnX2lhdCI6MTQ3' +
        'MTQyMDY0NH0.A721xVtnqAUQ-2Ws-yCAVEZpGw2pEom3UghkDZqr9p0'
      }
    }).then((res) => {
      console.log(res)
    })
  }

  handleRenewBook () {
    fetch(`${__API_URL__}/books/${this.state.book.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'eyJleHAiOjE0NzE0NjM4NDQsImlkIjoiYWRtaW4iLCJvcmlnX2lhdCI6MTQ3' +
        'MTQyMDY0NH0.A721xVtnqAUQ-2Ws-yCAVEZpGw2pEom3UghkDZqr9p0'
      },
      body: JSON.stringify(this.state.book)
    })
  }

  convert (value, name) {
    switch (name) {
      case 'pages':
        return Number(value)
      default:
        return value
    }
  }

  render () {
    const { book } = this.state
    console.log(book)

    const showBookEditDiv = () => {
      this.setState({showBookEditDiv: !this.state.showBookEditDiv})
    }

    return (
      <div>
        <button className={classes.button} onClick={this.handleRemoveBook}>
        删除 </button>
        <button className={classes.button} onClick={showBookEditDiv}>
        更新/展示 </button>
        {this.state.showBookEditDiv
          ? true
          : <BookView {...{book}} />
        }
        {this.state.showBookEditDiv
          ? <div>
            <BookEdit {...{book, handleChange: this.handleChange}} />
            <button className={classes.button} onClick={this.handleRenewBook}>
            保存 </button>
          </div>
          : false
        }
      </div>
     )
  }
}

export default BookShow
