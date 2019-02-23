import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Message } from 'semantic-ui-react'
import InlineError from '../messages/InlineError'

class ResetForm extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired
  }

  state = {
    data: {
      password1: '',
      password2: ''
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
        .submit({
          email: this.props.email,
          password: this.state.data.password1
        })
        .catch(err => {
          console.log(err)
          this.setState({ errors: err.response.data.errors, loading: false })
        })
    }
  }

  validate = (data) => {
    const errors = {}
    if (!data.password1) errors.password1 = "Can't be blank"
    if (!data.password2) errors.password2 = "Can't be blank"
    if (data.password1 && data.password2 && data.password1 !== data.password2) {
      errors.global = 'Two password is different.'
    }
    return errors
  }

  render () {
    const { password1, password2, errors, loading } = this.state
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {
          errors.global && <Message negative>
            <Message.Header>{errors.global}</Message.Header>
          </Message>
        }
        <Form.Field error={!!errors.password1}>
          <label htmlFor='password'>New Password</label>
          <input type='password' name='password1' id='password1' placeholder='Make it secure' value={password1} onChange={this.onChange} />
          {errors.password1 && <InlineError text={errors.password1} />}
        </Form.Field>
        <Form.Field error={!!errors.password2}>
          <label htmlFor='password'>Confirm</label>
          <input type='password' name='password2' id='password2' placeholder='Repeat it' value={password2} onChange={this.onChange} />
          {errors.password2 && <InlineError text={errors.password2} />}
        </Form.Field>
        <Button type='submit' secondary>Reset</Button>
      </Form>
    )
  }
}

export default ResetForm
