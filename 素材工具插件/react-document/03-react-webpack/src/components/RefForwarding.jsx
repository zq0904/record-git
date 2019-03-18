import React from 'react';

// 3.必须使用 React.forwardRef 才能获取到ref参数 （无状态组件 类组件 不会接受ref参数）
const FancyButton = React.forwardRef((props, ref) => {
  console.log('React.forwardRef创建的组件中', props, ref.current)
  return (
    // 4.ref参数指定为dom的ref属性
    <button
      className="FancyButton"
      ref={ref}>{props.children}</button>
  )
})

const ref = React.createRef() // 1.通过React.createRef 创建一个变量 2.并作为ref属性
setTimeout(() => {
  console.log('React', ref.current) // 5.最后的结果：ref.current指向button dom节点
}, 0)

export default class RefForwarding extends React.Component {
  render() {
    return (
      <FancyButton ref={ref}>Click me!</FancyButton>
    );
  }
}
