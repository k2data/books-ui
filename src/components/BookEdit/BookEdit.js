import React from 'react'
import classes from './BookEdit.scss'

type Props = {
  book: Object,
  handleChange: Function
}

export class BookEdit extends React.Component {
  props: Props

  render () {
    const { book, handleChange } = this.props
    console.log(book)
    return (
      <div className={classes.item}>
        <div className={classes.img}>
          <img className={classes.imge} src={book.source} /></div>
        <div className={classes.detail}>
          <fieldset><legend>详细信息</legend>
            <h4>书名：<em><input type='text' name='name' value={book.name}
              onChange={handleChange} /></em></h4>
            <p>作者：<em><input type='text' name='author' value={book.author}
              onChange={handleChange} /></em></p>
            <p>译者：<em><input type='text' name='translator' value={book.translator}
              onChange={handleChange} /></em></p>
            <p>页数：<em><input type='number' name='pages' value={book.pages}
              onChange={handleChange} /></em></p>
            <p>出版社：<em><input type='text' name='publisher' value={book.publisher}
              onChange={handleChange} /></em></p>
            <p>出版日期：<em><input type='date' name='publishedAt' value={book.date}
              onChange={handleChange} /></em></p>
            <p>读者评论：<em><input type='text' name='words' value={book.words}
              onChange={handleChange} /></em></p>
            <p>图书内容：<em><input type='text' name='content' value={book.content}
              onChange={handleChange} /></em></p>
            <p>借阅信息：<em><input type='text' name='status' value={book.status}
              onChange={handleChange} /></em></p>
          </fieldset></div>
      </div>
    )
  }
}

export default BookEdit
