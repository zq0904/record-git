// npm install @types/react @types/react-dom -S // 该@types/前缀意味着我们还想获取React和React-DOM的声明文件
// npm install typescript awesome-typescript-loader source-map-loader -D // 配置webpack
// npx tsc --init // 生成tsconfig.json 配置 "jsx": "react"等
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