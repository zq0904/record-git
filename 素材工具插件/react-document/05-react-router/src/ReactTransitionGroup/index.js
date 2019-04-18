import React from 'react';
import classnames from 'classnames'
import { Transition } from 'react-transition-group'
import './index.less'


// 效果是每次点击按钮都会进行一次进场和出场的动画。也可以自行衍生。
export default class index extends React.Component {
  state = {
    boolean: true,
    timeout: 1000
  }
  render() {
    const {
      state: {
        boolean,
        timeout
      }
    } = this
    return (
      <div>
        <h2>ReactTransitionGroup</h2>
        {/*
          true  state entered
          false state exited
          in 由 false 切换为 true
          状态流转 exited entering entered
          in 由 true  切换为 false
          状态流转 entered exiting exited

          mountOnEnter  如果设置为false 无论in是true还是false Transition和其子组件都是立即加载安装的 如果想实现“懒加载” 只有当in第一次为true时在加载
          unmountOnExit 如果设置为true state状态为 exited时 会卸载组件
          appear 设置为true    in 初始的值为true  首次加载会 直接执行一次 exited entering entered
          enter false 如 in由 false 切换为 true 时 状态会由 exited 直接变更为 entered 没有entering进入持续状态
          exit false 禁用exiting退出持续状态
        */}
        <button onClick={() => this.setState(prevState => ({boolean: !prevState.boolean}))}>click</button>
        <Transition
          in={boolean}
          timeout={timeout}
          exit={false}
        >
          {
            state => {
              console.log(state)
              return <div className={`react react-${state}`}>123</div>
            }
          }
        </Transition>
      </div>
    );
  }
}