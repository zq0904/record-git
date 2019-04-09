import React from 'react';

// React 声明周期 分为 16.3之前 之后 由于React在17要开启异步渲染 对一些可能会产生副作用的声明周期钩子做了调整
// 删除了 componentWillMount componentWillReceiveProps componentWillUpdate
// 新增了 static getDerivedStateFromProps getSnapshotBeforeUpdate

// 从一个组件通过路由跳转到另一个组件 要展示的组件的componentWillMount先执行 然后在执行卸载组建的componentWillUnmount

class Api extends React.Component {
  static displayName = 'API组件' // devtool 中名字 方便调试HOC设置
  static defaultProps = {} // 设置默认props
  state = {
    A: 'state的A'
  }
  // react生命周期
  constructor(props) {
    super(props)
    console.log('constructor')
  }
  // componentWillReceiveProps(nextProps, prevProps) { // 缺陷 一次更新中可能被调用多次
  //   console.log('componentWillReceiveProps', nextProps, prevProps)
  // }
  // static getDerivedStateFromProps(nextProps, prevProps) { // 用来替换原来的 componentWillReceiveProps
  //   // 该函数中获取不到 this 通过比较后前 props变化 return 对象 混入state中 后续操作强制用户写入其他生命周期钩子中
  //   // 初始就会执行一次 不同于componentWillReceiveProps
  //   console.log('getDerivedStateFromProps', nextProps, prevProps)
  //   return null
  // }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState)
    return true
  }
  // componentWillMount() {
  //   console.log('componentWillMount')
  // }
  // componentWillUpdate() { // 缺陷 一次更新中可能被调用多次
  //   console.log('componentWillUpdate')
  // }
  render() {
    console.log('render', this)
    return (
      <div>
        <h4>Api</h4>
        <p>this.state.A：{this.state.A}</p>
        <p>this.props.a：{this.props.a}</p>
        <button onClick={() => this.setState({A: 'A'})}>setState()</button>
        <button onClick={() => this.forceUpdate()}>forceUpdate()</button>
        <button onClick={e => console.log(e, e.nativeEvent)}>SyntheticEvent</button>
      </div>
    );
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  // getSnapshotBeforeUpdate(prevProps, prevState) { // 该函数的返回值将作为第3个参数传递给componentDidUpdate (例如：重新渲染过程中手动保留滚动位置等情况下非常有用)
  //   console.log('getSnapshotBeforeUpdate', prevProps, prevState)
  //   return {asd: 'asd'}
  // }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState, snapshot)
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError')
  }
  componentDidCatch(error, info) {
    console.log('componentDidCatch')
  }
}

// 首次渲染
// constructor
// getDerivedStateFromProps {a: 1} {}
// render
// componentDidMount

// props更新
// getDerivedStateFromProps {a: 2} {}
// shouldComponentUpdate {a: 2} {}
// render
// getSnapshotBeforeUpdate // 可以获取前一个dom的状态 在真的dom渲染之前执行
// componentDidUpdate

// 卸载
// componentWillUnmount

// 错误处理 （在渲染期间，生命周期方法或任何子组件的构造函数中发生错误时）
// static getDerivedStateFromError
// componentDidCatch


export default class extends React.Component {
  state = {
    a: 1
  }
  render() {
    return (
      <Api {...this.state}/>
    )
  }
  componentDidMount() {
    this.timeId = setTimeout(() => {
      this.setState(prevState => ({
        a: ++prevState.a
      }))
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timeId)
  }
}