// 数据劫持
class Observer {
  constructor(data) {
    this.$data = data
    this.hijacked()
  }
  hijacked = () => {
    for (const key of Object.keys(this.$data)) {
      Object.defineProperty(this.$data, key, {
        get () {

        },
        set () {

        }
      })
    }
  }
}

export default Observer
