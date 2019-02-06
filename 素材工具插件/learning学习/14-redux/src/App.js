import React, { Component } from 'react'
import Bar from './containers/Bar'
import Foo from './containers/Foo'
import Goods from './containers/Goods'
import Cart from './containers/Cart'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Bar/>
        <hr/>
        <Foo/>
        <hr/> */}
        <Goods/>
        <hr/>
        <Cart/>
      </div>
    );
  }
}

export default App;
