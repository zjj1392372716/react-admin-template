import axios from 'axios'
import iLoading from '../components/loading'
import config from '../config/httpConfig.js'
import qs from 'qs' // 序列化请求数据，视服务端的要求

// 创建axios实例对象
const instance = axios.create({
  baseURL: config.baseURL,
  headers: config.headers,
  transformResponse: [function (data) {}]
})

// request 拦截器
instance.interceptors.request.use(
  config => {
    // TODO: loading is open
    iLoading.open()
    // TODO: 如果需要携带验证参数，可以在这里统一添加
    // 参数序列化
    if (config.method.toLocaleLowerCase() === 'post' || config.method.toLocaleLowerCase() === 'put' || config.method.toLocaleLowerCase() === 'delete') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    // 请求错误时做些事(接口错误、超时等)
    // TODO: loading is close
    iLoading.close()
    // 打印错误
    console.log('request:', error)
    // TODO: 这里可以对错误做一下处理，比如统一提示
    return Promise.reject(error)
  }
)

// response 拦截器
instance.interceptors.response.use(
  response => {
    iLoading.close()
    let data
    // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
    if (response.data === undefined) {
      data = response.request.responseText
    } else {
      data = response.data
    }
    // 根据返回的code值来做不同的处理（和后端约定）
    // 这里可以对返回的不同的code做统一的处理
    return JSON.parse(data)
  },
  err => {
    iLoading.close()
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break

        case 401:
          err.message = '未授权，请登录'
          break

        case 403:
          err.message = '拒绝访问'
          break

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break

        case 408:
          err.message = '请求超时'
          break

        case 500:
          err.message = '服务器内部错误'
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break

        default:
      }
    }
    console.error(err)
    return Promise.reject(err)
  }
)

export default instance
