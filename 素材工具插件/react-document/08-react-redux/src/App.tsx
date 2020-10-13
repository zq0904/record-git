import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './App.scss'

// 路由懒加载
const Home = lazy(() => import('./views/Home'))
const Todo = lazy(() => import('./views/Todo'))

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/todo/:filterType?" component={Todo}/>
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  )
}

export default App

// npm i redux react-redux @types/react-redux
// redux-thunk
// npm i redux-saga
// npm i @reduxjs/toolkit
