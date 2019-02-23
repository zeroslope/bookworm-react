import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types'
import api from '../api'

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  payload: user
})

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
})

export const login = credentials => {
  return dispatch => {
    return api.user.login(credentials)
      .then(user => {
        window.localStorage.bookwormJWT = user.token
        dispatch(userLoggedIn(user))
      })
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('bookwormJWT')
    dispatch(userLoggedOut())
  }
}

export const confirm = (token) => {
  return dispatch => {
    return api.user.confirm(token)
      .then(user => {
        window.localStorage.bookwormJWT = user.token
        dispatch(userLoggedIn(user))
      })
  }
}

export const resetPasswordRequest = ({ email }) => {
  return () => {
    return api.user.resetPasswordRequest(email)
  }
}

export const validateToken = (token) => {
  return () => {
    return api.user.validateToken(token)
  }
}

export const resetPassword = (data) => {
  return () => {
    return api.user.resetPassword(data)
  }
}
