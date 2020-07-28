import MockReact, { Component } from './MockReact'

class MyC extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <span>我</span>
        <span>可</span>
        <span>以</span>
      </div>
    )
  }
}

MockReact.render(<MyC className="box"/>, document.body)
