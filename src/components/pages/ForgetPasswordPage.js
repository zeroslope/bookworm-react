import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ForgetForm from '../forms/ForgetForm'
import { Message, Icon } from 'semantic-ui-react'
import { resetPasswordRequest } from '../../actions/auth'

export class ForgetPasswordPage extends Component {
  static propTypes = {
    resetPasswordRequest: PropTypes.func.isRequired
  }

  state = {
    success: false
  }

  submit = (user) => {
    return this.props.resetPasswordRequest(user)
      .then(() => {
        this.setState({ success: true })
      })
  }

  render () {
    const { success } = this.state
    return (
      <div>
        <h1>Reset your password</h1>
        {
          success
            ? (
              <Message success icon>
                <Icon name='checkmark' />
                <Message.Content>
                  <Message.Header>Email has been sent.</Message.Header>
                </Message.Content>
              </Message>
            )
            : <ForgetForm submit={this.submit} />
        }
      </div>
    )
  }
}

export default connect(null, { resetPasswordRequest })(ForgetPasswordPage)
