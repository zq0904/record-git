import { HomeList } from '../types'

interface GetListInfo {
  (): Promise<{ list: HomeList; totalCount: number; }>;
}
export const getListInfo: GetListInfo = () => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      list: [{
        text: '测试1',
        id: 91,
        complete: false,
      }, {
        text: '测试2',
        id: 92,
        complete: true,
      }, {
        text: '测试3',
        id: 93,
        complete: true,
      }],
      totalCount: 50
    })
  }, 1000)
})
