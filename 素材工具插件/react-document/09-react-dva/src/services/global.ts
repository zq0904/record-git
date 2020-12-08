import { UserInfo, UserGender, UserLevel } from '../types'

interface GetUserInfo {
  (id: string): Promise<{ userInfo: UserInfo; }>;
}
export const getUserInfo: GetUserInfo = () => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      userInfo: {
        userId: '123',
        name: 'zq',
        gender: UserGender.male,
        level: UserLevel.two,
        createDate: Date.now(),
      }
    })
  }, 1000)
})
