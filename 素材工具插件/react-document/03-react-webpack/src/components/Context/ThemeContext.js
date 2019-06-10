import { createContext } from 'react'

export const t = {
  light: {
    background: '#eeeeee',
  },
  dark: {
    background: '#222222',
  }
}

export const ThemeContext = createContext(t.dark) // 指定默认值 仅当组件在树中没有匹配的Provider 时才使用该defaultValue参数

export const t2 = {
  background: 'red',
  toggle: () => {}
}

export const ThemeContext2 = createContext(t2)
