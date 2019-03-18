import React from 'react';

class Box1 extends React.Component {
  render() {
    return (
      <div>Box1</div>
    )
  }
}

// ref不能在函数组件上使用 因为它们没有实例 采用forwardRef转发ref可以拿到函数式组件内部dom
const Box2 = React.forwardRef((props, ref) => <div ref={ref}>Box2</div>)
// 回调ref
const Box3 = props => <div ref={props.callBackRef}>Box3</div>

class Example extends React.Component {
  $input = React.createRef()
  clickHandler = () => {
    this.$input.current.focus()
  }
  render() {
    return (
      <div>
        <input type="text" ref={this.$input}/>
        <input type="text" onClick={this.clickHandler}/>
      </div>
    )
  }
}

export default class RefsDom extends React.Component {
  myRef = React.createRef()
  Box1 = React.createRef()
  Box2 = React.createRef()
  componentDidMount() {
    console.log(this.$el, this.myRef.current, this.Box1.current, this.Box2.current, this.Box3)
  }
  render() {
    return (
      <div>
        <h4>RefsDom</h4>
        <div ref={el => this.$el = el}>1</div>
        <div ref={this.myRef}>2</div>
        <Box1 ref={this.Box1} />
        <Box2 ref={this.Box2} />
        <Box3 callBackRef={el => this.Box3 = el}/>
        <Example/>
      </div>
    );
  }
}
