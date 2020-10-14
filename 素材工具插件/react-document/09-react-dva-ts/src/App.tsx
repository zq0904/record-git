import React, { FC, Suspense } from 'react'
import { RouterAPI } from 'dva'
import { Router, Route, Switch } from 'dva/router'
// import dynamic from 'dva/dynamic'
import Home from './views/Home'
import Foo from './views/Foo'
import { PATH_HOME, PATH_FOO } from './router/path'

const App: FC<RouterAPI> = ({ history, app }) => {
  return (
    <Router history={history}>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route path={PATH_HOME} exact component={Home} />
          <Route path={PATH_FOO} component={Foo} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
