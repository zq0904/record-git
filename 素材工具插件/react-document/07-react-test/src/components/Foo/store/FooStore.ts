import BaseStore from './base'
import { observable, action } from 'mobx'

type List = { name: string; id: number }[]

// mock request
const getInfo = ():Promise<{ flag: 1; data: { list: List } }> => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      flag: 1,
      data: {
        list: [
          { name: 'zq', id: 1 },
          { name: 'zq2', id: 2 },
        ]
      }
    })
  }, 1000)
})

class FooStore extends BaseStore<FooStore> {
  @observable
  loading = true
  @observable
  bar = ''
  @observable
  list: List = []
  @action.bound
  getInfo = async () => {
    try {
      this.setStore({ loading: true })
      console.log('getInfo')
      const { flag, data } = await getInfo()
      if (flag !== 1) return
      this.setStore({
        list: data.list
      })
    } catch (err) {
      console.error(err)
    } finally {
      this.setStore({ loading: false })
    }
  }
}

export default FooStore
