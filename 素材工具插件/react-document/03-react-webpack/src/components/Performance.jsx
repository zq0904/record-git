import React from 'react';

// 性能
// shouldComponentUpdate 声明周期钩子
class Performance extends React.Component {
  state = {
    num: 1
  }
  // 组件将要挂载
  componentWillMount() {
    console.log('componentWillMount')
    // this.timeId = setInterval(() => this.setState(prevState => ({
    //   num: ++prevState.num
    // })), 1000)
  }
  // 组件挂载完成
  componentDidMount() {
    console.log('componentDidMount')
  }
  // props将要发生变化
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps, this.props)
  }
  // 根据条件 来决定组件是否更新
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState, this.props, this.state)
    return true
  }
  // 组件将要更新
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate', nextProps, nextState, this.props)
  }
  // 组件更新完成
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', prevProps, prevState, this.props)
  }
  // 组件将要卸载
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  render() {
    return (
      <div>
        <h4>Performance</h4>
        <span>{this.state.num}</span>
      </div>
    );
  }
}

class ShowWord extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    for (const key in nextProps) {
      if (nextProps[key] !== this.props[key]) return true
    }
    return false
  }
  render() {
    return (
      <div>
        <h4>ShowWord</h4>
        {this.props.word.join(',')}
      </div>
    )
  }
}

// 继承React.PureComponent 相当于实现shouldComponentUpdate 不用自己去写 但仅仅是“浅比较”props和state
class ShowWord2 extends React.PureComponent {
  render() {
    return (
      <div>
        <h4>ShowWord2</h4>
        {this.props.word.join(',')}
      </div>
    )
  }
}

class AddWord extends React.Component {
  state = {
    word: [1],
    a: 1
  }
  handlerClick = () => {
    // 使用这种方式 每次返回的word都是同一个引用 浅比较是不会更新代码的 可以使用 [...prevState.word,1]每次返回一个新的数组来保证“不同”
    this.setState(prevState => {
      // const word = prevState.word
      // word.push(1)
      // return {
      //   word
      // }
      return { word: [...prevState.word,1] }
    })
  }
  render() {
    return (
      <div>
        <h4>AddWord</h4>
        <ShowWord word={this.state.word} a={this.state.a} />
        <ShowWord2 word={this.state.word} a={this.state.a} />
        <button children="更改word" onClick={this.handlerClick} />
      </div>
    )
  }
}

export default class extends React.Component {
  state = {
    isShow: true,
    args: { a: 1 }
  }
  render() {
    return (
      <div>
        { this.state.isShow && <Performance {...this.state.args} /> }
        <button onClick={() => this.setState((oldState) => ({isShow: !oldState.isShow}))}>toogleShow</button>
        <button onClick={() => this.setState((oldState) => ({args: oldState.args.a ? {} : oldState.args}))}>toogleArgs</button>
        <br />
        <AddWord/>
      </div>
    )
  }
}