import React, { useState } from 'react'
import { flow } from 'mobx'
import { inject, observer, useLocalStore, Observer } from 'mobx-react'
// import { useStore, storesContext } from '../store/utils'
// 在ts文件中 如果想使用别名 需要配置 tsconfig.json中的 baseUrl 和 paths 但CRA不支持会重置
// https://stackoverflow.com/questions/57070052/create-react-app-typescript-3-5-path-alias
// 常见的解决方案 https://github.com/facebook/create-react-app/issues/5118 但是ts类型检测将受到影响
import { useStore, storesContext } from '@/store/utils'

// 1. inject 虽然用起来没什么问题 很方便 但是对ts支持不友好
// 2. 对于useLocalStore 中的this ts支持问题
// 3. 异步问题
const Example1 = inject('testState')(
  observer((props) => {
    console.log(props)
    const [num, setNum] = useState(1)
    const store = useLocalStore(() => ({
      num: 1,
      // get 直接就是计算属性
      get asd1() {
        console.log('asd1')
        return this.num * 100
      },
      addNum() {
        this.num += 1
      },
      asyncAddNum: flow(function *() {
        const data = yield Promise.resolve(213)
        store.num = data
      })
    }))
    return (
      <>
        <h2>Example1</h2>
        <p>到底是不是计算属性{store.asd1}</p>
        <p>{num}</p>
        <button onClick={() => setNum(num + 1)}>setNum</button>
        <hr/>
        <p>{store.num}</p>
        <button onClick={store.addNum}>addNum</button>
        <button onClick={store.asyncAddNum}>asyncAddNum</button>
      </>
    )
  })
)

// 函数组件中 使用 全局store 支持ts类型
const Example2 = observer(() => {
  const { test1Store } = useStore()
  return (
    <>
      <h2>Example2</h2>
      <p>{test1Store.num}</p>
      <button onClick={test1Store.addNum}>addNum</button>
      <button onClick={test1Store.asyncAddNum}>asyncAddNum</button>
    </>
  )
})

// 类组件中 如何使用全局store 支持ts类型
class Example3 extends React.PureComponent {
  render() {
    return (
      <>
        <h2>Example3</h2>
        <storesContext.Consumer>
          {
            ({ test2Store }) => {
              console.log('执行了')
              return (
                <Observer>
                  {() => (
                    <>
                      <p>{test2Store.num}</p>
                      <button onClick={test2Store.addNum}>addNum</button>
                      <button onClick={test2Store.asyncAddNum}>asyncAddNum</button>
                    </>
                  )}
                </Observer>
              )
            }
          }
        </storesContext.Consumer>
      </>
    )
  }
}

export default () => (
  <>
    <Example1 />
    <Example2 />
    <Example3 />
  </>
)
