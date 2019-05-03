import React, { Component, useState } from 'react';
import classnames from 'classnames'
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group'
import './index.less'

// Transition组件 效果是每次点击按钮都会进行一次进场和出场的动画。也可以自行衍生。
class Transition01 extends Component {
  state = {
    boolean: false,
    timeout: 1000
  }
  handleClick = () => this.setState(prevState => ({boolean: !prevState.boolean}))
  onEnter = (dom, isAppearing) => {
    // console.log(dom, isAppearing)
    // in由fale -> true
    // exited
    // <div class=​"react react-entering">​123​</div>​ false
    // entering
    // entered
  }
  onEntering = (dom, isAppearing) => {
    // console.log(dom, isAppearing)
    // in由fale -> true
    // exited
    // entering
    // <div class=​"react react-entering">​123​</div>​ false
    // entered
  }
  onEntered = (dom, isAppearing) => {
    // console.log(dom, isAppearing)
    // in由fale -> true
    // exited
    // entering
    // entered
    // <div class=​"react react-entered">​123​</div>​ false
  }
  render() {
    const {
      state: {
        boolean,
        timeout
      }
    } = this
    return (
      <div style={{border: '1px solid red'}}>
        <h2>ReactTransitionGroup</h2>
        {/*
          in值         对应   state状态值
          true                entered
          false               exited
          false -> true       exited entering entered
          true -> false       entered exiting exited

          mountOnEnter  如果设置为false 无论in是true还是false Transition和其子组件都是立即加载安装的 如果想实现“懒加载” 只有当in第一次为true时在加载
          unmountOnExit 如果设置为true state状态为 exited时 会卸载组件
          appear 设置为true    in 初始的值为true  首次加载会 直接执行一次 exited entering entered
          enter false 如 in由 false 切换为 true 时 状态会由 exited 直接变更为 entered 没有entering进入持续状态
          exit false 禁用exiting退出持续状态
          6个回调 onExit onExiting onExited
        */}
        <button onClick={this.handleClick}>click</button>
        <Transition
          in={boolean}
          timeout={timeout}
          onEnter={this.onEnter}
          onEntering={this.onEntering}
          onEntered={this.onEntered}
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

// CSSTransition组件
function CSSTransition02() {
  const [inProp, setInProp] = useState(false)
  return (
    // *-enter
    // 这之间会强制回流
    // *-enter-active
    // *-enter-done
    // *-exit
    // 这之间会强制回流
    // *-exit-active
    // *-exit-done
    /*
      classNames 也可单独指定 主要用于自身的过渡
      classNames={{
        appear: 'my-appear',
        appearActive: 'my-active-appear',
        appearDone: 'my-done-appear',
        enter: 'my-enter',
        enterActive: 'my-active-enter',
        enterDone: 'my-done-enter',
        exit: 'my-exit',
        exitActive: 'my-active-exit',
        exitDone: 'my-done-exit',
      }}
      6个回调 onExit onExiting onExited 主要用于影响其他组件的状态
    */
    <div style={{border: '1px solid blue'}}>
      <CSSTransition
        in={inProp}
        timeout={1000}
        classNames="my"
      >
        <div className="default">123</div>
      </CSSTransition>
      <button type="button" onClick={() => setInProp(!inProp)}>toggle</button>
    </div>
  )
}

// TransitionGroup组件
function TransitionGroup03() {
  const [list, setList] = useState([
    { id: 1, text: '文本1' },
    { id: 2, text: '文本2' },
    { id: 3, text: '文本3' },
  ])
  const add = () => {
    setList(prevList => {
      const id = (list[list.length - 1] ? list[list.length - 1].id : 0) + 1
      return [
        ...prevList,
        {
          id,
          text: `文本${id}`
        }
      ]
    })
  }
  return (
    <div style={{border: '1px solid yellow'}}>
    {/*
      component默认渲染div
    */}
      <TransitionGroup
        className="todo-list"
        component={'ul'}
      >
        {
          list.map(({id, text}) => (
            <CSSTransition
              key={id}
              timeout={500}
              className="fate"
            >
              <li>
                <button type="button" onClick={() => setList(prevList => prevList.filter(v => v.id !== id))}>x</button>{text}
              </li>
            </CSSTransition>
          ))
        }
      </TransitionGroup>
      <button type="button" onClick={add}>添加项</button>
    </div>
  )
}


export default class index extends React.Component {
  render() {
    return (
      <div>
        <Transition01 />
        <CSSTransition02 />
        <TransitionGroup03 />
      </div>
    );
  }
}