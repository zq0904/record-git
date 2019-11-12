// npm i @types/react @types/react-dom -S // 该@types/前缀意味着我们还想获取React和React-DOM的声明文件
// npm i typescript awesome-typescript-loader source-map-loader -D // 配置webpack
// npx tsc --init // 生成tsconfig.json 配置 "jsx": "react"等

// 上述 方法 是通过loader对ts提供支持 而现在的主流方法是 通过babel-loader直接对ts提供支持 参考包zero-core 或 06-mobx-react 
import React from 'react'

export interface HelloProps { a: string; b: string; }

function Hello(props: HelloProps) {
  const { a = 'a', b = 'b' } = props
  return (
    <div>
      <h2>a：{a}</h2>
      <h2>b：{b}</h2>
    </div>
  )
}

export default () => <Hello a={'1'} b={'bbb'} />