/**
 * 自定义组件 目前仅支持类组件
 */
export class Component {
  constructor() {
    this.props = {}
  }
  setAttribute(key, value) {
    this.props[key] = value
  }
  appendChild(vchild) {
    if (!this.props.children) this.props.children = []
    this.props.children.push(vchild)
  }
  mountTo(dom) {
    const vdom = this.render()
    vdom.mountTo(dom)
  }
}

/**
 * 标签节点
 */
export class ElementWrap {
  constructor(name) {
    this.root = document.createElement(name)
  }
  setAttribute(key, value) {
    this.root.setAttribute(key, value)
  }
  appendChild(vchild) {
    vchild.mountTo(this.root)
  }
  mountTo(dom) {
    dom.appendChild(this.root)
  }
}

/**
 * 文本节点
 */
export class TextWrap {
  constructor(text) {
    this.root = document.createTextNode(text)
  }
  mountTo(dom) {
    dom.appendChild(this.root)
  }
}