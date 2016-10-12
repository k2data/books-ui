import React from 'react'
import update from 'react-addons-update'
import R from 'ramda'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import VoteButton from 'components/VoteButton'
import BookView from 'components/BookView'
import classes from './BookShow.scss'

const Props = {
  book: React.PropTypes.object,
  borrowRecords: React.PropTypes.object,
  user: React.PropTypes.object,
  fetchBook: React.PropTypes.func,
  borrowBook: React.PropTypes.func,
  returnBook: React.PropTypes.func,
  removeBook: React.PropTypes.func,
  fetchBRs: React.PropTypes.func,
  clearBRs: React.PropTypes.func,
  clearBook: React.PropTypes.func
}

export class BookShow extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.state = { showBookEditDiv: false }

    this.isBookChanged = this.isBookChanged.bind(this)
    this.isBookBorrowed = this.isBookBorrowed.bind(this)
    this.fetchBorrowRecords = this.fetchBorrowRecords.bind(this)
    this.convert = this.convert.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRenewBook = this.handleRenewBook.bind(this)
    this.handleRemoveBook = this.handleRemoveBook.bind(this)
  }

  componentDidMount () {
    this.props.fetchBook(this.props.routeParams.bookId)
  }

  componentWillReceiveProps (nextProps) {
    if (this.isBookChanged(nextProps)) {
      this.fetchBorrowRecords(nextProps)
    }
  }

  componentWillUnmount () {
    this.props.clearBook()
  }

  isBookChanged (nextProps) {
    // const {data: { borrowers = [] } = {}} = nextProps
    return !R.equals(this.props.book.data, nextProps.book.data)
  }

  isBookBorrowed (props) {
    return props.book.data.borrowers &&
      props.book.data.borrowers.length > 0
  }

  fetchBorrowRecords (props) {
    const { book: { data: book = {} } = {} } = props
    if (this.isBookBorrowed(props)) {
      this.props.fetchBRs({
        bookID: book.id,
        userIDs: book.borrowers
          .map((borrower) => borrower.id)
          .join(','),
        status: '借阅中'
      })
    } else {
      this.props.clearBRs()
    }
  }

  handleChange (event) {
    this.setState({book: update(this.state.book, {
      [event.target.name]: {$set: this.convert(event.target.value, event.target.name)}
    })})
  }

  handleRemoveBook () {
    this.props.removeBook(this.props.book.data.id)
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
    const { book: { data: book },
      borrowRecords, user, borrowBook, returnBook } = this.props
    console.log(book)

    return (
      <div>
        <div className={classes.info}>
          <div className={classes.mainInfo}>
            <BookView {...{
              book, borrowRecords, user, borrowBook, returnBook}} />
          </div>
          <div className={classes.toolbar}>
            <VoteButton />
          </div>
        </div>
        <div className={classes.moreInfo}>
          <Tabs className={classes.tab} onSelect={this.handleSelect} selectedIndex={2}>
            <TabList className={classes.tabList}>
              <Tab>读者评论</Tab>
              <Tab>图书内容</Tab>
              <Tab>出版信息</Tab>
              <Tab>借阅记录</Tab>
            </TabList>
            <TabPanel className={classes.tabPanel}>
              <h3>读者评论</h3>
              <p>这里是读者评论区域，请在这里留下你的评论</p>
            </TabPanel>
            <TabPanel className={classes.tabPanel}>
              <h3>图书内容</h3>
              <p>这里是图书内容区域，请在这里输入图书的内容简介</p>
            </TabPanel>
            <TabPanel className={classes.tabPanel}>
              <h3>借阅记录</h3>
              <p>这里是借阅记录区域，请在这里输入图书的借阅记录</p>
            </TabPanel>
          </Tabs>
        </div>
      </div>
     )
  }
}

export default BookShow
