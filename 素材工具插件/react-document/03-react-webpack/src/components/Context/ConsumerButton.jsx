// 从嵌套组件更新上下文
import React from 'react';
import { ThemeContext2 } from './ThemeContext.js'

export default class ConsumerButton extends React.Component {
  render() {
    return (
      <ThemeContext2.Consumer>
        {({background, toggle}) => (
          <button {...this.props} style={{backgroundColor: background}} onClick={toggle}></button>
        )}
      </ThemeContext2.Consumer>
    );
  }
}
