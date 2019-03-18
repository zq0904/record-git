function Item(props) {
  console.log(props)
  return <li>{props.val}</li>
}
class ListKey extends React.Component {
  state = {
    arr: [1, 2, 3]
  }
  render() {
    const { arr } = this.state
    return (
      <div>
        {/*
          1.在当前循环中key使用唯一字符串做标识 用作性能优化
          2.当循环一个组件时 key应该写在组件上(map方法在哪key就应该写在哪) key属性不会作为props传入
        */}
        <ul>{ arr.map(v => <Item val={ v } key={ String(v) } />) }</ul>
      </div>
    )
  }
}

ReactDOM.render(<ListKey/>, document.getElementById('vm'))