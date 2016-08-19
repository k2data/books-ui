import React from 'react'
import { Link } from 'react-router'
import classes from './BookList.scss'

type Props = {
  book: Object, routeParams: Number
}

export class BookList extends React.Component {
  props: Props

  render () {
    const { book } = this.props
    console.log(book)

    return (
      <div className={classes.item}>
        <div className={classes.img}>
          <Link to={`bookShow/${book.id}`} activeClassName={classes.activeRoute}>
            <img className={classes.imge}
              src={book.source} /></Link></div>
        <div className={classes.info}>
          <h4><Link to={`bookShow/${book.id}`} activeClassName={classes.activeRoute}>
          {book.name}</Link></h4>
          <p>[作]<em>{book.author}</em>  &nbsp;&nbsp; [译]<em>{book.translator}</em>
            &nbsp;&nbsp; publishedAt <em>{book.date}</em></p>
          <p>[借]</p>
          <p> Description<em>{book.description}</em></p>
          <p> <span className={classes.tag}>Tag</span>
            &nbsp;&nbsp;<span className={classes.tag}>Tag</span>
            &nbsp;&nbsp;<span className={classes.tag}>Tag</span></p></div>
        <div className={classes.rate}>
          <p>{book.rate}<i className='fa fa-heart-o fa-lg' aria-hidden='true' /></p>
          <p>{book.comment}<span className={classes.comment}>评</span></p>
          <p>{book.read}<span className={classes.read}>阅</span></p>
          <p>{book.remain}<span className={classes.remain}>余</span></p>
        </div>
      </div>
    )
  }
}

export default BookList
