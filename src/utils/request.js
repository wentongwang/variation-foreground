import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})
const pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken = axios.CancelToken
const removeRepeatUrl = ever => {
  for (const p in pending) {
    if (pending[p].u === ever.url + '&' + ever.method) {
      // 当当前请求在数组中存在时执行函数体
      pending[p].f() // 执行取消操作
      pending.splice(p, 1) // 把这条记录从数组中移除
    }
  }
}

// request interceptor
service.interceptors.request.use(
  config => {
    // 在一个ajax发送前执行一下取消操作
    removeRepeatUrl(config)
    config.cancelToken = new CancelToken(c => {
      // 自定义唯一标识
      pending.push({ u: config.url + '&' + config.method, f: c })
    })
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    removeRepeatUrl(response.config) // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      return Promise.reject(res.msg || 'error')
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
