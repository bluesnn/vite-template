// baseURL
// const { host } = window.location

export const isProd = 'prod'
export const isRC = 'dev'

export function globalBaseURL() {
  if (isProd) {
    return {
      BAIDU_BASE_URL: 'https://www.baidu.com'
    }
  } else if (isRC) {
    return {
      BAIDU_BASE_URL: 'https://www.baidu.com'
    }
  } else {
    return {
      BAIDU_BASE_URL: 'https://www.baidu.com'
    }
  }
}
