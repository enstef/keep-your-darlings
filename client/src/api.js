import axios from 'axios';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service: service,

  getCountries() {
    return service
      .get('/countries')
      .then(res => res.data)
      .catch(errHandler);
  },

  postCountries(data) {
    return service
      .post('/countries', data)
      .then(res => res.data)
      .catch(errHandler);
  },

  getProfile() {
    return service
      .get('/profile')
      .then(res => res.data)
      .catch(errHandler);
  },

  signup(email, password) {
    return service
      .post('/signup', {email, password})
      .then(res => res.data)
      .catch(errHandler);
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    return service
      .get('/logout')
      .then(res => {
        localStorage.removeItem('user');
      })
  },

  // loadUser() {
  //   const userData = localStorage.getItem('user');
  //   if (!userData) return false;
  //   const user = JSON.parse(userData);
  //   if (user.token) {
  //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
  //     return user;
  //   }
  //   return false;
  // },

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },


  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file)
    return service
      .post('/users/first-user/pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);
  },
};
