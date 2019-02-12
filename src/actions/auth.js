import { USER_LOGGED_IN } from '../types'
import api from '../api'

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  payload: user
})

export const login = credentials => {
  return dispatch => {
    return api.user.login(credentials)
      .then(user => dispatch(userLoggedIn(user)))
  }
}
