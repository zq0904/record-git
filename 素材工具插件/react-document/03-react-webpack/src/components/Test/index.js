import React from 'react';
import style from './index.scss' // 使用css模块化

export default class Test extends React.Component {
  render() {
    return (
      <div>
        <h1>测试文件</h1>
        <i className="iconfont icon-zanting"></i>
        <h3>绝对路径 以public为根路径</h3>
        <img src="/img/1.jpg" width="300" />
        <audio src="/media/music.mp3" controls loop></audio>
        <h3>require相对路径</h3>
        <img src={require('../../assets/img/tp.jpg')} width="300" />
        <audio src={require('../../assets/media/mv.mp3')} controls loop></audio>
        <h3>背景图片</h3>
        <div className={style['test-img']}></div>
      </div>
    );
  }
}
