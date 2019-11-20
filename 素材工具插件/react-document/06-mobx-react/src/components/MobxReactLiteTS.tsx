import React, { useEffect, useState } from 'react'
import { flow, action, autorun } from 'mobx'
import { inject, observer, useLocalStore, Observer, useAsObservableSource, useObserver } from 'mobx-react'
// 在ts文件中 如果想使用别名绝对路径导入 需要配置 tsconfig.json中的 baseUrl 和 paths 但CRA不支持会重置
// https://stackoverflow.com/questions/57070052/create-react-app-typescript-3-5-path-alias
// 常见的解决方案 https://github.com/facebook/create-react-app/issues/5118
import { useStore, storesContext } from '@/store/utils'

// inject 虽然用起来没什么问题 很方便 但是对ts支持不友好
const Example1 = inject('testState')(
  observer((props) => { // 这个props是any类型
    const { testState } = props
    const store = useLocalStore(() => {
      return {
        num: 1,
        // get 直接就是计算属性
        get totalPrice() {
          console.log('totalPrice 依赖缓存')
          return this.num * 100
        },
        addNum: action(() => {
          store.num += 1
        }),
        asyncAddNum: flow(function *() {
          const data = yield Promise.resolve(213)
          store.num = data
        })
      }
    })
    return (
      <>
        <h2>Example1</h2>
        <p>数量：{store.num}</p>
        <p>总价{store.totalPrice}</p>
        <button onClick={store.addNum}>addNum</button>
        <button onClick={store.asyncAddNum}>asyncAddNum</button>
        <hr/>
        <p>{testState.num}</p>
        <button onClick={testState.add}>add</button>
        <button onClick={testState.asyncAdd}>asyncAdd</button>
      </>
    )
  })
)
var a = ''
// 函数组件中 使用 全局store 支持ts类型
const Example2: React.FC<{num: number}> = ({ num }) => {
  const { test1Store } = useStore()
  // actorun 返回的清理函数正好作用于useEffect的返回函数 将在‘componentWillUnmount’清理 很完美
  // useEffect的依赖项应该始终未空 因为你只依赖mobx对象
  // 这个auto就相当于 vue 中的 watch
  // 针对于 副作用中依赖于props的值可以使用useAsObservableSource转化为mobx对象
  const source = useAsObservableSource({ num })
  useEffect(() => autorun(() => {
    console.log('autorun')
    document.title = String(test1Store.num * source.num)
  }), [])
  return useObserver(() => (
    <>
      <h2>Example2</h2>
      <p>{test1Store.num}</p>
      <button onClick={test1Store.addNum}>addNum</button>
      <button onClick={test1Store.asyncAddNum}>asyncAddNum</button>
    </>
  ))
}

// 类组件中 如何使用全局store 支持ts类型
class Example3 extends React.PureComponent {
  render() {
    return (
      <>
        <h2>Example3</h2>
        <storesContext.Consumer>
          {
            ({ test2Store }) => {
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

export default () => {
  const [num, setNum] = useState(0)
  return (
    <>
      <Example1 />
      {/* <Example2 source={useAsObservableSource({num})} /> */}
      <Example2 num={num} />
      <Example3 />
      <div style={{background: 'red'}}>
        <button onClick={() => setNum(num + 1)}>setNum</button>
      </div>
    </>
  )
}
