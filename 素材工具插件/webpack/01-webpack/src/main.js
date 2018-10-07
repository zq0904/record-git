import _ from 'lodash'
import './asstes/css/1.css' // 加载css
import url from './asstes/images/Aimer.jpg'
import font from './asstes/fonts/iconfont.css'
import dataJson from './asstes/data/db.json'
import dataXml from './asstes/data/db.xml'

import a from './a.js' /* 测试热更新 */

console.log('main.js 运行了1')

// 加载图片
const img = new Image
img.src = url
img.onload = () => {
  document.querySelector('body').appendChild(img)
}
// 加载字体图标
function create() {
  const div = document.createElement('div')
  div.className = 'iconfont icon-zanting'
  div.onclick = a
  document.querySelector('body').appendChild(div)
  return div
}
// 加载数据
console.log(dataJson, dataXml)
// 热更新测试
var div = create()
// 异步加载 懒加载 webpackChunkName: "asyncComponent" 可以置顶name
div.onclick = e => import(/* webpackChunkName: "asyncComponent" */ './asyncComponent.js').then(module => module.default())
// 测试环境变量
console.log(process.env.NODE_ENV, _.join(1, 2))

// 是否开启了热更新 开启监听 ./a.js 这个文件变动 变动了执行回调方法
if (module.hot) {
  module.hot.accept('./a.js', function() {
    console.log('a.js变更了');
    // 虽然能够热更新 但是页面上的按钮 仍绑定旧的事件 仍需要JS代码来更新页面 CSS模块的热更新css-loader style-loader内置
    document.body.removeChild(div)
    div = create()
  })
}
