/**
 * 功能: 补0
 * @param {string} val 数据
 * @return {string}
 * **/
export function autoSupplement(val, digits = 2) {
  return val.toString().padStart(digits, '0')
}
