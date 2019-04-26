import axios from 'axios'
import config from '../config/httpConfig.js'

// 创建axios实例对象
const instance = axios.create({
    baseURL: config.baseURL,
    headers:{
        'Content-Type':'multipart/form-data'
    }
})

const formDataPost = (url, formData) => {
    return new Promise((resolve, reject) => {
        instance.post(url,formData).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}


export default formDataPost
