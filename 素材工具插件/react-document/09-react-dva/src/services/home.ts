import { HomeList } from '../types'

interface GetListInfo {
  (): Promise<{ list: HomeList; totalCount: number; }>;
}
export const getListInfo: GetListInfo = () => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      list: [{
        text: '测试异步新增',
        id: 91,
        complete: false,
      }],
      totalCount: 50
    })
  }, 1000)
})
