
const { router } = require('../router')
console.log(router)
router.get('/user/:id', (ctx, next) => {
  console.log(ctx.params) // URL parameters 路由参数
  ctx.body = ctx.params
})

// 重定向
router.redirect('/redirect', '/redirect2')
// 等价于
// router.all('/redirect', ctx => {
//   ctx.redirect('/redirect2')
//   ctx.status = 301
// })

router.get('/redirect2', async (ctx) => {
  ctx.body = 'redirect2'
})
