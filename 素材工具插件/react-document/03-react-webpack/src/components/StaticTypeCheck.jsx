import React from 'react'
import PropTypes from 'prop-types'

// React 15.5 以后已经弃用 React.propsTypes 助手 如果继续使用propsTypes建议使用 prop-types 库 来定义contextTypes
// React 推选使用 Flow TypeScript 来检测静态类型

class StaticTypeCheck extends React.Component {
  static defaultProps = { // 类型检测也适用于默认值 因为默认值在类型检测前就已生效
    name: 'qi'
  }
  static propTypes = {
    // 普通类型
    // s: PropTypes.array,
    // s: PropTypes.bool,
    // s: PropTypes.func,
    // s: PropTypes.number.isRequired,
    // s: PropTypes.object,
    // s: PropTypes.string,
    // s: PropTypes.symbol,

    // 任意类型
    // s: PropTypes.node,

    // React组件 <MyComponent />
    s: PropTypes.element.isRequired, // 必填

    // React元素类型
    // s: PropTypes.elementType,
  }
  render() {
    console.log(this.props)
    return (
      <div></div>
    );
  }
}

class Asd extends React.Component {
  render() {
    return (
      <div>AAA</div>
    )
  }
}

export default () => <StaticTypeCheck s={<Asd/>} />


