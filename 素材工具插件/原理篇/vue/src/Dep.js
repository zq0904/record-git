// 订阅发布模型
class Dep {
  static nowWatcher = null
  queue = []
  // 添加订阅者
  subscribe = () => {
    Dep.nowWatcher && this.queue.push(Dep.nowWatcher)
  }
  release = () => {
    this.queue.forEach(watcher => watcher.update())
  }
}

export default Dep
