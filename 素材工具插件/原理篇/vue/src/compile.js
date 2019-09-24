import Watcher from './Watcher.js'
import {
  log,
  isTextNode,
  isElNode,
  toArray,
  isInstruction,
  isEventInstruction,
  getValByExp,
  setValByExp
} from './util.js'

// 初始解析渲染
class Compile {
  constructor(vm) {
    this.$vm = vm
    let rootNode = null
    if (typeof this.$vm.$el === 'string') rootNode = document.querySelector(this.$vm.$el)
    if (!(rootNode instanceof HTMLElement)) log(`el 为 ${this.$vm.$el} 您是否提供了正确的根节点?`)
    // childNodes 虽然具备iterator接口可以直接循环 但是它是“实时响应”的 如果其内部节点移除会直接导致childNodes长度实时变化 导致循环错乱
    // 这里只是复制一份数组 避免“实时响应”所引起的循环错乱
    const nodes = toArray(rootNode.childNodes)
    // 使用文档片段 以优化性能
    const fragment = document.createDocumentFragment()
    nodes.forEach(node => fragment.appendChild(node))
    this.parsingChildNodes(fragment.childNodes)
    rootNode.appendChild(fragment)
  }
  parsingInstruction = {
    text: (node, exp) => {
      node.innerText = getValByExp(this.$vm.$data, exp)
      new Watcher(this.$vm, exp, newVal => node.innerText = newVal)
    },
    html: (node, exp) => {
      node.innerHTML = getValByExp(this.$vm.$data, exp)
      new Watcher(this.$vm, exp, newVal => node.innerHTML = newVal)
    },
    model: (node, exp) => {
      // todo 这里 我们暂时 认为就是 input:text
      node.value = getValByExp(this.$vm.$data, exp)
      node.addEventListener('input', e => { // v -> vm
        setValByExp(this.$vm.$data, exp, e.target.value)
      })
      new Watcher(this.$vm, exp, newVal => node.value = newVal)
    },
    event: (node, name, exp) => {
      const eventName = name.startsWith('@') ? name.substr(1) : name.split(':')[1]
      if (!exp.match(/\(.*\)/)) { // 不存在形式参数
        node.addEventListener(eventName, this.$vm.$methods[exp].bind(this.$vm))
      } else { // 具有形式参数 调用形式 $event
        const EVENT = '$event'
        const arr = exp.match(/(.*)\((.*)\)/)
        const args = arr[2].split(',').map(v => {
          const val = v.trim()
          if (val === EVENT) { // "$event"
            return EVENT
          } else if (val.match(/^'(.*)'$/)) { // "'1'"
            return RegExp.$1
          } else if (!isNaN(Number(val))) { // "1"
            return Number(val)
          } else { // "msg"
            return getValByExp(this.$vm.$data, val)
          }
        })
        node.addEventListener(eventName, event => {
          this.$vm.$methods[arr[1]].apply(this.$vm, args.map(v => v === EVENT ? event : v))
        })
      }
    }
  }
  // 解析childNodes
  parsingChildNodes = (childNodes) => {
    for (const node of childNodes) {
      if (isTextNode(node)) this.parsingTextNode(node)
      else if (isElNode(node)) this.parsingElNode(node)
    }
  }
  // 解析文本节点
  parsingTextNode = node => {
    if (node.textContent.match(/\{\{(.*)\}\}/)) {
      // todo 这里暂时不对 RegExp.$1.trim() 进一步解析
      const exp = RegExp.$1.trim()
      node.textContent = node.textContent.replace(/\{\{.*\}\}/, getValByExp(this.$vm.$data, exp))
      new Watcher(this.$vm, exp, newVal => node.textContent = newVal)
    }
  }
  // 解析标签节点
  parsingElNode = (node) => {
    for (const { name, value } of node.attributes) {
      if (isEventInstruction(name)) { // 事件指令
        this.parsingInstruction.event(node, name, value)
      } else if (isInstruction(name)) { // 常规属性指令
        const fn = this.parsingInstruction[name.substr(2)]
        fn && fn(node, value)
      }
    }
    node.childNodes.length > 0 && this.parsingChildNodes(node.childNodes)
  }
}

export default Compile
