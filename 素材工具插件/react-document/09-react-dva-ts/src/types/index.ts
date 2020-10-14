import { GlobalNamespace, GlobalState } from './global'
import { HomeNamespace, HomeState } from './home'
import { FooNamespace, FooState } from './foo'
export * from './global'
export * from './home'
export * from './foo'

export type State = {
  [GlobalNamespace]: GlobalState;
  [HomeNamespace]: HomeState;
  [FooNamespace]: FooState;
}
