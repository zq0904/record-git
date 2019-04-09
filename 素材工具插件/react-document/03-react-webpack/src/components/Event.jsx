import React from 'react'

export default class Event extends React.Component {
  state = {
    Event: null,
    eventType: null
  }
  handleClick = (e) => {
    // e 为包装的 事件参数对象 e.nativeEvent为原生事件参数对象
    // 出于性能原因 无法以异步方式访问参数对象
    console.log(e.type)
    setTimeout(() => console.log(e.type), 0)
    // this.setState({ Event: e })
  }
  render() {
    return (
      <div>
        <h4>Event</h4>
        <button onClick={this.handleClick}>click</button>
        {/* onClick        如果是冒泡阶段 输出顺序为 c f */}
        {/* onClickCapture 如果是捕获阶段 输出顺序为 f c */}
        <div
          style={{width: 300, height: 300, backgroundColor: 'red', overflow: 'hidden'}}
          onClickCapture={() => console.log('f')}
        >
          <div
            style={{marginTop: 75, marginLeft: 75, width: 150, height: 150, backgroundColor: 'blue'}}
            onClick={() => console.log('c')}
          >
          </div>
        </div>
        <label>根据e获取 ( 按键的key )：<input type="text" onKeyDown={e => console.log(e.keyCode)}/></label>
      </div>
    )
  }
}
