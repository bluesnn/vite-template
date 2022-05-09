import request from '@/utils/request'

// 示例
// export function userToken(data) {
//   return request({
//     url: '/user/token',
//     method: 'post',
//     data,
//   }, { // 此配置详情请看request.js customOptions 自定义配置
//     isToken: false
//   }, { // toast 自定义提示/不传为toast默认loading
//     message: '获取列表数据....' // toast 提示文本
//   })
// }

export function userApi() {
  return new Promise((resolve) => {
    resolve('用户信息接口模拟')
  })
}

export function userToken(data) {
  return request({
    url: '/user/token',
    method: 'post',
    data
  }, {
    isToken: false // 是否携带token
  })
}

// 登出
export function userLogout(data) {
  return request({
    url: '/user/logout',
    method: 'post',
    data
  })
}
