import React from 'react';

// React 生命周期 分为 16.3之前 之后 由于React在17要开启异步渲染 对一些可能会产生副作用的声明周期钩子做了调整
// 删除了 componentWillMount componentWillReceiveProps componentWillUpdate
// 新增了 static getDerivedStateFromProps getSnapshotBeforeUpdate

// 展示组件 执行顺序 内层组件的compoentDidMount 外层组价的componentDidMount
// 更新组件 执行顺序 内层组件的componentDidUpdate 外层组价的componentDidUpdate
// 卸载组件 执行顺序 外层组价的componentWillUnmount 内层组件的componentWillUnmount

class Son extends React.Component {
  static displayName = 'Son组件' // devtool 中名字 方便调试HOC设置
  static defaultProps = {} // 设置默认props
  state = {
    A: 'state的A'
  }
  // react生命周期
  constructor(props) {
    super(props)
    console.log('constructor')
  }
  // componentWillReceiveProps(nextProps) { // 缺陷 一次更新中可能被调用多次 尝试使用componentDidUpdate
  //   console.log('componentWillReceiveProps', nextProps, 'prevProps ->', this.props)
  // }
  static getDerivedStateFromProps(nextProps, State) { // 用来替换原来的 componentWillReceiveProps 初始就会执行一次
    // 返回的对象 会混入state中
    console.log('getDerivedStateFromProps', nextProps, State)
    return { c: 1 }
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState, JSON.stringify(this.state), JSON.stringify(this.props)) // this.state this.props 拿到的是上一次的
    return true // 返回true 表允许更新
  }
  // componentWillMount() { // 尝试使用componentDidMount
  //   console.log('componentWillMount')
  // }
  // componentWillUpdate() { // 缺陷 一次更新中可能被调用多次
  //   console.log('componentWillUpdate')
  // }
  render() {
    console.log('render', this)
    return (
      <div>
        <h4>Son</h4>
        <p>this.props.a：{this.props.a}</p>
        <p>this.state.A：{this.state.A}</p>
        <button onClick={() => this.setState({A: 'A'})}>更改state</button>
        <button onClick={() => this.forceUpdate()}>forceUpdate()强制更新</button>
        <button onClick={e => console.log(e, e.nativeEvent)}>SyntheticEvent 合成事件</button>
      </div>
    );
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  getSnapshotBeforeUpdate(prevProps, prevState) { // 该函数的返回值将作为第3个参数传递给componentDidUpdate (例如：重新渲染过程中手动保留滚动位置等情况下非常有用)
    console.log('getSnapshotBeforeUpdate', prevProps, prevState)
    return {asd: 'asd'}
  }
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
// getDerivedStateFromProps
// render
// componentDidMount

// props 或 state 发生变更
// getDerivedStateFromProps
// shouldComponentUpdate
// render
// getSnapshotBeforeUpdate // 可以获取前一个dom的状态 在真的dom渲染之前执行
// componentDidUpdate

// 卸载
// componentWillUnmount

// 错误处理 （在渲染期间，生命周期方法或任何子组件的构造函数中发生错误时）
// static getDerivedStateFromError
// componentDidCatch


export default class Father extends React.Component {
  state = { a: 1 }
  render() {
    return (
      <div>
        <button onClick={() => this.setState(prevState => ({ a: prevState.a + 1 }))}>更改父级state</button>
        <hr/>
        <Son {...this.state} />
      </div>
    )
  }
  componentDidMount() { console.log('Father -> componentDidMount') }
  componentDidUpdate() { console.log('Father -> componentDidUpdate') }
  componentWillUnmount() { console.log('Father -> componentWillUnmount') }
}