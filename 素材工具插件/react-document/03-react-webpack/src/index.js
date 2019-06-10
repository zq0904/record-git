import React, { Component, lazy, Suspense } from 'react'
import ReactDom from 'react-dom'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import '@/assets/css/scss.scss' // 公共样式
import '@/assets/fonts/iconfont.css' // 字体图标

// 路由懒加载
const Test = lazy(() => import('./components/Test'))
const Lazy = lazy(() => import('./components/Lazy.jsx'))
const RouterCodeSplitting = lazy(() => import('./components/RouterCodeSplitting.jsx'))
const Context = lazy(() => import('./components/Context.jsx'))
const Context2 = lazy(() => import('./components/Context'))
const MyError = lazy(() => import('./components/MyError.jsx'))
const RefForwarding = lazy(() => import('./components/RefForwarding.jsx'))
const ForwardingRef = lazy(() => import('./components/ForwardingRef'))
const Fragment = lazy(() => import('./components/Fragment.jsx'))
const HOC = lazy(() => import('./components/HOC.jsx'))
const Otherlibrary = lazy(() => import('./components/Otherlibrary.jsx'))
const JSX = lazy(() => import('./components/JSX.jsx'))
const Performance = lazy(() => import('./components/Performance.jsx'))
const Portals = lazy(() => import('./components/Portals.jsx'))
const NoEs6 = lazy(() => import('./components/NoEs6.jsx'))
const NoJSX = lazy(() => import('./components/NoJSX.jsx'))
const Reconciliation = lazy(() => import('./components/Reconciliation.jsx'))
const RefsDom = lazy(() => import('./components/RefsDom.jsx'))
const Props = lazy(() => import('./components/Props.jsx'))
const StaticTypeCheck = lazy(() => import('./components/StaticTypeCheck.jsx'))
const TS = lazy(() => import('./components/TS.tsx'))
const StaticMode = lazy(() => import('./components/StaticMode.jsx'))
const LifeCycle = lazy(() => import('./components/LifeCycle.jsx'))
const Event = lazy(() => import('./components/Event.jsx'))
const Hooks = lazy(() => import('./components/Hooks.jsx'))

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {/* code splitting */}
        <Route exact path="/" component={Test}/>
        <Route path="/Lazy" component={Lazy}/>
        <Route path="/RouterCodeSplitting" component={RouterCodeSplitting}/>
        <Route path="/Context" component={Context}></Route>
        <Route path="/Context2" component={Context2}></Route>
        <Route path="/MyError" component={MyError}></Route>
        <Route path="/RefForwarding" component={RefForwarding}></Route>
        <Route path="/ForwardingRef" component={ForwardingRef}></Route>
        <Route path="/Fragment" component={Fragment}></Route>
        <Route path="/HOC" component={HOC}></Route>
        <Route path="/Otherlibrary" component={Otherlibrary}></Route>
        <Route path="/JSX" component={JSX}></Route>
        <Route path="/Performance" component={Performance}></Route>
        <Route path="/Portals" component={Portals}></Route>
        <Route path="/NoEs6" component={NoEs6}></Route>
        <Route path="/NoJSX" component={NoJSX}></Route>
        <Route path="/Reconciliation" component={Reconciliation}></Route>
        <Route path="/RefsDom" component={RefsDom}></Route>
        <Route path="/Props" component={Props}></Route>
        <Route path="/StaticTypeCheck" component={StaticTypeCheck}></Route>
        <Route path="/TS" component={TS}></Route>
        <Route path="/StaticMode" component={StaticMode}></Route>
        <Route path="/LifeCycle" component={LifeCycle}></Route>
        <Route path="/Event" component={Event}></Route>
        <Route path="/Hooks" component={Hooks}></Route>
      </Switch>
    </Suspense>
  </Router>
)

ReactDom.render(<App/>, document.getElementById('root'))

// 如果使用 react-router-dom@4.3.1 会报警告 Route组件component属性只能接受 函数 而使用lazy得到的是一个一个对象 函数式组件 class组件编译完都是函数
// react-router-dom@5.0.0修复了这个问题
// Warning: Failed prop type: Invalid prop `component` of type `object` supplied to `Route`, expected `function`.
// in Route (created by App)
// in App