import React from 'react';

// React.StrictMode 有助于
// 1.识别不安全的声明周期方法
// 2.关于遗留字符串ref API使用的警告
// 3.关于已弃用的findDOMNode用法的警告
// 4.检测意外的副作用
// 5.检测遗留上下文API
// 给予警告提示
class StaticMode extends React.Component {
  componentDidMount() {
    console.log(this)
  }
  render() {
    return (
      <div>
        <h1>StaticMode.jsx</h1>
        <div ref="asd">1</div>
      </div>
    );
  }
}

export default () => (
  <React.StrictMode>
    <StaticMode/>
  </React.StrictMode>
)
