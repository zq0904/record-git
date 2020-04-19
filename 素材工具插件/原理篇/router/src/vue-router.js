;(() => {
  const Home = Vue.component('Home', {
    template: '<div>home组件</div>'
  })
  const Details = Vue.component('Details', {
    template: '<div>details组件</div>'
  })
  // 常量
  const HASH_TAG = 'hash'
  const HISTORY_TAG = 'history'

  // 简化原VueRouter的插件注册机制
  const mockVueRouter = {
    install(Vue) {
      Vue.prototype._router = {
        options: {
          mode: HASH_TAG,
          routes: [
            { path: '/home', component: Home },
            { path: '/details', component: Details }
          ]
        }
      }
    }
  }
  Vue.use(mockVueRouter)

  Vue.component('mock-router-link', {
    props: ['to'],
    computed: {
      mode() {
        return this._router.options.mode
      }
    },
    methods: {
      handlerClick(e) {
        e.preventDefault()
        window.history.pushState(null, '', this.to)
        this.$root.$emit('handlerPopState')
      }
    },
    render(h) {
      if (this.mode === HASH_TAG) {
        return h(
          'a',
          {
            attrs: {
              href: `#${this.to}`
            }
          },
          this.$slots.default
        )
      } else if (this.mode === HISTORY_TAG) {
        return h(
          'a',
          {
            attrs: {
              href: this.to
            },
            on: {
              click: this.handlerClick
            }
          },
          this.$slots.default
        )
      }
    },
  })

  Vue.component('mock-router-view', {
    template: `
      <component :is="viewComponent"></component>
    `,
    data() {
      return {
        viewComponent: null
      }
    },
    computed: {
      mode() {
        return this._router.options.mode
      },
      routes() {
        return this._router.options.routes
      }
    },
    mounted() {
      if (this.mode === HASH_TAG) {
        window.addEventListener('hashchange', this.handlerHashChange)
        this.handlerHashChange()
      } else if (this.mode === HISTORY_TAG) {
        window.addEventListener('popstate', this.handlerPopState)
        this.handlerPopState()
        // 这里直接使用root的 event bus
        this.$root.$on('handlerPopState', this.handlerPopState)
      }
    },
    beforeDestroy() {
      if (this.mode === HASH_TAG) {
        window.removeEventListener('hashchange', this.handlerHashChange)
      } else if (this.mode === HISTORY_TAG) {
        window.removeEventListener('popstate', this.handlerPopState)
      }
      this.$root.$off('handlerPopState', this.handlerPopState)
    },
    methods: {
      handlerHashChange() {
        const path = window.location.hash.substr(1)
        for (const route of this.routes) {
          if (route.path === path) {
            this.viewComponent = route.component
          }
        }
      },
      handlerPopState() {
        const path = window.location.pathname
        for (const route of this.routes) {
          if (route.path === path) {
            this.viewComponent = route.component
          }
        }
      }
    }
  })

  const App = Vue.component('app', {
    template: `
      <div>
        <mock-router-link to="/home" asd="123">home</mock-router-link>
        <mock-router-link to="/details">details</mock-router-link>
        <mock-router-view></mock-router-view>
      </div>
    `
  })

  new Vue({
    el: '#vue-hash-app',
    render: h => h(App)
  })
})()
