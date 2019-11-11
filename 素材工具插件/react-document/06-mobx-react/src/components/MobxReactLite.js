import React, { useState } from 'react'
import { observer, useLocalStore, useObserver } from 'mobx-react-lite'
import { action } from 'mobx'

// mobx-react-lite 是用来解决什么问题的 => 如果使用常规的mobx-react 对于hooks不是很友好 函数组件通过observer包装不能使用hooks

const Example = observer(() => {
  const [num, setNum] = useState(1)
  const store = useLocalStore(() => ({
    num: 1,
    add: action(() => {
      store.num++
    })
  }))
  return (
    <div>
      <p>{num}</p>
      <button onClick={() => setNum(num + 1)}>add</button>
      <p>{store.num}</p>
      <button onClick={store.add}>add</button>
    </div>
  )
})

const MobxReactLite = () => (
  <div>
    <Example initialTodos={['1', '2']} />
  </div>
)

export default MobxReactLite
