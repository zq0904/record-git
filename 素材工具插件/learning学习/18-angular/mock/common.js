module.exports = [
  { // 用户登录
    url: '/token',
    type: 'post',
    req: { userName: '', password: '' },
    res: {
      msg: '登录成功',
      result: {
        accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhZDMxM2QzOGZlOTQ0N2NlODYzZmU4NTg0NzQzYTAxMCIsInN1YiI6ImFkbWluIiwiYXVkIjoiMDM1NmE2OWQtYjlmOS00OWE1LTgwNDYtNTE2YTAyNjQwMGM0IiwiZXhwIjoxNTM1NjA4OTg2LCJuYmYiOjE1MzU1MjI1ODZ9.C-aC3ZNyix5li88iovGEGdNfEdRiNkj_rCa7s4Sabq4',
        expiresIn: 86400000,
        tokenType: 'Bearer'
      },
      state: 'success',
      status: 1
    }
  },
  { // 检测用户是否登录
    url: '/token',
    type: 'get',
    req: {}, // { header: token }
    res: {
      msg: '已登录',
      result: null,
      state: 'success',
      status: 1
    }
  },
  { // 用户登出
    url: '/token',
    type: 'delete',
    req: {}, // { header: token }
    res: {
      msg: '操作成功',
      result: null,
      state: 'success',
      status: 1
    }
  }
]
