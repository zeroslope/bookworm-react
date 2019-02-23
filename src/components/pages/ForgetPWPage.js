import React, { Component } from 'react'
import api from '../../api'
import ForgetForm from '../forms/ForgetForm'
import { Message, Icon } from 'semantic-ui-react'

export class ForgetPWPage extends Component {
  state = {
    success: false
  }

  submit = (user) => {
    return api.user.forgetPassword(user)
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

export default ForgetPWPage
