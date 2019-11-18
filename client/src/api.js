import axios from 'axios';

export default {
  user: {
    login: credentials =>
      axios.post('/api/auth', { credentials }).then(res => res.data.user),
    signup: user => axios.post('/api/users', { user }).then(res => res.data.user),
    confirm: token =>
      axios.post('/api/auth/confirmation', { token }).then(res => res.data.user),
    resetPasswordRequest: email => axios.post('/api/auth/reset_password', { email }),
    validateToken: token => axios.post('/api/auth/validateToken', { token }),
    resetPassword: data => axios.post('/api/auth/resetpassword', { data }),
    fetchCurrentUser: () =>
      axios.get('/api/users/current_user').then(res => res.data.user),
  },

  books: {
    fetchAll: () => axios.get('/api/books').then(res => res.data.books),
    create: book => axios.post('/api/books', { book }).then(res => res.data.book),
  },

  sponsors: {
    fetchAll: () => axios.get('/api/sponsors').then(res => res.data.sponsors),
    create: sponsor =>
      axios.post('/api/sponsors', { sponsor }).then(res => res.data.sponsor),
  },

  collections: {
    fetchAll: () => axios.get('/api/collections').then(res => res.data.collections),
    create: collection =>
      axios.post('/api/collections', { collection }).then(res => res.data.collection),
  },
};
