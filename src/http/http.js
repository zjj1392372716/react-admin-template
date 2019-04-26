import axios from './axios'

export function post (url, data, needToken = false, config) {

  if(needToken) {
    data.token = window.localStorage.getItem('TOKEN')
  }
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: data,
      config
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      params: params
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
