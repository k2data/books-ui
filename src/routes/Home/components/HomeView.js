import React from 'react'
import BookList from 'components/BookList'
import { Link } from 'react-router'
import SearchBar from 'components/SearchBar'
import classes from './HomeView.scss'

const Props = {
  bookFilter: React.PropTypes.array,
  fetchBooks: React.PropTypes.func,
  removeBook: React.PropTypes.func,
  updateFilterText: React.PropTypes.func,
  borrowed: React.PropTypes.boolean,
  owned: React.PropTypes.boolean,
  currentUser: React.PropTypes.object
}

export class HomeView extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.state = { filterOwned: false, filterBorrowed: false, showDeleteButton: false }
    this.handleRemoveBook = this.handleRemoveBook.bind(this)
  }

  componentDidMount () {
    this.props.fetchBooks()
  }

  handleRemoveBook (id) {
    return () => {
      this.props.removeBook(id)
    }
  }

  render () {
    const { bookFilter, updateFilterText, currentUser } = this.props
    const { books, text } = bookFilter
    console.log(bookFilter)
    console.log(this.props)

    const filteredBooks = books.filter((book) => {
      return JSON.stringify(book).indexOf(text) !== -1
    })

    const ownedBooks = filteredBooks.filter((book) => {
      if (filterBorrowed === false) {
        return true
      }
      return book.owner === currentUser.name
    })

    const borrowedBooks = ownedBooks.filter((book) => {
      if (filterBorrowed === false) {
        return true
      }
      return book.owner === currentUser.name
    })

    const filterOwned = () => {
      this.setState({filterOwned: !this.state.filterOwned})
    }

    const filterBorrowed = () => {
      this.setState({owned: !this.state.filterBorrowed})
    }
    const showDeleteButton = () => {
      this.setState({showDeleteButton: !this.state.showDeleteButton})
    }

    return (
      <div>
        <button className={classes.button} onClick={showDeleteButton}>删除(显/隐)</button>
        <Link to='/newBook'><button className={classes.button}>新建</button></Link>
        <Link to='/login'><button className={classes.button}>登录</button></Link>
        <SearchBar className={classes.search} {...{updateFilterText, bookFilter}} />
        <button className={classes.button} onClick={filterOwned} >我自己的书</button>
        <button className={classes.button} onClick={filterBorrowed} >我借阅的书</button>
        <br />
        <div>
            {
              borrowedBooks.map((book, index) => {
                return (
                  <div key={index}>
                    {this.state.showDeleteButton
                      ? <button className={classes.button}
                        onClick={this.handleRemoveBook(book.id)}>
                      删除</button>
                      : false
                    }
                    <BookList {...{book}} />
                  </div>
             )
              })
        }
        </div>
      </div>
    )
  }
}

export default HomeView
