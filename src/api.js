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
    forgetPassword: (user) => {
      return axios.post('/api/auth/forget_password', { user })
    },
    confirmReset: (token) => {
      return axios.post('/api/auth/reset_password', { token })
        .then(res => res.data.user)
    },
    resetPassword: (user) => {
      return axios.post('/api/users/reset_password', { user })
    }
  }
}
