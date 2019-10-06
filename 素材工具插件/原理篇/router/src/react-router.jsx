;(() => {
  // const { HashRouter, BrowserRouter, Route, Link } = ReactRouterDOM

  const RouteContext = React.createContext()
  // 常量
  const HASH_TAG = 'hash'
  const HISTORY_TAG = 'history'

  const Home = () => <div>home组件</div>
  const Details = () => <div>details组件</div>

  // hash 路由
  class HashRouter extends React.Component {
    state = {
      path: null // 当前路径
    }
    handlerHashChange = () => {
      this.setState({ path: window.location.hash.substr(1) })
    }
    componentDidMount() {
      window.addEventListener('hashchange', this.handlerHashChange)
      this.handlerHashChange() // 初始执行一次
    }
    componentWillUnmount() {
      window.addEventListener('hashchange', this.handlerHashChange)
    }
    render() {
      return (
        <RouteContext.Provider
          value={{
            tag: HASH_TAG,
            path: this.state.path
          }}
        >
          {this.props.children}
        </RouteContext.Provider>
      )
    }
  }
  class Route extends React.Component {
    render() {
      const { path, component } = this.props
      return (
        <RouteContext.Consumer>
          {({ path: currentPath }) =>
            currentPath === path && React.createElement(component)
          }
        </RouteContext.Consumer>
      )
    }
  }
  // 为了考虑到Link标签的通用性
  class Link extends React.PureComponent {
    get res() {}
    render() {
      const { to, children, ...args } = this.props
      return (
        <RouteContext.Consumer>
          {({ tag, handlerPopState }) => {
            switch (tag) {
              case HASH_TAG:
              default:
                return (
                  <a href={`#${to}`} {...args}>
                    {children}
                  </a>
                )
              case HISTORY_TAG:
                return (
                  <a
                    href={to}
                    onClick={e => {
                      e.preventDefault()
                      window.history.pushState(null, '', to)
                      handlerPopState()
                    }}
                    {...args}
                  >
                    {children}
                  </a>
                )
            }
          }}
        </RouteContext.Consumer>
      )
    }
  }

  const App = () => (
    <HashRouter>
      <Link to="/home">home</Link>&nbsp;
      <Link to="/details">details</Link>
      <Route path="/home" component={Home}></Route>
      <Route path="/details" component={Details}></Route>
    </HashRouter>
  )

  ReactDOM.render(<App />, document.querySelector('#react-hash-app'))

  // history 路由
  class BrowserRouter extends React.Component {
    state = {
      path: null
    }
    handlerPopState = () => {
      this.setState({ path: window.location.pathname })
    }
    componentDidMount() {
      window.addEventListener('popstate', this.handlerPopState)
      this.handlerPopState()
    }
    componentWillUnmount() {
      window.addEventListener('popstate', this.handlerPopState)
    }
    render() {
      return (
        <RouteContext.Provider
          value={{
            tag: HISTORY_TAG,
            path: this.state.path,
            handlerPopState: this.handlerPopState
          }}
        >
          {this.props.children}
        </RouteContext.Provider>
      )
    }
  }
  const Vm = () => {
    return (
      <BrowserRouter>
        <Link to="/home">home</Link>&nbsp;
        <Link to="/details">details</Link>
        <Route path="/home" component={Home}></Route>
        <Route path="/details" component={Details}></Route>
      </BrowserRouter>
    )
  }
  ReactDOM.render(<Vm />, document.querySelector('#react-history-vm'))
})()
