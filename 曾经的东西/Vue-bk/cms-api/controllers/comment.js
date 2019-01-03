const db = require('../models/db')

exports.list = async(req, res, next) => {
  try {
    const {topic_id} = req.query
    const sqlStr = `SELECT * FROM comments WHERE topic_id=${topic_id}`
    const comments = await db.query(sqlStr)
    res.status(200).json(comments)
  } catch (err) {
    next(err)
  }
}

exports.create = async(req, res, next) => {
  try {
    // 1. 获取表单数据
    // 2. 操作数据库
    // 3. 发送响应数据
    const {
      content = '',
      topic_id
    } = req.body

    // 执行插入操作
    const sqlStr = `
    INSERT INTO comments(content, create_time, modify_time, topic_id, user_id)
    VALUES('${content}',
      '${Date.now()}',
      '${Date.now()}',
      ${topic_id},
      ${req.session.user.id})`
    // 当进行增删改操作的时候，db.query 方法返回的是一个对象，所以我们这里可以使用解构赋值的方式来取值
    const { insertId } = await db.query(sqlStr)
    
    // 插入数据成功，将新生成的数据结果返回给用户
    // 当执行查询操作的时候，返回的是数组，所以这里可以数组解构来取值
    const [comment] = await db.query(`SELECT * FROM comments WHERE id=${insertId}`)
    res.status(201).json(comment)
  } catch (err) {
    next(err)
  }
}

exports.update = async(req, res, next) => {
  try {
    const {id} = req.params
    const {content} = req.body
    await db.query(`UPDATE comments SET content='${content}'`)
    const [updatedComment] = await db.query(`SELECT * FROM comments WHERE id=${id}`)
    res.status(201).json(updatedComment)
  } catch (err) {
    next(err)
  }
}

exports.destroy = async(req, res, next) => {
  try {
    const {id} = req.params
    await db.query(`DELETE FROM comments WHERE id=${id}`)
    res.status(201).json({})
  } catch (err) {
    next(err)
  }
}
