import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Base from './components/Base' // 基础操作
import Api from './components/Api' // 绝大部分api的使用
import ToolFunction from './components/ToolFunction' // 工具函数 如 toJS的使用
import OptimizeReact from './components/OptimizeReact' // 性能优化
import MobxReactLite from './components/MobxReactLite' // mobx-react-lite的使用
import './App.css';

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route exact path="/" component={Base} />
        <Route path="/Api" component={Api} />
        <Route path="/ToolFunction" component={ToolFunction} />
        <Route path="/OptimizeReact" component={OptimizeReact} />
        <Route path="/MobxReactLite" component={MobxReactLite} />
      </Switch>
    </Router>
  );
}

export default App;
