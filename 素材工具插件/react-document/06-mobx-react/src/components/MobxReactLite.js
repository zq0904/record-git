import React, { useState } from 'react'
import { action } from 'mobx'
// mobx-react@6 版本依赖于mobx-react-lite
import { inject, observer, useLocalStore, Observer, useObserver, useAsObservableSource } from 'mobx-react'

// mobx-react @4 @5 中的 observer 对于hooks不是很友好 函数组件通过observer包装不能使用hooks
// mobx-react-lite | mobx-react @6 提供的 observer 对上述不足做出了支持 同时 还提供了useLocalStore为函数组件中 直接使用响应式数据提供支持

// 函数组件 react hooks 与 mobx联合使用
const FnC = ({ testState }) => {
  const [num, setNum] = useState(1)
  const localStore = useLocalStore(() => ({
    num: 1,
    addNum: action(() => localStore.num += 1)
  }))
  return (
    <div>
      <h2>Example1组件</h2>
      {/* inject注入的全局store */}
      <span>{testState.num}</span>
      <button onClick={testState.asyncAdd}>add</button>
      <hr/>
      {/* useState */}
      <span>{num}</span>
      <button onClick={() => setNum(num + 1)}>setNum</button>
      <hr/>
      {/* useLocalStore */}
      <span>{localStore.num}</span>
      <button onClick={localStore.addNum}>addNum</button>
    </div>
  )
}

const Example1 = inject('testState')(observer(FnC))

// observer装饰器函数 Observer组件 useObserver钩子 几乎完全等价
const Example2 = () => {
  const store = useLocalStore(() => ({
    num: 1,
    addNum: action(() => store.num += 1)
  }))
  // return useObserver(() => (
  //   <div>
  //     <h2>Example2组件</h2>
  //     <span>{store.num}</span>
  //     <button onClick={store.addNum}>addNum</button>
  //   </div>
  // ))
  return (
    <Observer>
      {() => (
        <div>
          <h2>Example2组件</h2>
          <span>{store.num}</span>
          <button onClick={store.addNum}>addNum</button>
        </div>
      )}
    </Observer>
  )
}

// useAsObservableSource 对整个变量集使用MobX的功能 如props
const Example3 = observer(({ info }) => {
  const store = useLocalStore(() => ({
    num: 1,
    addNum: action(() => store.num += 1),
    get totalPrice () {
      return store.num * info.price
    }
  }))
  return (
    <div>
      <h2>Example3组件</h2>
      <span>总价是：{store.totalPrice}</span>
      <button onClick={store.addNum}>addNum</button>
    </div>
  )
})
const MobxReactLite = () => {
  const [price, setPrice] = useState(100)
  // 1. useAsObservableSource 参数应始终是一个对象
  // 2. 一定不要结构
  // 2. 为了获得最佳性能 useAsObservableSource 不应该与 observer Observer useObserver 一起使用可能会触发双重渲染 比较好的做法是传递给Observer组件
  return (
    <div>
      <Example1 />
      <Example2 />
      <Example3 info={useAsObservableSource({ price })} />
      <button onClick={() => setPrice(200)}>setA</button>
    </div>
  )
}

export default MobxReactLite
