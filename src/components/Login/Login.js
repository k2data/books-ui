import React from 'react'
import { Button, Form, Input } from 'antd'
import classes from './Login.scss'

const createForm = Form.create
const FormItem = Form.Item

type Props = {
  form: Object,
  login: Function
}

export class Login extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.login(this.props.form.getFieldsValue())
    console.log('用户登录：', this.props.form.getFieldsValue())
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }

    return (
      <div className={classes.page}>
        <div className={classes.formContainer} onSubmit={this.handleSubmit}>
          <Form horizontal>
            <FormItem
              {...formItemLayout}
              label='用户名'
            >
              {getFieldDecorator('username', {})(
                <Input type='text' autoComplete='off' />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='密码'
            >
              {getFieldDecorator('password', {})(
                <Input type='password' autoComplete='off' />
              )}
            </FormItem>
            <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
              <Button type='primary' htmlType='submit'>登录</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

export default createForm()(Login)
