const isString = arg => typeof arg === 'string'
const isObject = arg => Object.prototype.toString.call(arg) === '[object Object]'

class ElementWraper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute(key, value) {
    this.root.setAttribute(key, value)
  }
  appendChild(vchild) {
    vchild.mountTo(this.root)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class TextWraper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class Component {
  setAttribute(key, value) {
    this[key] = value
  }
  mountTo(prent) {
    const vdom = this.render()
    prent.appendChild(vdom)
  }
}

class MockReact {
  static createElement(type, attrs, ...children) {
    console.log(type, attrs, ...children)
    debugger
    let dom = null
    if (isString(type)) {
      dom = new ElementWraper(type)
    } else {
      dom = new type
    }
    
    if (isObject(attrs)) {
      for (const key of Object.keys(attrs)) {
        dom.setAttribute(key, attrs[key])
      }
    }
    for (let child of children) {
      if (isString(child)) child = TextWraper(child)
      dom.appendChild(child)
    }
    return dom
  }
  static render(vdom, dom) {
    vdom.mountTo(dom)
  }
}
MockReact.Component = Component
export default MockReact

export { Component }
