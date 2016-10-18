import React from 'react'
import update from 'react-addons-update'
import R from 'ramda'
import moment from 'moment'
import { Table, Tabs, Icon } from 'antd'
import VoteButton from 'components/VoteButton'
import BookView from 'components/BookView'
import classes from './BookShow.scss'

const TabPane = Tabs.TabPane

const columns = [{
  title: '借书人',
  dataIndex: 'user.name',
  key: 'borrower'
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status'
}, {
  title: '借书时间',
  dataIndex: 'startAt',
  key: 'startAt',
  render: text => moment(new Date(text)).format('YYYY/MM/DD')
}, {
  title: '还书时间',
  dataIndex: 'endAt',
  key: 'endAt',
  render: text => moment(new Date(text)).format('YYYY/MM/DD')
}]

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

    this.getTitle = this.getTitle.bind(this)
    this.integrateDiscourse = this.integrateDiscourse.bind(this)
    this.integrateDisqus = this.integrateDisqus.bind(this)
    this.updateDocTitle = this.updateDocTitle.bind(this)
    this.isBookChanged = this.isBookChanged.bind(this)
    this.isBookBorrowed = this.isBookBorrowed.bind(this)
    this.fetchBorrowRecords = this.fetchBorrowRecords.bind(this)
    this.convert = this.convert.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRenewBook = this.handleRenewBook.bind(this)
    this.handleRemoveBook = this.handleRemoveBook.bind(this)
  }

  componentDidMount () {
    const bookID = this.props.routeParams.bookId
    this.props.fetchBook(bookID)
    this.props.fetchBRs({bookID})

    this.updateDocTitle()
    this.integrateDiscourse()
    // this.integrateDisqus()
  }

  componentWillReceiveProps (nextProps) {
    if (this.isBookChanged(nextProps)) {
      this.fetchBorrowRecords(nextProps)
    }
  }

  componentDidUpdate () {
    this.updateDocTitle()
    this.integrateDiscourse()
    // this.integrateDisqus()
  }

  componentWillUnmount () {
    this.props.clearBook()
    document.title = 'K2 books'
    const script = document.querySelector(`script[src='${window.DiscourseEmbed.discourseUrl}javascripts/embed.js']`)
    script && script.remove()
  }

  getTitle () {
    const { name } = this.props.book.data
    if (!name) {
      return ''
    } else {
      return `K2 books--${name}`
    }
  }

  updateDocTitle () {
    const title = this.getTitle()
    if (!title) { return }

    document.title = title
  }

  integrateDiscourse () {
    const { id, name } = this.props.book.data

    if (!id || !name) return

    // const href = window.location.href
    window.DiscourseEmbed = {
      discourseUrl: 'http://10.1.10.17/',
      discourseEmbedUrl: `http://10.1.10.17:10060/books/${id}`
      // discourseEmbedUrl: href.substring(0, href.indexOf('?'))
    }

    let d = document.querySelector(`script[src='${window.DiscourseEmbed.discourseUrl}javascripts/embed.js']`)

    if (!d) {
      d = document.createElement('script')
      d.type = 'text/javascript'
      d.async = true
      d.src = window.DiscourseEmbed.discourseUrl + 'javascripts/embed.js'
      const container = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]
      container.appendChild(d)
    }
  }

  integrateDisqus () {
    const { id } = this.props.book.data
    const title = this.getTitle()
    if (!id || !title) return

    // const href = window.location.href
    window['disqus_config'] = function () {
      // this.page.url = href.substring(0, href.indexOf('?'))
      this.page.url = 'http://10.1.10.17:10060/books/' + id
      this.page.identifier = id
      this.page.title = title
    }

    const s = document.createElement('script')
    s.src = '//k2-books.disqus.com/embed.js'
    s.setAttribute('data-timestamp', +new Date())
    const container = document.head || document.body
    container.appendChild(s)
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
          <Tabs defaultActiveKey='comments'>
            <TabPane tab={<span><Icon type='message' />评论</span>} key='comments'>
              {
                <div id='discourse-comments' style={{height: '300px'}}></div>
              }
              {
                // <div id='disqus_thread'></div>
              }
            </TabPane>
            <TabPane tab={<span><Icon type='file-text' />图书内容</span>} key='content'>
              图书内容
            </TabPane>
            <TabPane tab={<span><Icon type='bars' />借阅记录</span>} key='borrow-records'>
              <Table columns={columns} dataSource={borrowRecords.data} />
            </TabPane>
          </Tabs>
        </div>
      </div>
     )
  }
}

export default BookShow
