const { Component } = React
function UserInput({text, textChange, isStocke, stockeChange}) {
  console.log(isStocke)
  return (
    <div>
      <input type="text" value={text} onChange={e => textChange(e.target.value)}/>
      <p><input type="checkbox" checked={isStocke} onChange={e => stockeChange(e.target.checked)}/>只展示库存产品</p>
    </div>
  )
}
function SearchResult() {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', width: '400px', margin: 0}}>
      <h3 style={{display: 'flex', justifyContent: 'space-around', width: '100%', margin: 0}}><strong>名字</strong><strong>价格</strong></h3>
      <p style={{textAlign: 'center', width: '100%', margin: 0}}>体育用品</p>
      <p style={{display: 'flex', justifyContent: 'space-around', width: '100%', margin: 0}}><strong>足球</strong><strong>$50</strong></p>
    </div>
  )
}
class Box extends Component {
  state = {
    data: [{ category: '', price: '', stocked: '', name: '' }],
    text: '',
    isStocke: false
  }
  componentWillMount() {
    this.timeId = setTimeout(() => {
      this.setState({
        data: [
          {category: '体育用品', price: '$50', stocked: true, name: '足球1'},
          {category: '体育用品', price: '$20', stocked: true, name: '足球2'},
          {category: '体育用品', price: '$30', stocked: false, name: '足球3'},
          {category: '手机用品', price: '$300', stocked: true, name: 'iPhone5'},
          {category: '手机用品', price: '$400', stocked: false, name: 'iPhoneX'},
          {category: '手机用品', price: '$550', stocked: true, name: 'iPhoneXS'}
        ]
      })
    }, 1000)
  }
  componentWillUnmount() { clearTimeout(this.timeId) }
  textChange = text => this.setState({ text })
  stockeChange = isStocke => this.setState({ isStocke })
  render() {
    const { state: { data, text, isStocke }, textChange, stockeChange } = this
    const filterData = data.filter(v => {
      if (isStocke && !v.stocked) return
      v.name

    })
    return (
      <div>
        <UserInput text={text} textChange={textChange} isStocke={isStocke} stockeChange={stockeChange}/>
        <SearchResult data={filterData}/>
      </div>
    )
  }
}

ReactDOM.render(<Box/>, document.getElementById('vm'))