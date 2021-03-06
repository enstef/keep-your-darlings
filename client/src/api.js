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

  signup(email, username, password) {
    return service
      .post('/auth/signup', {
        email,
        username,
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

  getCloset() {
    return service
      .get('/closet/items')
      .then(res => res.data)
      .catch(errHandler);
  },

  getItem(id) {
    return service
      .get('/closet/items/' + id)
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteItem(id) {
    return service
      .delete("/closet/items/"+id)
      .then(res => res.data)
      .catch(errHandler)
  },

  postItem(data) {
    let formData = new FormData();
    formData.append("picture", data.picture)
    formData.append("_category", data._category)
    formData.append("subcategory", data.subcategory)
    formData.append("season", data.season)
    formData.append("color", data.color)
    formData.append("tags", data.tags)
    formData.append("brand", data.brand)
    formData.append("boughtOn", data.boughtOn)
    formData.append("price", data.price)

    return service
      .post("/closet/items", formData)
      .then(res => res.data)
      .catch(errHandler)
  },

  getCategories() {
    return service
      .get('/closet/categories')
      .then(res => res.data)
      .catch(errHandler);
  },

  createOutfit(itemId, date) {
    return service
      .post(`/items/${itemId}/wornOn`, date)
      .then(res => res.data)
      .catch(errHandler)
  },

  // updateItemWithDate(data) {
  //   console.log("date also in api -->", data)
  //   return service
  //     .patch('/item', data)
  //     .then(res => res.data)
  //     .catch(errHandler)
  // }
  getHistory() {
    return service
      .get('/history')
      .then(res => res.data)
      .catch(errHandler)
  }
};
