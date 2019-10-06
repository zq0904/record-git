// 前端路由的问题 1.如何做到url改变页面不刷新 2.如何监测url变化
// url的改变方式 1.刷新 window.location 2.a链接 3.浏览器自带的前进后退按钮
;(() => {
  // 原声 hash 路由
  const router = [
    {
      path: '/home',
      compoment: '<div>home组件</div>'
    },
    {
      path: '/details',
      compoment: '<div>details组件</div>'
    }
  ]
  let view = null
  const handlerDOMContentLoaded = () => {
    view = document.querySelector('#app #router-view')
    handlerHashChange()
  }
  const handlerHashChange = () => {
    const path = window.location.hash.substr(1)
    for (const route of router) {
      if (route.path === path) {
        view.innerHTML = route.compoment
      }
    }
  }
  // hash路由
  window.addEventListener('hashchange', handlerHashChange)
  window.addEventListener('DOMContentLoaded', handlerDOMContentLoaded) // dom加载 初始执行一次
})()
;(() => {
  // 原声 history 路由
  // window.history.pushState()方法将状态添加到浏览器的历史记录中
  // window.history.pushState(state, title, url)
  // state 保存的状态 一般设置null
  // title Firefox当前会忽略此参数 一般都传递空字符串

  // pushState 不会触发 popState事件
  // 浏览器的前进后退按钮 会触发 popState事件
  // 刷新页面 需要后端配合 这里使用nginx模拟
  const router = [
    {
      path: '/home',
      compoment: '<div>home组件</div>'
    },
    {
      path: '/details',
      compoment: '<div>details组件</div>'
    }
  ]
  let view = null
  const handlerDOMContentLoaded = () => {
    view = document.querySelector('#vm #router-view')
    for (const a of document.querySelectorAll('#vm a')) {
      a.addEventListener('click', function(e) {
        e.preventDefault()
        window.history.pushState(null, '', this.getAttribute('href').trim())
        handlerPopState()
      })
    }
    handlerPopState()
  }
  const handlerPopState = () => {
    const path = window.location.pathname
    for (const route of router) {
      if (route.path === path) {
        view.innerHTML = route.compoment
      }
    }
  }
  window.addEventListener('popstate', handlerPopState)
  window.addEventListener('DOMContentLoaded', handlerDOMContentLoaded)
})()
