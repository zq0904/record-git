const Mock = require('mockjs')

const data = Mock.mock({
  'string1|1-3': 's', // 'name|min-max': string // 通过重复 string 生成一个字符串 重复次数大于等于 min 小于等于 max
  'string2|2': 's', // 'name|count': string // 通过重复 string 生成一个字符串 重复次数等于 count

  'arr|2': [{ 'id|+1': 1 }], // 'name|+1': number // 属性值自动加 1 初始值为 number
  'num1|1-3': 1, // 'name|min-max': number // 生成一个大于等于 min、小于等于 max 的整数 属性值 number 只是用来确定类型
  'num2|1-3.1-2': 1, // 'name|min-max.dmin-dmax': number // 生成一个浮点数 整数部分大于等于 min、小于等于 max 小数部分保留 dmin 到 dmax 位

  'boolean1|1': true, // 'name|1': boolean // 随机生成一个布尔值 值为 true 的概率是 1/2 值为 false 的概率同样是 1/2
  'boolean2|1-2': true, // 'name|min-max': boolean 随机生成一个布尔值 值为 boolean 的概率是 min / (min + max) 值为 !boolean 的概率是 max / (min + max)

  'object1|2': {a: 1, b: 2, c: 3}, // 'name|count': object 从属性值 object 中随机选取 count 个属性
  'object2|1-2': {a: 1, b: 2, c: 3}, // 'name|min-max': object 从属性值 object 中随机选取 min 到 max 个属性

  'arr1|1': [1, 2], // 'name|1': array 从属性值 array 中随机选取 1 个元素 作为最终值
  'arr2|+1': [1, 2], // 'name|+1': array 从属性值 array 中顺序选取 1 个元素 作为最终值
  'arr3|1-3': [1], // 'name|min-max': array 通过重复属性值 array 生成一个新数组 重复次数大于等于 min 小于等于 max
  'arr4|2': [1], // 'name|count': array 通过重复属性值 array 生成一个新数组 重复次数为 count

  'fun': (args) => { // 'name': function 执行函数 function 取其返回值作为最终的属性值 函数的上下文为属性 'name' 所在的对象
    console.log(args)
    return 123
  },

  'regexp': /\d{2,3}/, // 'name': regexp 根据正则表达式 regexp 反向生成可以匹配它的字符串 用于生成自定义格式的字符串

  'placeholder': { // 用 @ 来标识其后的字符串是 占位符 占位符 会优先引用 数据模板 中的属性
    'first': '@FIRST',
    'middle': '@FIRST',
    'last': '@LAST',
    'full': '@first @middle @last'
  }
})

console.log(JSON.stringify(data, null, 2)) // 2个缩进

// 数据模板定义规范 每个属性由 3 部分构成：属性名、生成规则、属性值  'name|rule': value
// rule 有 7种格式  rule的含义 需要依赖 value的类型 才能确定
// 'name|min-max': value
// 'name|count': value
// 'name|min-max.dmin-dmax': value
// 'name|min-max.dcount': value
// 'name|count.dmin-dmax': value
// 'name|count.dcount': value
// 'name|+step': value

// 示例 http://mockjs.com/examples.html
