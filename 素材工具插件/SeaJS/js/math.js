define({
  add(...args) {
    return args.reduce((b, a) => b + a, 0)
  }
})