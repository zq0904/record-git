export type ReturnPromiseType<T> =
  T extends (...args: any[]) => Promise<infer U> ? U :
  T extends Promise<infer U> ? U :
  any;

/**
 * 一个简单的 localStorage 存储
 */
export class LsHelp<T extends any> {
  constructor (private name: string) {}
  set<T> (v: T) {
    try {
      localStorage.setItem(this.name, JSON.stringify({ v }))
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  get (): T | null {
    try {
      const val = localStorage.getItem(this.name)
      if (val === null) return null
      return JSON.parse(val).v
    } catch (err) {
      console.error(err)
      return null
    }
  }
}
