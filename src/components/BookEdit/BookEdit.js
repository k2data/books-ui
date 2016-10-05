import React from 'react'
import { Form, Input, InputNumber, DatePicker, Button } from 'antd'
import moment from 'moment'
// import classes from './BookEdit.scss'

const FormItem = Form.Item
const format = 'YYYY-MM-DD'

type Props = {
  book: Object,
  form: Object,
  handleChange: Function,
  getFieldDecorator: Function,
  save: Function
}

export class BookEdit extends React.Component {
  props: Props

  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.bookExists = this.bookExists.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const book = this.props.form.getFieldsValue()
    this.props.save(book)
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
            initialValue: '',
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
          {getFieldDecorator('quantity', { initialValue: 1 })(
            <InputNumber placeholder='' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='作者'
        >
          {getFieldDecorator('author', { initialValue: '' })(
            <Input type='text' placeholder='' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='译者'
        >
          {getFieldDecorator('translator', { initialValue: '' })(
            <Input type='text' placeholder='' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='页数'
        >
          {getFieldDecorator('pages', { initialValue: 0 })(
            <InputNumber placeholder='' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='出版社'
        >
          {getFieldDecorator('publisher', { initialValue: '' })(
            <Input type='text' placeholder='' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='出版日期'
        >
          {getFieldDecorator('publishedAt', { initialValue: moment(new Date(), format) })(
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
