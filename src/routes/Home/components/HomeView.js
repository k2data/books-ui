import React from 'react'
import { Button } from 'antd'
import BookItem from 'components/BookItem'
import BooksFilter from 'components/BooksFilter'
import classes from './HomeView.scss'

const Props = {
  books: React.PropTypes.object,
  filter: React.PropTypes.object,
  user: React.PropTypes.object,
  fetchBooks: React.PropTypes.func,
  removeBook: React.PropTypes.func,
  updateFilterText: React.PropTypes.func,
  filterActions: React.PropTypes.object,
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
    const { filter, updateFilterText, books, fetchBooks, user } = this.props

    return (
      <div>
        <BooksFilter {...{filter, actions: this.props.filterActions, updateFilterText, fetchBooks}} />
        <br />
        <div>
        {
          books.map((book, index) => {
            return (
              <div key={index} className={classes.bookItem}>
                {filter.showDeleteBtn && user.id === book.ownerID
                  ? <div className={classes.deleteBtn}>
                    <Button type='dashed'
                      onClick={this.handleRemoveBook(book.id)}>
                      删除
                    </Button>
                  </div>
                  : false
                }
                <BookItem {...{book}} />
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
