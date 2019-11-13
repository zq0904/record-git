import { configure } from 'mobx'
import Test1Store from './stores/test1-store'
import Test2Store from './stores/test2-store'

configure({ enforceActions: 'observed' })

class RootStore {
  public test1Store: Test1Store
  public test2Store: Test2Store
  constructor() {
    this.test1Store = new Test1Store(this)
    this.test2Store = new Test2Store(this)
  }
}

export default RootStore