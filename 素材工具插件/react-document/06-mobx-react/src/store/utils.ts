import { createContext, useContext } from 'react'
import RootStore from './index'

// 直接使用默认值
export const storesContext = createContext(new RootStore())
export const useStore = () => useContext(storesContext)
