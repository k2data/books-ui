import React from 'react'
import moment from 'moment'
import R from 'ramda'
import { Button } from 'antd'
import classes from './BookView.scss'

type Props = {
  book: React.PropTypes.object,
  borrowRecords: React.PropTypes.object,
  user: React.PropTypes.object,
  borrowBook: React.PropTypes.func
}

export class BookView extends React.Component {
  props: Props

  handleSelect (index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last)
  }

  isLoginUserBorrowing (user, borrowRecords) {
    if (R.isEmpty(user)) {
      return false
    }

    const index = R.findIndex(R.propEq('userID', user.id))(borrowRecords)

    return index >= 0
  }

  render () {
    const { book = {}, borrowRecords = {}, user = {} } = this.props
    const { data: brList = [] } = borrowRecords
    const borrowersCount = book.borrowers ? book.borrowers.length : 0
    const bookLeft = (book.quantity || 0) - borrowersCount

    console.log(brList)

    return (
      <div className={classes['BookView']}>
        <div className={classes.thumbnail}>
          <img src='' />
        </div>
        <div className={classes.info}>
          <h3>{book.name}</h3>
          <div>
            [作]<em>{book.author || '...'}</em>&nbsp;&nbsp;
            {book.translator
              ? <span>[译]<em>{book.translator}</em>&nbsp;&nbsp;</span>
              : false
            }
            <em>{book.publishedAt}</em>
          </div>
          {borrowersCount > 0
            ? <div>
              [借]&nbsp;
              <div className={classes.borrowers}>
                {book.borrowers
                  .map((borrower) => {
                    const borrowRecord = brList.find((br) => {
                      return br.userID === borrower.id
                    })
                    const { startAt, endAt } = borrowRecord || {}
                    return <div key={borrower.id}>
                      {borrower.name}
                      :&nbsp;&nbsp;
                      {startAt
                        ? moment(new Date(startAt)).format('YYYY/MM/DD')
                        : '...'
                      }
                      <span className={classes.datesSpliter}>-</span>
                      {endAt
                        ? moment(new Date(endAt)).format('YYYY/MM/DD')
                        : '...'
                      }
                    </div>
                  })
                }
              </div>
            </div>
            : false
          }
          <div>
            共{book.quantity}本，余{bookLeft}本
          </div>
          <div className={classes.oprs}>
          {this.isLoginUserBorrowing(user, borrowRecords)
            ? [<Button type='ghost'>续借</Button>, <Button type='ghost'>还书</Button>]
            : <Button type='ghost' disabled={bookLeft < 1}
              onClick={this.props.borrowBook}>
              借书
            </Button>
          }
          </div>
        </div>
      </div>
    )
  }
}

export default BookView
