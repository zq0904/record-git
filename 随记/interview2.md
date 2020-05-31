## 下面代码babel编译完的结果是什么 原型链
  ```js
    class A extends B {
      static prop = {}
      getName() {
        return this.name
      }
    }

    function B() {}
    function A(name) {
      B.call(this)
      this.name = name
      this.getName = function() {
        return this.name
      }
    }
    A.prop = {}
    A.prototype = new B()
  ```
## 以下代码输出什么 原型链
  ```js
    Function.prototype.a = () => console.log(1)
    Object.prototype.b = () => console.log(2)
    function A() {}
    const a = new A()
    a.a() // 报错
    a.b() // 2
    // 函数有2条原型链 A.__proto__ === Function.prototype 其实例对象的__proto__ === A.prototype
    // a.__proto__ === A.prototype 但A.prototype 由Object所创建（A.prototype.__proto__ === Object.prototype）
  ```
## 设计一个评星组件
  ```tsx
    interface SProps {
      count?: number;
      score?: number;
      w?: number; // 颗粒度
      cb?: Function;
    }
    const S: FC<SProps> = ({ count = 0, score = 0, w = 0.5, cb }) => {
      const [score, setScore] = useState(score)
      const arr = new Array(count / w).fill('')
      return (
        <div class="s-box">
          {
            arr.map((v, i) => (
              <div
                class={classnames(
                  's-s',
                  (i + 1) % 2 === 0 ? 's-s-r' : 's-s-l'
                )}
                key={ i }
                onClick={() => {
                  setScore((i + 1) * w)
                  cb && cb((i + 1) * w)
                }}
              >
                <div class={classnames("s-p", { on: (i + 1) * w < score })}><div>
              <div>
            ))
          }
        <div>
      )
    }
  ```
## es6, amd, cmd, UMD 区别和如何使用 写下umd
  ```js
    ;(function(e, cb) {
      typeof exports === 'object' && typeof module.exports !== 'undefined' ?
      cb(e) :
      typeof define === 'function' && define.amd ?
      define(['exports'], cb) :
      cb(e = (e || self).zero = {})
    })(this, function(e) {
      // 如果是cjs e 是module.exports
      // 如果是amd e 是define中的 exports
      // 如果是浏览器 e 是window下的某个全局变量
      e.array = function() {}
      Object.defineProperty(e, '__esModule', { value: true })
    })
  ```
## 实现一个事件订阅和发布模型 [参考](https://github.com/zq0904/zeroer/blob/master/packages/zeroer-core/src/Event/index.ts)
## 封装一个方法 观测一个对象的某个属性 当修改它的属性时 自动触发去执行一个函数
  ```js
    function observe(obj, key, cb) {
      let _val = obj[key]
      Object.defineProperty(obj, key, {
        get() {
          return _val
        },
        set(val) {
          if (val !== _val) {
            _val = val
            cb(val)
          }
        }
      })
    }
  ```
## 怎么保证页面呈现的最终ajax结果与输入匹配
  ```tsx
    // 对闭包的运用
    const fetch = ({ sequence, url, reqData }) => axios.post(url, reqData).then(res => res.sequence = sequence)

    function App(props) {
      const sequenceRef = useRef(0)

      const localStore = useLocalStore(() => ({
        value: '',
        list: [],
        setStore(payload) { Object.assign(this, payload) }
      }))
      const hanldeInput = async (e) => {
        const value = e.target.value
        localStore.setStore({ value })

        sequenceRef.current = sequenceRef.current + 1 // 标识序列递增

        const { flag, msg, data, sequence } = await fetch({
          sequence: sequenceRef.current,
          url: 'xxx',
          reqData: { value }
        })
        if (flag !== 1) return alert(msg)

        // 确实是最后匹配的视图
        if (sequence === sequenceRef.current) {
          localStore.setStore({ list: data })
        }
      }

      return (
        <div>
          <input
            type="text"
            value={localStore.value}
            onInput={hanldeInput}
          />
          <ul>
            {
              localStore.list.map(v => (
                <li>{v}</li>
              ))
            }
          </ul>
        </div>
      )
    }

    export default observe(App)
  ```
## 对象引用 函数参数如果是简单类型 直接就是值的拷贝 如果是引用类型 就指向引用地址
  ```js
    function f(o) {
      o.a = 1
      o = {}
      o.a = 2
    }
    const o = {}
    f(o)
    console.log(o.a) // 1
  ```
## js严格模式有那些特点
  ```js
    // ES6 的 class 和 模块内都是默认的严格模式
    a = 123 // 必须显示声明变量
    const o = {}
    Object.freeze(o)
    o.a = 1 // 严格模式下 对被冻结的对象赋值将导致报错
  ```
## 实现 一个 setQs
  主要考察安全 encodeURIComponent 还有 如果有重复的参数替换Object.assign
## 时间复杂度 [参考](https://baijiahao.baidu.com/s?id=1634508207797410717&wfr=spider&for=pc)
## 数组乱序 如何做到每个值的概率相同（洗牌算法）
  ```js
    const shuffle = arr => arr.sort(() => Math.random() - .5) // 无法保证概率相同（v8引擎 数组长度小于10时，使用插入排序；反之使用快速排序和插入排序的混合排序）
    function shuffle(arr) {
      for (let i = arr.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)) // 0 - arr.length-1 整数
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
    // 时间复杂度 O(n)
  ```
## 冒泡排序
  ```js
    function bubbl(arr) {
      for (let i = 1; i <= arr.length - 1; i++) {
        let f = true // 是否都已经排好了
        for (let j = 0; j <= arr.length - 1 - i; j++) {
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            f = false
          }
        }
        if (f) break
      }
      return arr
    }
    时间复杂度O(n^2)
  ```
## react 中setStore 什么时候是同步的 什么时候是异步的
  由react控制的生命周期函数及事件处理程序调用setState不会同步更新，而会合并到一起批量更新（优化策略）
  原声js绑定的事件和setTimeout等 都只能同步更新
  ```jsx
    class A extends Component {
      state = { n: 0 }
      commentDidMount() {
        this.setState({ n: this.state.n + 1 })
        console.log(this.state.n) // 0
        this.setState({ n: this.state.n + 1 })
        console.log(this.state.n) // 0
        setTimeout(() => {
          this.setState({ n: this.state.n + 1 })
          console.log(this.state.n)
          this.setState({ n: this.state.n + 1 })
          console.log(this.state.n)
        })
      }
      render() {
        return null
      }
    }
  ```
## react / vue 父子组价的声明周期 执行顺序 [参考](jianshu.com/p/318ffc6f4848)
  父组件先执行声明周期当执行到render时，才会子组件的声明周期，子组件的周期结束后，再回到上级的周期
  Parent constructor
  Parent componentWillMount
  Parent render
    Child constructor
    Child componentWillMount
    Child render
    Child componentDidMount
  Parent componentDidMount
## 最新的cookie属性机制
1. 非对称加密；
2. cookie和session的区别；
3. web worker；
4. 实现一个new 函数；
5. 计数调度器，保持多个请求并发
6. Vue的Ui渲染是异步的还是同步的；
7. Vue.$nextTick()有啥性能优化点

