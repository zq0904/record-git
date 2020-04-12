import { createContext, useContext } from 'react'
import FooStore from './FooStore'

class RootStore {
  fooStore: FooStore
  constructor() {
    this.fooStore = new FooStore(this)
  }
}

export default RootStore

// 直接使用默认值 store
export const StoreContext = createContext(new RootStore())

export const useStore = () => useContext(StoreContext)
