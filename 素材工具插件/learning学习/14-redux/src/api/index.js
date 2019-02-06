const goods = [
  { id: '1', title: 'iphone XR', price: 4999, inventory: 2 },
  { id: '2', title: 'iphone X', price: 6300, inventory: 3 },
  { id: '3', title: 'iphone X Max', price: 9800, inventory: 4 }
]
// 获取所有商品
export const getAllGoods = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      flag: 1,
      data: goods
    })
  }, 500)
})
// 结算操作
export const settlement = (successCallBack, errorCallBack) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      successCallBack()
    } else {
      errorCallBack()
    }
  }, 500)
}
