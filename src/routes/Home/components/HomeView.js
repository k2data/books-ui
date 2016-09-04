import React from 'react'
import BookList from 'components/BookList'
import RightToolbarContainer from 'containers/RightToolbarContainer'
import BooksFilter from 'components/BooksFilter'
import classes from './HomeView.scss'

const Props = {
  books: React.PropTypes.object,
  filter: React.PropTypes.object,
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
    const { filter, updateFilterText, books } = this.props

    return (
      <div>
        <div className={classes.rightToolbar}>
          <RightToolbarContainer />
        </div>
        <BooksFilter {...{filter, actions: this.props.filterActions, updateFilterText}} />
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
