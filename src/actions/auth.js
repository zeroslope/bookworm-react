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
