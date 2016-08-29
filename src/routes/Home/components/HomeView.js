import React from 'react'
import BookList from 'components/BookList'
import BooksFilter from 'components/BooksFilter'
import { Link } from 'react-router'
import SearchBar from 'components/SearchBar'
import classes from './HomeView.scss'

const Props = {
  books: React.PropTypes.object,
  filter: React.PropTypes.object,
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
    const { filter, updateFilterText,
      books: { data: books } } = this.props

    // TODO: move these to selector

    // const filterOwned = () => {
    //   this.setState({filterOwned: !this.state.filterOwned})
    // }
    //
    // const filterBorrowed = () => {
    //   this.setState({owned: !this.state.filterBorrowed})
    // }
    // const showDeleteButton = () => {
    //   this.setState({showDeleteButton: !this.state.showDeleteButton})
    // }

    return (
      <div>
        <Link to='/newBook'><button className={classes.button}>新建</button></Link>
        <Link to='/login'><button className={classes.button}>登录</button></Link>
        <BooksFilter {...{filter, updateFilterText}} />
        <br />
        <div>
            {
              books.map((book, index) => {
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
