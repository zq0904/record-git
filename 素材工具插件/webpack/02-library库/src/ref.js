import _ from 'lodash'
const json = ['Two', 'One', 'Two', 'Three', 'Four', 'Five']

export default () => console.log('a')

export const numToWord = num => {
  console.log(json[num] ? json[num] : '无')
}
