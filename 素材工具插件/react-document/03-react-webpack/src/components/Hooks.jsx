import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
  useLayoutEffect,
} from 'react'

// hooks 解决的问题： 在组件之间重用状态逻辑 状态提升(render props) 或者 高阶组件HOC 自定义Hook可以让你在不增加组件的情况下达到同样的目的

// Hook 使用规则
// 1.只能在函数最外层调用Hook 不要在循环、条件判断或者子函数中调用（React依赖 Hook 调用顺序 来对应state于useState的关系）
// 2.只能在 React函数组件中调用Hook 或者 自定义的Hook

// hook性能
// hook避免了class额外开支 如创建类实例和在构造函数中绑定事件处理器的成本
// hook避免了很深的组件树嵌套 相比 HOC 和 render props
// useCallback保持函数引用 保证了子组件的 shouldComponentUpdate 优化

// hook底层原理 每个组件内部都有一个闭包对象 当你使用hook时（首次渲染初始化，其他渲染读取信息）并将指针指向下一个位置（所以必须保证hook不能在条件判断中使用）

// useState
const US = props => {
  // useState参数 可以直接是简单类型 不需要一定是对象
  // setNum方法会更新 num 的值 是替换不是合并
  const [num, setNum] = useState(0)
  return (
    <div>
      <span>useState：</span>
      <button onClick={() => setNum(num+1)}>US更新</button>
      <span>{num}</span>
    </div>
  )
}

// useEffect 相当于 componentDidMount componentDidUpdate componentWillUnmount 这三个函数的组合
// 副作用包括(数据获取、订阅、DOM操作)

// 不需要清除的 effect
const UE = props => {
  const [num, setNum] = useState(0)
  // 这个函数 会在 componentDidMount 和 componentDidUpdate 会执行 一定会保证dom更新完成
  useEffect(() => {
    console.log('useEffect')
  })
  return (
    <div>
      <span>useEffect：</span>
      <button onClick={() => setNum(num+1)}>UE更新</button>
    </div>
  )
}

// 需要清除的 effect
const UE2 = props => {
  const [num, setNum] = useState(0)
  // useEffect 返回的函数 会在 componentDidUpdate ‘先’执行 或者在 componentWillUnmount 执行
  // 如果依赖数组 会在成员发生改变时 先清除上一个 在执行当前
  useEffect(() => {
    console.log(1)
    return () => {
      console.log(2)
    }
  })
  return (
    <div>
      <span>useEffect2：</span>
      <button onClick={() => setNum(num+1)}>UE2更新</button>
    </div>
  )
}

// 通过跳过 Effect 进行性能优化
const UE3 = props => {
  const [num, setNum] = useState(0)
  // 只有在num更改时 才会调用 （相当于在componentDidUpdate(prevProps, prevState) 去判断了num是否变更 去执行副作用）
  // 设置为[] 直接模拟componentDidMount
  useEffect(() => {
    console.log(3)
  }, [num])
  return (
    <div>
      <span>useEffect3：</span>
      <button onClick={() => setNum(num+1)}>UE3更新</button>
    </div>
  )
}

