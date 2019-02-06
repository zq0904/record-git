export const myPlugin = store => {
  // 当 store 初始化时调用
  store.subscribe((mutation, state) => {
    // console.log(mutation, state)
  })
}
