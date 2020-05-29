const defaultState = {
  num: 1,
  price: 100,
}

const test = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'add':
      return { ...state, num: state.num + 1 }
    default:
      return state
  }
}

export default test
