/* eslint-disable */
import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:4000'
  baseURL: 'https://cyber-server-app.herokuapp.com'
})

export default api
