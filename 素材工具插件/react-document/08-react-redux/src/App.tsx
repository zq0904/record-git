import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'

// 路由懒加载
const ExampleTodoList = lazy(() => import('./pages/ExampleTodoList'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/todo/:filterType?" component={ExampleTodoList}/>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
