## js 设计模式

## 构造器模式 - 组合继承

```ts
function A(name) {
  this.name = name
}
A.prototype.getName = function () {
  console.log(this.name)
}
function B(name, age) {
  this.age = age
  A.call(this, name) // 构造继承
}
B.prototype = new A() // 原型继承
B.prototype.getAge = function () {
  console.log(this.age)
}
const b = new B('b', 23)
```

## 模块化模式 - IIFE（立即调用函数表达式）闭包用来模拟私有成员

```ts
;(function (modules) {
  // 闭包 cache
  var installedModules = {}
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) return installedModules[moduleId].exports
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    })
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    )
    module.l = true
    return module.exports
  }
  return __webpack_require__((__webpack_require__.s = './src/index.js'))
})({
  './src/index.js': function (module, exports, __webpack_require__) {
    eval('')
  },
})
```

## 惰性单例模式

```ts
class DbClient {
  linkP = null

  constructor(public options) {}

  private async getLinkP() {
    if (!this.linkP) this.linkP = linkDb(this.options)
    return this.linkP
  }

  async set(name: string) {
    await this.getLinkP()
    // operation
  }
}

const dbC = new DbClient({})

// 操作数据库 必须建立链接 仍会复用同一个实例
dbC.set('a1')
dbC.set('a2')
```

```ts
;(function (modules) {
  var installedModules = {}
  // undefined 0 [] null
  var installChunks = {}
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) return installedModules[moduleId].exports
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    })
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    )
    module.l = true
    return module.exports
  }
  __webpack_require__.e = function requireEnsure(chunkId) {
    var promises = []
    var installedChunkData = installChunks[chunkId]
    // 加载完成
    if (installedChunkData !== 0) return Promise.all(promises)
    if (installedChunkData) {
      // 加载中
      promises.push(installedChunkData[2])
    } else {
      // 未加载
      var promise = new Promise((resolve, reject) => {
        installedChunkData = installChunks[chunkId] = [resolve, reject]
      })
      promises.push((installedChunkData[2] = promise))
      var error = new Error()
      function complete(event) {
        script.onerror = script.onload = null
        clearTimeout(timeId)
        var chunk = installChunks[chunkId] // 如果加载成功这里是0
        if (chunk !== 0) {
          error.type = event && (event.type === 'load' ? 'missing' : event.type)
          chunk[1](error)
          installChunks[chunkId] = undefined
        }
      }
      var timeId = setTimeout(function () {
        complete({ type: 'timeout' })
      }, 120000)
      var script = document.createElement('script')
      script.onerror = script.onload = complete
      script.src = moduleId
      document.body.appendChild(script)
    }
    return Promise.all(promises)
  }
  return __webpack_require__((__webpack_require__.s = './src/index.js'))
})({
  './src/index.js': function (module, exports, __webpack_require__) {
    // import('./a.js').then(res => console.log('res a', res))
    eval(`
      Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! ./a.js */ \"./src/a.js\")).then(function (res) {
        console.log('res a', res);
      });
    `)
  },
})
```

## 观察者模式

```ts

```
