import { action } from 'mobx'
import RootStore from './index'

// 获取一个对象的函数名的联合类型
type PickFunctionName<T> = { [P in keyof T]: T[P] extends Function ? P : never; }[keyof T];

abstract class BaseStore<SuccessorInstance> {
  constructor (protected rootStore: RootStore) {} // 多个store通信
  @action.bound // 如果 setStore 使用变量 与 装饰器语法冲突 编译运行时报错
  setStore (payload: Partial<Omit<SuccessorInstance, PickFunctionName<SuccessorInstance>>>) {
    Object.assign(this, payload)
  }
}

export default BaseStore
