// 用户搜索
function UserInput({ search, isInventory, update }) {
  return (
    <div>
      <input type="text"
        value={search}
        onChange={e => update({
          search: e.target.value
        })}/>搜索商品的名字
      <p>
        <input type="checkbox"
          checked={isInventory}
          onChange={e => update({
            isInventory: e.target.checked
          })}/>只展示库存产品
      </p>
    </div>
  )
}
function GoodsInfo({goods}) {
  return (
    <table>
      <thead>
        <tr>
          <th>商品名称</th>
          <th>商品价格</th>
        </tr>
      </thead>
      <tbody>
      {
        goods.map(({name, price}) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{price}</td>
          </tr>
        ))
      }
      </tbody>
    </table>
  )
}

class Screening extends React.Component {
  state = {
    goods: [], // 商品数据
    search: '', // 搜索条件
    isInventory: false, // 是否根据库存筛选
  }
  componentWillMount() {
    this.timeId = setTimeout(() => {
      this.setState({
        goods: [
          { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
          { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
          { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
          { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
          { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
          { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
        ]
      });
    }, 400)
  }
  componentWillUnmount() {
    clearTimeout(this.timeId)
  }
  update = payload => this.setState(payload)
  // 根据条件 过滤数据 得到应该展示的数据
  filterGoods() {
    return this.state.goods.filter(v => {
      const isIncludes = new RegExp(this.state.search, 'ig').test(v.name)
      if (!isIncludes) return false
      if (!this.state.isInventory) return true
      return v.stocked === true
    })
  }
  render() {
    const { state } = this
    return (
      <div>
        <UserInput update={this.update} {...state} />
        <GoodsInfo goods={this.filterGoods()} />
      </div>
    );
  }
}

ReactDOM.render(<Screening />, document.getElementById('vm'))