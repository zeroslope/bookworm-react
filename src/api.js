import axios from 'axios'

export default {
  user: {
    login: (credentials) => {
      return axios.post('/api/auth', { credentials })
        .then(res => res.data.user)
    },
    signup: (user) => {
      return axios.post('/api/users', { user })
        .then(res => res.data.user)
    }
  }
}