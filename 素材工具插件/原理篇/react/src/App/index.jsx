import MockReact, { Component } from '../react/react'

class MyC extends Component {
  render() {
    console.log('this.props', this.props)
    return (
      <div a="1">
        <span>1</span>
        <span>2</span>
        { this.props.children }
      </div>
    )
  }
}

class App extends Component {
  render () {
    return (
      <MyC className="box">
        <span>3</span>
        <span>4</span>
      </MyC>
    )
  }
}

export default App