const UE4 = props => {
  const [num, setNum] = useState(0)
  // setNum(num+1) useEffect就必须依赖num 而我们只想componentDidMount绑定componetWillUnmount卸载 setNum支持函数写法 这样就不依赖于num
  // 对于一些更复杂的场景 应该使用useReducer（reducer把状态更新逻辑移到 effect 之外） useReducer 的 dispatch 的身份永远是稳定的 —— 即使 reducer 函数是定义在组件内部并且依赖 props
  useEffect(() => {
    const id = setInterval(() => {
      setNum(v => v + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div>
      <span>useEffect4：</span>
      <span>{num}</span>
    </div>
  )
}

// 自定义Hook 规范要求以use开头+大写字母
function useCustom(initialNum) {
  const [num, setNum] = useState(initialNum)
  useEffect(() => console.log(num), [num])
  return [num, setNum]
}
const UC = props => {
  const [num, setNum] = useCustom(0)
  return (
    <div>
      <span>自定义Hook：</span>
      <span>{num}</span>
      <button onClick={() => setNum(v => v+1)}>UC更新</button>
    </div>
  )
}

// useContext
const MyContext = React.createContext({a:1}) // 只有在组件树中没有匹配Provider 才会使用默认值
const Ucontext = props => {
  const value = useContext(MyContext) // 相当于class组件中的 static contextType = MyContext
  console.log('value', value)
  return (
    <div>useContext</div>
  )
}

// useReducer
const initial = 1
const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return state + 1
    default:
      return state
  }
}
const UR = props => {
  const [state, dispatch] = useReducer(reducer, initial)
  return (
    <div>
      <span>useReducer：</span>
      <span>{state}</span>
      <button onClick={() => dispatch({type: 'add'})}>UR更新</button>
    </div>
  )
}

// useCallback 返回一个记忆函数 依赖数组发生生变化 重新计算返回记忆函数
// useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
const UCa = () => {
  const [num, setNum] = useState(0)
  const change = useCallback(() => setNum(v => v+1), [])
  return (
    <div>
      <span>useCallback：</span>
      <span>{num}</span>
      <button onClick={change}>UCa更新</button>
    </div>
  )
}

// useRef
const URe = () => {
  const ref = useRef(null)
  return (
    <div>
      <span>useRef：</span>
      <input type="text" ref={ref}/>
      <button onClick={() => ref.current.focus() }>URe聚焦</button>
    </div>
  )
}

// useImperativeHandle 主要用于自定义暴露给父组件的ref 一般与forwardRef连用
const UIm = forwardRef((props, ref) => {
  const uref = useRef()
  useImperativeHandle(ref, () => ({ focus() { uref.current.focus() } }))
  return (
    <div>
      <span>useImperativeHandle：</span>
      <input type="text" ref={uref}/>
    </div>
  )
})

// useLayoutEffect 是真正意义上的 componentDidMount componentDidUpdate componentWillUnmount
// 尽可能使用标准的 useEffect 以避免阻塞视觉更新
const ULE = () => {
  const ref = useRef()
  const [num, setNum] = useState(0)
  useEffect(() => {
    console.log('执行 useEffect', num, ref)
    return () => {
      console.log('清理 useEffect', num, ref)
    }
  })
  useLayoutEffect(() => {
    console.log('执行 useLayoutEffect', num, ref)
    return () => {
      console.log('清理 useLayoutEffect', num, ref)
    }
  })
  return (
    <div>
      <span>useLayoutEffect：</span>
      <span>{num}</span>
      <button onClick={() => setNum(v => v+1)}>更新</button>
      <Son/>
    </div>
  )
}
class Father extends React.Component {
  componentDidMount() { console.log('Father componentDidMount') }
  componentDidUpdate() { console.log('Father componentDidUpdate') }
  componentWillUnmount() { console.log('Father componentWillUnmount') }
  render() {
    return (
      <div>
        Father
        <ULE/>
      </div>
    )
  }
}
class Son extends React.Component {
  componentDidMount() { console.log('Son componentDidMount') }
  componentDidUpdate() { console.log('Son componentDidUpdate') }
  componentWillUnmount() { console.log('Son componentWillUnmount') }
  render() {
    return (
      <div>Son</div>
    )
  }
}

// 常见的自定义Hooks：
// 模拟生命周期
const useDidMount = (fn) => useEffect(fn, [])
const useDidUpdate = (fn, deps) => {
  const flag = useRef(false)
  useEffect(() => {
    if (flag.current === false) {
      flag.current = true
    } else {
      return fn()
    }
  }, deps)
}
const useWillUnmount = (fn) => useEffect(() => fn, [])
// form双向绑定
const useForm = (initial) => {
  const [value, setVal] = useState(initial)
  const onChange = (e) => setVal(e.target.value)
  return { value, onChange }
}
// 合并useState 大多数情况 你不需要使用 合理划分多个useState有助于公共代码的提取
const useMergeState = (initial) => {
  const [state, setState] = useState(initial)
  const fn = (arg) => {
    if (typeof arg === 'function') {
      setState(prevState => ({ ...prevState, ...arg(prevState) }))
    } else {
      setState(prevState => ({ ...prevState, ...arg }))
    }
  }
  return [state, fn]
}
// 获取上一轮的 值
const usePrev = (value) => {
  const ref = useRef()
  useEffect(() => { ref.current = value })
  return ref.current
}
// 测量dom useRef 绑定后不会通知你 ref+useCallback可以 <dom ref={() => {}} />
const useRect = () => {
  const [rect, setRect] = useState()
  const callback = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect())
    }
  }, [])
  return [rect, callback]
}

