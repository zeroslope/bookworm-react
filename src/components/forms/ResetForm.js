import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Message } from 'semantic-ui-react'
import InlineError from '../messages/InlineError'

class ResetForm extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
  }

  state = {
    data: {
      token: this.props.token,
      password: '',
      passwordConfirmation: ''
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
          console.log(err)
          this.setState({ errors: err.response.data.errors, loading: false })
        })
    }
  }

  validate = (data) => {
    const errors = {}
    if (!data.password) errors.password = "Can't be blank"
    if (data.password && data.password !== data.passwordConfirmation) {
      errors.passwordConfirmation = 'Password must match'
    }
    return errors
  }

  render () {
    const { password, passwordConfirmation, errors, loading } = this.state
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {
          errors.global && <Message negative>
            <Message.Header>{errors.global}</Message.Header>
          </Message>
        }
        <Form.Field error={!!errors.password}>
          <label htmlFor='password'>New Password</label>
          <input type='password' name='password' id='password' placeholder='your new password' value={password} onChange={this.onChange} />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Form.Field error={!!errors.passwordConfirmation}>
          <label htmlFor='password'>Confirm</label>
          <input type='password' name='passwordConfirmation' id='passwordConfirmation' placeholder='type it again, please' value={passwordConfirmation} onChange={this.onChange} />
          {errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />}
        </Form.Field>
        <Button type='submit' secondary>Reset</Button>
      </Form>
    )
  }
}

export default ResetForm
