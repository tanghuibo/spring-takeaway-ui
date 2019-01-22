import axios from 'axios'

const service = axios.create({
  baseURL: "/takeaway", // api 的 base_url
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service;