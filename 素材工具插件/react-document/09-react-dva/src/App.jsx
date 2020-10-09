import React, { Suspense } from 'react'
import { Router, Route, Switch } from 'dva/router'
import dynamic from 'dva/dynamic'

const App = ({ history, app }) => (
  <Router history={history}>
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route
          path="/"
          exact
          component={dynamic({
            app,
            models: () => [import('./models/Home')],
            component: () => import('./views/Home'),
          })}
        />
        <Route
          path="/foo"
          component={dynamic({
            app,
            models: () => [import('./models/Foo')],
            component: () => import('./views/Foo'),
          })}
        />
      </Switch>
    </Suspense>
  </Router>
)

export default App
