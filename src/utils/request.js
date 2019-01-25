import axios from 'axios'
import {
  Message
} from 'element-ui';
const service = axios.create({
  // api 的 base_url
  baseURL: "/takeaway",
  // 超时时间
  timeout: 5000
})

/**
 * 统一处理请求体
 */
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

/**
 * 统一处理返回体 判断 success是否为true 
 * 是则继续处理
 * 否测打印message，将信息以异常的方式抛出
 */
service.interceptors.response.use(
  //处理 200 OK
  response => {
    let data = response.data;
    if (data.success) {
      return data.data;
    } else {
      Message.error(data.message);

      throw new Error(data);
    }
  },
  //处理其他状态码
  error => {
    let status = error.response.status;
    if (status >= 500) {
      Message.error("服务器异常");
    } else if (status >= 400) {
      Message.error("客户端异常");
    } else {

      return Promise.reject(error)

    }


  }
)

export default service;