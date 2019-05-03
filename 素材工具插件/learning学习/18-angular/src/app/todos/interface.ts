export interface TodoItem {
  id: number,
  text: string,
  isComplete: boolean
}
export type Add = (text: string) => void
export type Del = (id: number) => void
export type UpdateComplete = (id: number) => void
