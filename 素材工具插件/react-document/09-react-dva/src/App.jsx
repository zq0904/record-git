import React, { Suspense } from 'react'
import { Router, Route, Switch } from 'dva/router'
// import dynamic from 'dva/dynamic'
import Home from './views/Home'
import Foo from './views/Foo'

const App = ({ history, app }) => (
  <Router history={history}>
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/foo" component={Foo} />
      </Switch>
    </Suspense>
  </Router>
)

export default App
