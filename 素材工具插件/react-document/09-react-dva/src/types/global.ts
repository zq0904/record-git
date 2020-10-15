export const GlobalNamespace = 'Global'

// 用户 男 女
export enum UserGender {
  male = 1,
  female = 0,
}

// 用户 级别
export enum UserLevel {
  zero = '0',
  one = '1',
  two = '2',
}

// 用户信息
export type UserInfo = {
  userId: string;
  name: string;
  gender: UserGender;
  level: UserLevel;
  createDate: number;
}

export type GlobalState = {
  userInfo: UserInfo;
}