const Using = () => {
  const [num, setNum] = useState(0)
  useDidMount(() => console.log('useDidMount'))
  useDidUpdate(() => console.log('useDidUpdate'))
  useWillUnmount(() => console.log('useWillUnmount'))
  const form = useForm(1)
  const [data, setDate] = useMergeState({a: 1, b: 2})
  const prevData = usePrev(data)
  console.log('prevData', prevData)
  const [react, callback] = useRect()
  console.log(react)
  return (
    <div>
      <span>{num}</span>
      <button onClick={() => setNum(v => v+1)}>更新</button>
      <input type="text" {...form} />
      <button onClick={() => console.log(form.value)}>获取input当前的值</button>
      <span>{JSON.stringify(data)}</span>
      <button onClick={() => setDate({a:data.a+1})}>更新</button>
      <button onClick={() => setDate(prev => ({a:prev.a+1}))}>更新</button>
      <span ref={callback}>rect</span>
    </div>
  )
}

// React.pureComponet 覆写了一个简单的shouldComponentUpdate()实现 （浅比较props和state）
// React.memo 只会浅比较props
// hooks中目前没有shouldComponentUpdate完全等价写法的方式 可以使用React.memo优化每一个具体的子节点
const AAA =  React.memo(() => {
  const [n, setN] = useState(0)
  console.log('AAA组件重新渲染了')
  return (
    <div>
      <span>AAA</span>
      <button onClick={() => setN(v => v+1)}>gx</button>
    </div>
  )
}, (prevProps, nextProps) => { // 第二个参数为自定义比较函数
  return false // true表不更新
})
class BBB extends React.PureComponent {
  state = { b: 1 }
  render() {
    console.log('BBB组件重新渲染了')
    return (
      <div>
        <span>BBB</span>
        <button onClick={() => this.setState(v => ({b: v.b+1}))}>gx</button>
      </div>
    )
  }
}

// 使用hook发请求
const request = req => {
  console.log('请求的数据', req)
  return new Promise(resolve => {
    setTimeout(() => resolve([1,2,3]), 1000)
  })
}
const Urequest = () => {
  const [val, setVal] = useState('')
  const handleChange = useCallback(e => setVal(e.target.value), [])

  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState(true)
  const handleClick = useCallback(async () => {
    setLoading(true)
    const d = await request(val)
    setData(d)
    setLoading(false)
  }, [val])
  useEffect(() => {
    handleClick()
  }, [])
  return (
    <div>
      <input type="text" value={val} onChange={handleChange} />
      <button onClick={handleClick}>搜索</button>
      {
        isLoading ? <div>loading...</div> : (
          <ul>
            {
              data.map(v => <li key={v}>{v}</li>)
            }
          </ul>
        )
      }
    </div>
  )
}

export default () => {
  const [b, setB] = useState(true)
  const ref = useRef()
  return (
    <div>
      <h2>Hooks</h2>
      <US />
      <UE />
      {b && <UE2 />}<button onClick={() => setB(!b)}>toogle UE2</button><br/>
      <UE3 />
      <UE4 />
      <UC />
      <MyContext.Provider value={{b:2}}>
        <Ucontext />
      </MyContext.Provider>
      <UR />
      <UCa />
      <URe />
      <UIm ref={ref} />
      <button onClick={() => ref.current.focus()}>聚焦</button><br/>
      <Father />
      {b && <Using />}
      <AAA b={b} />
      <BBB />
      <Urequest />
    </div>
  )
}