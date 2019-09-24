## 目前框架对数据双向绑定的实现
```
  backbone.js // 订阅发布模式
  angular.js // 脏值检查 （只在一些可能发生数据改变的时候去轮询检测 如xhr 事件触发等）
  vue.js // 数据劫持 结合 订阅发布模式
```
## vue
```
  vm -> v // 通过Object.defineProperty对数据劫持 通过dep通知队列依次更新 来达到视图更新
  v -> vm // 监听dom事件 如onchenge 去修改vm
```
## todo
```
  1.Vue 中 watch对象 的直接实现
  2.解析文本节点 含运算符 逻辑抽取 等
  3.v-model指令的完善 checked等的实现
```