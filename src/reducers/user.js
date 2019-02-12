import { USER_LOGGED_IN } from '../types'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case USER_LOGGED_IN:
      return { ...state, ...payload }

    default:
      return state
  }
}
