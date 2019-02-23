import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Message, Icon } from 'semantic-ui-react'
import ResetForm from '../forms/ResetForm'
import { validateToken, resetPassword } from '../../actions/auth'

class ResetPasswordPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    resetPassword: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  }

  state = {
    loading: true,
    success: false,
    errors: {}
  }

  componentDidMount () {
    this.props.validateToken(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }))
  }

  submit = data => {
    return this.props.resetPassword(data)
      .then(() => this.props.history.push('/login'))
  }

  render () {
    const { loading, success } = this.state
    const token = this.props.match.params.token

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
          !loading && success && <ResetForm submit={this.submit} token={token} />
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

export default connect(null, { validateToken, resetPassword })(ResetPasswordPage)
