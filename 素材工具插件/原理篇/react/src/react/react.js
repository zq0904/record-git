import { isString, isArray, isObject } from './utils'
import { Component, ElementWrap, TextWrap } from './wrap'

/**
 * 渲染函数
 * @param { string | Function } type 标签节点 | 类组件
 * @param { null | object } attrs 
 * @param { any[] } children 
 */
function createElement(type, attrs, ...children) {
  const vdom = isString(type) ? new ElementWrap(type) : new type

  if (isObject(attrs)) {
    for (const key of Object.keys(attrs)) {
      vdom.setAttribute(key, attrs[key])
    }
  }

  const insertChildren = children => {
    for (const child of children) {
      if (isArray(child)) { // 类组件 使用 this.props.chilren
        insertChildren(child)
      } else {
        if (isString(child)) child = new TextWrap(child)
        vdom.appendChild(child) // 类组件 挂载到this.props.children中  标签节点直接挂载到内部实体上
      }
    }
  }

  insertChildren(children)

  return vdom
}



export default {
  createElement,
  Component
}

export {
  Component
}
