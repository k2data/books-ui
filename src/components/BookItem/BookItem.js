import React from 'react'
import { Link } from 'react-router'
import classes from './BookItem.scss'

type Props = {
  book: Object, routeParams: Number
}

export class BookItem extends React.Component {
  props: Props

  render () {
    const { book } = this.props
    const { borrowers = [] } = book

    return (
      <div className={classes.item}>
        <div className={classes.img}>
          <Link to={`bookShow/${book.id}`} activeClassName={classes.activeRoute}>
            <img className={classes.imge}
              src={book.source} />
          </Link>
        </div>
        <div className={classes.info}>
          <h3>
            <Link to={`bookShow/${book.id}`} activeClassName={classes.activeRoute}>
              {book.name}
            </Link>
          </h3>
          <p>
            [作]<em>{book.author}</em>
            &nbsp;&nbsp;
            {book.translator
              ? <span>[译]<em>{book.translator}</em></span>
              : false
            }
            &nbsp;&nbsp;
            {book.date
              ? <span>出版日期 <em>{book.date}</em></span>
              : false
            }
          </p>
          {borrowers && borrowers.length > 0
            ? <p>
              [借]<em>{borrowers.map((borrower) => borrower.name)
                .join(', ')}</em>
            </p>
            : false
          }
          <p>{book.description || '没有描述信息...'}</p>
          <p className={classes.tags}>
            <span className={classes.tag}>Tag</span>
            <span className={classes.tag}>Tag</span>
            <span className={classes.tag}>Tag</span>
          </p>
        </div>
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

export default BookItem
