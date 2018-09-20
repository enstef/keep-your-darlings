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

  signup(email, password) {
    return service
      .post('/auth/signup', {
        email,
        password
      })
      .then(res => res.data)
      .catch(errHandler);
  },

  login(email, password) {
    return service
      .post('/auth/login', {
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
      .get('/auth/logout')
      .then(res => {
        localStorage.removeItem('user');
      })
  },

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },


  getProfile() {
    return service
      .get('/profile')
      .then(res => res.data)
      .catch(errHandler);
  },
  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file)
    console.log('DEBUG formData', formData.get("picture"));
    return service
      .post('/users/first-user/pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);
  },

  getCloset() {
    return service
      .get('/profile/closet')
      .then(res => res.data)
      .catch(errHandler);
  },

  getItem(data) {
    return service
      .get('/profile/closet/item/:id')
      .then(res => res.data)
      .catch(errHandler);
  },

  postItem(data) {
    return service
      .post("/profile/closet/item/", data)
      .then(res => res.data)
      .catch(errHandler)
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

  isLoggedIn() {
    return localStorage.getItem('user') != null
  }

};
