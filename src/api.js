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
    },
    confirm: (token) => {
      return axios.post('/api/auth/confirmation', { token })
        .then(res => res.data.user)
    },
    resetPasswordRequest: (email) => {
      return axios.post('/api/auth/reset_password_request', { email })
    },
    validateToken: (token) => {
      return axios.post('/api/auth/validate_token', { token })
    },
    resetPassword: (data) => {
      return axios.post('/api/auth/reset_password', { data })
    }
  }
}
