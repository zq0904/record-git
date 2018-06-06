const express = require('express')
const router = express.Router()
const db = require('./models/db')

const userController = require('./controllers/user')
const topicController = require('./controllers/topic')
const commentController = require('./controllers/comment')
const sessionController = require('./controllers/session')

function checkLogin(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({
      error: 'Unauthorized'
    })
  }
  next()
}

async function checkTopic(req, res, next) {
  try {
    const { id } = req.params
    const [topic] = await db.query(`SELECT * FROM topics WHERE id=${id}`)

    // 如果资源不存在
    if (!topic) {
      return res.status(404).json({
        error: 'Topic not Found.'
      })
    }

    // 如果话题不属于作者自己
    if (topic.user_id !== req.session.user.id) {
      return res.status(400).json({
        error: 'Action Invalid.'
      })
    }

    next()
  } catch (err) {
    next(err)
  }
}

/**
 * 用户资源
 */
router
  .get('/users', userController.list)
  .post('/users', userController.create)
  .patch('/users/:id', userController.update)
  .delete('/users/:id', userController.destroy)


/**
 * 话题资源
 */
router
  .get('/topics', topicController.list)
  .get('/topics/:id', topicController.one)
  .post('/topics', checkLogin, topicController.create)
  .patch('/topics/:id', checkLogin, checkTopic, topicController.update)
  .delete('/topics/:id', checkLogin, checkTopic, topicController.destroy)

/**
 * 评论资源
 */
router
  .get('/comments', commentController.list)
  .post('/comments', checkLogin, commentController.create)
  .patch('/comments/:id', checkLogin, commentController.update)
  .delete('/comments/:id', checkLogin, commentController.destroy)

/**
 * 会话管理
 */
router
  .get('/session', sessionController.get)
  .post('/session', sessionController.create)
  .delete('/session', sessionController.destroy)

module.exports = router
