// _app.jsx文件 覆盖App类 以影响全局配置
import React from 'react'
import App, { Container } from 'next/app'
// import GlobalLayout from '../layouts/Global'
import '../assets/css/reset_m.css' // 全局样式
import 'antd/dist/antd.css' // AntD全局样式

export default class MyApp extends App {

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        {/* <GlobalLayout> */}
          <Component {...pageProps} />
        {/* </GlobalLayout> */}
      </Container>
    )
  }
}