import axios from 'axios'
import { Toast } from 'vant'
import { globalBaseURL } from '@/utils/globalBaseURL'
import { getCookie } from '@/utils/storage'

const pendingMap = new Map()

const loadingInstance = {
  _target: null,
  _count: 0
}

function setBaseURL(name) {
  return globalBaseURL()[name]
}

export default function request(axiosConfig, customOptions, loadingOptions) {
  const service = axios.create({
    // baseURL: globalBaseURL().BAIDU_BASE_URL, // 设置统一的请求前缀
    timeout: 30000 // 设置统一的超时时长
  })

  // 自定义配置
  const custom_options = Object.assign({
    baseURL: null, // 后端接口地址，适配接口多域名情况
    isToken: true, // 是否携带token
    repeatRequestCancel: true, // 是否开启取消重复请求
    loading: true, // 是否开启loading层效果
    reductDataFormat: true, // 是否开启简洁的数据结构响应
    errorMessageShow: true, // 是否开启接口错误信息展示
    codeMessageShow: true // 是否开启code不为0时的信息提示
  }, customOptions)

  // 请求拦截
  service.interceptors.request.use(
    config => {
      config.baseURL = setBaseURL(custom_options.baseURL || 'BAIDU_BASE_URL')
      removePending(config)
      custom_options.repeatRequestCancel && addPending(config)
      // 创建loading实例
      if (custom_options.loading) {
        loadingInstance._count++
        if (loadingInstance._count === 1) {
          if (loadingOptions?.message) {
            loadingInstance._target = Toast(loadingOptions)
          } else {
            loadingInstance._target = Toast.loading({
              duration: 0,
              forbidClick: true
            })
          }
          // loadingInstance._target = loadingOptions?.message ? Toast(loadingOptions) : Toast({})
        }
      }
      // 自动携带token
      if (custom_options.isToken) {
        config.headers['Authorization'] = getCookie() // 请求携带自定义token 请根据实际情况自行修改
      }

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 响应拦截
  service.interceptors.response.use(
    response => {
      removePending(response.config)
      custom_options.loading && closeLoading(custom_options) // 关闭loading
      const { errno, error } = response.data
      // 关于code码的判断自行修改
      if (errno === '1008') {
        console.log('token失效')
        return Promise.reject(response.data)
      } else if (custom_options.codeMessageShow && response.data && errno !== '0') {
        Toast({
          type: 'fail',
          message: error
        })
        return Promise.reject(response.data)
      } else {
        return custom_options.reductDataFormat ? response.data : response
      }
    },
    error => {
      error.config && removePending(error.config)
      custom_options.loading && closeLoading(custom_options) // 关闭loading
      custom_options.errorMessageShow && httpErrorStatusHandle(error) // 处理错误状态码
      return Promise.reject(error) // 错误继续返回给到具体页面
    }
  )

  return service(axiosConfig)
}

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error) {
  // 处理被取消的请求
  if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.message)
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302: message = '接口重定向了！'; break
      case 400: message = '参数不正确！'; break
      case 401: message = '您未登录，或者登录已经超时，请先登录！'; break
      case 403: message = '您没有权限操作！'; break
      case 404: message = `请求地址出错: ${error.response.config.url}`; break // 在正确域名下
      case 408: message = '请求超时！'; break
      case 409: message = '系统已存在相同数据！'; break
      case 500: message = '服务器内部错误！'; break
      case 501: message = '服务未实现！'; break
      case 502: message = '网关错误！'; break
      case 503: message = '服务不可用！'; break
      case 504: message = '服务暂时无法访问，请稍后再试！'; break
      case 505: message = 'HTTP版本不受支持！'; break
      default: message = '异常问题，请联系管理员！'; break
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！'
  if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！'

  Toast({
    type: 'fail',
    message
  })
}

/**
 * 关闭Loading层实例
 * @param {*} options
 */
function closeLoading(options) {
  if (options.loading && loadingInstance._count > 0) loadingInstance._count--
  if (loadingInstance._count === 0) {
    loadingInstance._target.close()
    loadingInstance._target = null
  }
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
function addPending(config) {
  const pendingKey = getPendingKey(config)
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingMap.has(pendingKey)) {
      pendingMap.set(pendingKey, cancel)
    }
  })
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    // 如你不明白此处为什么需要传递pendingKey可以看文章下方的补丁解释
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
  }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function getPendingKey(config) {
  let { data } = config
  const { url, method, params } = config
  if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}
