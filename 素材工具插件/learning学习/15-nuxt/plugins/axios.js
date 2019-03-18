export default ({ $axios, redirect }) => {
  // 请求拦截器
  $axios.onRequest(config => {
    // console.log(config)
    config.baseURL = 'http://127.0.0.1:3301'
    return config
  })

  // $axios.onError(error => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400) {
  //     redirect('/400')
  //   }
  // })
}