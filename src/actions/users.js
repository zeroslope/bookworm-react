import api from '../api'
import { userLoggedIn } from './auth'

export const signup = data => {
  return dispatch => {
    return api.user.signup(data)
      .then(user => {
        window.localStorage.bookwormJWT = user.token
        dispatch(userLoggedIn(user))
      })
  }
}
