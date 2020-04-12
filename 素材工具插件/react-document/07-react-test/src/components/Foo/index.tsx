import React, { useEffect } from 'react'
import { useStore } from './store/index'
import { observer, useObserver } from 'mobx-react'

const Bar = observer(() => {
  console.log('Bar 执行了')
  const { fooStore } = useStore()
  const handleClick = () => {
    fooStore.setStore({
      loading: true
    })
  }
  return (
    <div>
      <h4>Bar</h4>
      <button onClick={handleClick}>更新</button>
    </div>
  )
})

const Foo = () => {
  console.log('Foo 执行了')
  const { fooStore } = useStore()
  useEffect(() => {
    fooStore.getInfo()
  }, [fooStore])
  return useObserver(() => (
    <div>
      <h4>Foo</h4>
      <p>{fooStore.loading ? '1' : '2'}</p>
      <Bar />
    </div>
  ))
}

export default Foo
