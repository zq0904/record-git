import { log, isTextNode, isElNode, toArray, isInstruction, isEventInstruction } from './util.js'

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
    text: (node, value) => node.innerText = this.getDataVal(value),
    html: (node, value) => node.innerHTML = this.getDataVal(value),
    model: (node, value) => node.value = this.getDataVal(value),
    event: (node, name, value) => {
      const eventName = name.startsWith('@') ? name.substr(1) : name.split(':')[1]
      if (!value.match(/\(.*\)/)) {
        node.addEventListener(eventName, this.$vm.$methods[value].bind(this.$vm))
      } else { // 具有形式参数 调用形式 $event
        const EVENT = '$event'
        const arr = value.match(/(.*)\((.*)\)/)
        const args = arr[2].split(',').map(v => {
          const val = v.trim()
          if (val === EVENT) { // "$event"
            return EVENT
          } else if (val.match(/^'(.*)'$/)) { // "'1'"
            return RegExp.$1
          } else if (!isNaN(Number(val))) { // "1"
            return Number(val)
          } else { // "msg"
            return this.getDataVal(val)
          }
        })
        node.addEventListener(eventName, event => {
          this.$vm.$methods[arr[1]].call(this.$vm, ...args.map(v => v === EVENT ? event : v))
        })
      }
    }
  }
  // 根据字符串获取数据的值
  getDataVal = value => {
    let res = this.$vm.$data
    if (value.includes('.')) {
      for (const v of value.split('.')) {
        res = res[v]
      }
    } else {
      res = res[value]
    }
    return res
  }
  // 解析childNodes
  parsingChildNodes = (childNodes) => {
    for (const node of childNodes) {
      if (isTextNode(node)) this.parsingTextNode(node)
      else if (isElNode(node)) this.parsingElNode(node)
    }
  }
  // 解析文本节点
  parsingTextNode = (node) => {
    if (node.textContent.match(/\{\{(.*)\}\}/)) {
      // 这里占时不对 RegExp.$1.trim() 进一步解析
      const res = this.getDataVal(RegExp.$1.trim())
      node.textContent = node.textContent.replace(/\{\{.*\}\}/, res)
    }
  }
  // 解析标签节点
  parsingElNode = (node) => {
    for (const { name, value } of node.attributes) {
      if (isEventInstruction(name)) { // 属性指令中事件指令
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
