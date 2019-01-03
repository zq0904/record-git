const moment = require('moment')
const db = require('../models/db')

/**
 * 分页话题列表
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.list = async(req, res, next) => {
  try {
    let { _page = 1, _limit = 20 } = req.query

    if (_page < 1) {
      _page = 1
    }

    if (_limit < 1) {
      _limit = 1
    }

    if (_limit > 20) {
      _limit = 20
    }

    // 分页开始的页码
    const start = (_page - 1) * _limit
    // 1 0, 20
    // 2 20 20
    // 3 40 20
    //   (_page - 1) * _limit   _limit

    // 获取分页列表数据
    const sqlStr = `
    SELECT * FROM topics LIMIT ${start}, ${_limit}
  `
    const topics = await db.query(sqlStr)

    // 获取总记录数
    const [{count}] = await db.query(`SELECT COUNT(*) as count FROM topics`)
    
    res.status(200).json({
      topics,
      count
    })
  } catch (err) {
    next(err)
  }
}

/**
 * 根据 id 查找一个
 */
exports.one = async(req, res, next) => {
  try {
    const { id } = req.params
    const sqlStr = `SELECT * FROM topics WHERE id=${id}`
    const topics = await db.query(sqlStr)
    res.status(200).json(topics[0])
  } catch (err) {
    next(err)
  }
}

/**
 * 创建话题
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.create = async(req, res, next) => {
  try {
    const body = req.body
    body.create_time = moment().format('YYYY-MM-DD hh:mm:ss')
    body.modify_time = moment().format('YYYY-MM-DD hh:mm:ss')
    body.user_id = req.session.user.id

    const sqlStr = `
    INSERT INTO topics(title, content, user_id, create_time, modify_time)
    VALUES('${body.title}', '${body.content}', '${body.user_id}', '${body.create_time}', '${body.modify_time}')
  `
    const ret = await db.query(sqlStr)
    const [topic] = await db.query(`SELECT * FROM topics WHERE id=${ret.insertId}`)
    res.status(201).json(topic)
  } catch (err) {
    next(err)
  }
}

/**
 * 更新话题
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.update = async(req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const updateSqlStr = `
    UPDATE topics SET title='${body.title}', content='${body.content}', modify_time='${moment().format('YYYY-MM-DD hh:mm:ss')}'
      WHERE id=${id}`

    // 执行更新操作
    await db.query(updateSqlStr)

    // 更新成功之后，再把最新的数据响应给用户
    const [updatedTopic] = await db.query(`SELECT * FROM topics WHERE id=${id}`)
    res.status(201).json(updatedTopic)
  } catch (err) {
    next(err)
  }
}

/**
 * 删除话题
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.destroy = async(req, res, next) => {
  // 根据话题 id 查询得到话题中的存储的作者 id
  // 如果话题中的 user_id === 当前登陆用户的 id
  // url 中的 :id 叫做动态路由参数
  // 可以通过 req.params 来获取动态路由参数
  // 查询字符串：req.query
  // POST请求体：req.body
  // 动态路径参数：req.params
  try {
    const { id } = req.params

    // 执行删除操作
    await db.query(`DELETE FROM topics WHERE id=${id}`)

    // 响应成功
    res.status(201).json({})
  } catch (err) {
    next(err)
  }
}
