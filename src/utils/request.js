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
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    let data = response.data;
    if(data.success) {
      return data.data;
    }
    throw new Error(data.message);
  },
  error => {
    return Promise.reject(error)
  }
)

export default service;