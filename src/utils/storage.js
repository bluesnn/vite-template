import Cookies from 'js-cookie'

/**
 * app key
 * !!!初始化项目时修改此key，后续谨慎修改，
 * 命名规则与项目名保持一致
 * 防止项目缓存冲突
 */
export const randomString = '_template_vue3'

export function getStorage(name, defaultValue, type) {
  let value = defaultValue
  const storage = localStorage.getItem(name + randomString)
  if (storage) {
    if (typeof defaultValue === 'object') {
      value = JSON.parse(storage)
    } else if (typeof defaultValue === 'number' || type === 'number') {
      value = Number(storage)
    } else {
      value = storage
    }
  }
  return value
}

export function setStorage(name, value) {
  if (typeof value === 'object') {
    localStorage.setItem(name + randomString, JSON.stringify(value))
  } else {
    localStorage.setItem(name + randomString, value)
  }
}

export function removeStorage(name) {
  localStorage.removeItem(name + randomString)
}

export function getSessionStorage(name, defaultValue, type) {
  let value = defaultValue
  const storage = sessionStorage.getItem(name + randomString)
  if (storage) {
    if (typeof defaultValue === 'object') {
      value = JSON.parse(storage)
    } else if (typeof defaultValue === 'number' || type === 'number') {
      value = Number(storage)
    } else {
      value = storage
    }
  }
  return value
}

export function setSessionStorage(name, value) {
  if (typeof value === 'object') {
    sessionStorage.setItem(name + randomString, JSON.stringify(value))
  } else {
    sessionStorage.setItem(name + randomString, value)
  }
}

export function removeSessionStorage(name) {
  sessionStorage.removeItem(name + randomString)
}

export function getCookie(name) {
  return Cookies.get(name)
}

export function setCookie(name, value, options) {
  return Cookies.set(name, value, options)
}

export function removeCookie(name) {
  return Cookies.remove(name)
}
