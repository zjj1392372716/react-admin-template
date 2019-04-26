// ================================================
// 请求配置
// ================================================

const config = {
  thirdPartyHost: {
    weather: 'http://t.weather.sojson.com/api/' // 第三方host,这里是天气接口使用
  }, 
  AK: 'Xx5fgSLlpBHHhMkQMPweStanWabh0fvc',
  method: 'post', // 默认方法是post
  baseURL: 'http://localhost:3000/api', // 基础请求 host 
  baseHost: 'http://localhost:3000', // 域名 + 端口
  // 请求头信息
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: false,
  // 返回数据类型
  responseType: 'json'
}

export default config
