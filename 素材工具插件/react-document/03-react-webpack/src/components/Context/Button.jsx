import React from 'react'
import { ThemeContext } from './ThemeContext.js'

export default class Button extends React.Component {
  static contextType = ThemeContext
  render() {
    return (
      // this.props.children  会当成文本节点插入
      <button {...this.props} style={{backgroundColor: this.context.background}} />
    )
  }
}
