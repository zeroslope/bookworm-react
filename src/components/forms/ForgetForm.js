import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmail from 'validator/lib/isEmail'
import { Form, Button, Message } from 'semantic-ui-react'
import InlineError from '../messages/InlineError'

class ForgetForm extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired
  }

  state = {
    data: {
      email: ''
    },
    loading: false,
    errors: {}
  }

  onChange = e => {
    this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
  }

  onSubmit = () => {
    let errors = this.validate(this.state.data)
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true })
      this.props
        .submit(this.state.data)
        .catch(err => {
          this.setState({ errors: err.response.data.errors, loading: false })
        })
    }
  }

  validate = (data) => {
    const errors = {}
    if (!isEmail(data.email)) errors.email = 'Invalid email'
    return errors
  }

  render () {
    const { email, errors, loading } = this.state
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {
          errors.global && <Message negative>
            <Message.Header>Someing went wrong.</Message.Header>
            <p>{errors.global}</p>
          </Message>
        }
        <Form.Field error={!!errors.email}>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' placeholder='email' value={email} onChange={this.onChange} />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Button type='submit' secondary>Send</Button>
      </Form>
    )
  }
}

export default ForgetForm
