import React from 'react'
import { Form, Input, InputNumber, DatePicker, Button } from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const format = 'YYYY-MM-DD'

const Props = {
  book: Object,
  form: Object,
  getFieldDecorator: Function,
  modify: Function,
  bookMessage: Object
}

export class BookEdit extends React.Component {
  props: Props

  constructor (props) {
    super(props)

    this.bookId = this.props.bookMessage.id

    this.handleSubmit = this.handleSubmit.bind(this)
    this.bookExists = this.bookExists.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const book = this.props.form.getFieldsValue()
    console.log('modify a book:', book)
    this.props.modify(book, this.bookId)
  }

  bookExists (rule, value, callback) {
    if (!value) {
      callback()
    } else {
      setTimeout(() => {
        if (value === 'Book1') {
          callback([new Error('书名已存在。')])
        } else {
          callback()
        }
      }, 800)
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label='书名'
          hasFeedback
        >
          {getFieldDecorator('name', {
            initialValue: this.props.bookMessage.name,
            validate: [{
              rules: [
                { validator: this.bookExists }
              ],
              trigger: 'onBlur'
            }, {
              rules: [
                { required: true, message: '书名不能为空' }
              ],
              trigger: ['onBlur', 'onChange']
            }]
          })(
            <Input type='text' placeholder='' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='数量'
        >
          {getFieldDecorator('quantity', { initialValue: this.props.bookMessage.quantity })(
            <InputNumber placeholder='' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='作者'
        >
          {getFieldDecorator('author', { initialValue: this.props.bookMessage.author })(
            <Input type='text' placeholder='' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='译者'
        >
          {getFieldDecorator('translator', { initialValue: this.props.bookMessage.translator })(
            <Input type='text' placeholder='' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='页数'
        >
          {getFieldDecorator('pages', { initialValue: this.props.bookMessage.pages })(
            <InputNumber placeholder='' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='出版社'
        >
          {getFieldDecorator('publisher', { initialValue: this.props.bookMessage.publisher })(
            <Input type='text' placeholder='' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='出版日期'
        >
          {getFieldDecorator('publishedAt', { initialValue: moment(this.props.bookMessage.publishedAt, format) })(
            <DatePicker />
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
          <Button type='primary' htmlType='submit'>保存</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(BookEdit)
