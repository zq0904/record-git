import React, { Component } from 'react';
// import Bar from './components/Bar.jsx'
// import Foo from './components/Foo.jsx'
import Goods from './components/Goods.jsx'
import Cart from './components/Cart.jsx'

import './App.css';

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
