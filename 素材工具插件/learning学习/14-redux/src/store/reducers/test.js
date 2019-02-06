const ds = {
  num: 1,
  price: 100
}
export default (state = ds, {type, payload}) => {
  switch(type) {
    case 'add':
      return { ...state, num: state.num + 1 }
    default:
      return state
  }
}