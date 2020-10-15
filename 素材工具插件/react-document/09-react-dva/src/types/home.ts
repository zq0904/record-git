export const HomeNamespace = 'Home'

export type HomeList = {
  text: string;
  id: number;
  complete: boolean;
}[]

export type HomeState = {
  list: HomeList;
  totalCount: number;
}
