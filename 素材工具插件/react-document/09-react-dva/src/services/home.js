import request from '../common/js/request'

export function getUserInfo (options) {
  return request('/getUserInfo', options)
}

export function getListInfo (options) {
  return request('/getListInfo', options)
}
