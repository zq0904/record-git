const db = require('../models/db')
const md5 = require('blueimp-md5')

/**
 * 获取会话状态
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.get = (req, res, next) => {
  const {user} = req.session
  if (!user) {
    return res.status(401).json({
      error: 'Unauthorized'
    })
  }
  res.status(200).json(user)
}

/**
 * 创建会话：用户登陆
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.create = async (req, res, next) => {
  // 接收表单数据
  // 操作数据库处理登陆请求
  // 发送响应
  try {
    const body = req.body
    
    body.password = md5(md5(body.password))
    
    const sqlStr = `
      SELECT * FROM users WHERE email='${body.email}' and password='${body.password}'`
    const [user] = await db.query(sqlStr)

    if (!user) {
      return res.status(404).json({
        error: 'Invalid email or password!'
      })
    }
    
    // 登陆成功，记录 Session
    req.session.user = user

    // 发送响应
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

/**
 * 注销登陆
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.destroy = (req, res, next) => {
  delete req.session.user
  res.status(201).json({})
}
