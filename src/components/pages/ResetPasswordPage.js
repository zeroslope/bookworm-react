import React, { Component } from 'react'
import api from '../../api'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Message, Icon } from 'semantic-ui-react'
import ResetForm from '../forms/ResetForm'

class ResetPasswordPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }

  state = {
    email: '',
    loading: true,
    success: false,
    errors: {}
  }

  componentDidMount () {
    api.user.confirmReset(this.props.match.params.token)
      .then(user => {
        this.setState({ loading: false, success: true, email: user.email })
      })
      .catch(() => this.setState({ loading: false, success: false }))
  }

  submit = data => {
    return api.user.resetPassword(data)
      .then(() => this.props.history.push('/login'))
  }

  render () {
    const { loading, success, email } = this.state
    return (
      <div>
        {
          loading && (
            <Message icon>
              <Icon name='circle notched' loading={loading} />
              <Message.Header>Validating the token.</Message.Header>
            </Message>
          )
        }
        {
          success && <ResetForm submit={this.submit} email={email} />
        }
        {
          !loading && !success && (
            <Message negative icon>
              <Icon name='warning sign' />
              <Message.Content>
                <Message.Header>Ooops. Invalid token it seems.</Message.Header>
                <Message.Content>Token is invalid. Please try to reset your password again. <Link to='/forget'>Here</Link> </Message.Content>
              </Message.Content>
            </Message>
          )
        }
      </div>
    )
  }
}

export default ResetPasswordPage
