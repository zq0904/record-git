import React, { Component } from 'react'
import Test from '../layouts/Test'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

export default class Bar extends Component {
  // 发请求的钩子 是静态方法
  // getInitialProps 初次访问(刷新页面)会在服务端执行 通过Link组件跳转等会在客户端执行 只能在pages页面级组件中调用
  static async getInitialProps() {
    const data = await fetch('http://127.0.0.1:3301/onlineTheater').then(res => res.json())
    return { data }
  }
  render() {
    return (
      <Test>
        {/* 
          next中 除了 导入样式文件 和 内联对象写法 还提供了一种 styled-jsx语法
          jsx属性标识作用域 只会影响当前组件不会影响子组件 默认是global属性 会影响子组件样式
        */}
        <style jsx>{`
          ul {
            list-style: none;
          }
        `}</style>
        <div>Bar组件</div>
        <ul>
          {
            this.props.data.map(v => (
              <li key={v.id}>
                {/*
                  1.浅层路由 as 就好比给路由起别名 使用的结果为: 路径是as 但其本质是href
                  2.解决浅层路由 刷新问题 需服务端支持
                */}
                <Link
                  as={`/Bar/${v.id}`}
                  href={`/Bar/details?id=${v.id}`}
                >
                  <a>{v.title}</a>
                </Link>
              </li>
            ))
          }
        </ul>
        {/* 静态文件的引用 使用绝对路径 */}
        <img src="/static/1.jpg" width="200"/>
      </Test>
    )
  }
}