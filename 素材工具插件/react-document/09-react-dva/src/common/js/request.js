import fetch from 'dva/fetch'

// https://github.com/github/fetch#

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const UriPrefix = 'http://localhost:3002'

  return fetch(UriPrefix + url, options)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response
      }

      const error = new Error(response.statusText)
      error.response = response
      throw error
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 580200) return data.data

      window.alert(data.msg)

      return Promise.reject(data)
    })
    // .catch((err) => ({ err }))
}
