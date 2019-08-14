import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

const Bar = lazy(() => import('@/pages/Bar'))
const Foo = lazy(() => import('@/pages/Foo'))

const RouterView = () => (
  <Suspense fallback={<div>loading...</div>}>
    <Switch>
      <Route path="/Bar" component={Bar} />
      <Route path="/Foo" component={Foo} />
    </Switch>
  </Suspense>
)

export default RouterView
