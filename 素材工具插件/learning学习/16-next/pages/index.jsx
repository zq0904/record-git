import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'

export default () => (
  <div>
    {/*
      1.Link组件必须有一个子元素 标签类型任意
      2.设置样式 不能给Link组件设置 他是一个HOC(高阶组件) 可以给他的子元素设置
      3.直接访问某个页面 会请求页面 而通过路由跳转页面 只会请求js代码
    */}
    <Link href="/Bar"><a style={{color: 'red'}}>Bar</a></Link>
    <Button onClick={() => Router.push({pathname: '/Bar', query: {id: 1}})}>Bar</Button>
    <Link href="/Foo"><span>Foo</span></Link>
    <Link href="/Movie?type=onlineTheater"><a>Movie</a></Link>
    <br/>
    <a href="https://github.com/segmentio/create-next-app">社区提供一个 create-next-app 的脚手架</a> 
  </div>
)