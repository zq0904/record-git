import { createContext } from 'react'

export const t = {
  light: {
    background: '#eeeeee',
  },
  dark: {
    background: '#222222',
  }
}

export const ThemeContext = createContext(t.dark)

export const t2 = {
  background: 'red',
  toggle: () => {}
}

export const ThemeContext2 = createContext(t2)
