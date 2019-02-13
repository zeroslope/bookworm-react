import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case USER_LOGGED_IN:
      return payload
    case USER_LOGGED_OUT:
      return {}
    default:
      return state
  }
}
