import MockReact, { Component } from './react/react'
import ReactDOM from './react/react-dom'

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

ReactDOM.render(
  <MyC className="box">
    <span>3</span>
    <span>4</span>
  </MyC>,
  document.getElementById('app')
)
