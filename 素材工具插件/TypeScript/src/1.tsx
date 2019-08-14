// 原声元素
declare namespace JSX {
  interface IntrinsicElements {
    div: {
      foo: string
    }
  }
}
// 自定义元素
declare namespace JSX {
  interface ElementAttributesProperty {
    props: any // 指定用来使用的属性名
  }
}
