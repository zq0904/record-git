import React from 'react'
import { ThemeContext, t, ThemeContext2, t2 } from './ThemeContext.js'
import Button from './Button.jsx'
import ConsumerButton from './ConsumerButton.jsx'

export default class Context2 extends React.Component {
  state = {
    t: t.dark,
    background: t2.background
  }
  handlerClick = () => {
    this.setState(state => ({
      t: state.t === t.dark ? t.light : t.dark
    }))
  }
  handlerClick2 = () => {
    this.setState(state => ({
      background: state.background === t2.background ? 'blue' : t2.background
    }))
  }
  render() {
    return (
      <div>
        <ThemeContext.Provider value={this.state.t}>
          <Button onClick={this.handlerClick}>change</Button>
        </ThemeContext.Provider>
        <br/>
        <Button onClick={this.handlerClick}>change</Button>
        <hr/>
        <ThemeContext2.Provider value={{background: this.state.background, toggle: this.handlerClick2}}>
          <ConsumerButton>ConsumerButton</ConsumerButton>
        </ThemeContext2.Provider>
      </div>
    )
  }
}
