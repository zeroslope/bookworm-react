import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions/auth'

const HomePage = ({ isAuthenicated, logout }) => (
  <div>
    <h1>Home Page</h1>
    { isAuthenicated
      ? <button onClick={() => logout()}>Logout</button>
      : (<div><Link to='/login'>Login</Link> or <Link to='/signup'>Sign Up</Link> </div>)
    }
  </div>
)

HomePage.propTypes = {
  isAuthenicated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    isAuthenicated: !!state.user.token
  }
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage)
