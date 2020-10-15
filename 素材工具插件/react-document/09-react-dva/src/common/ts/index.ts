export type ReturnPromiseType<T> =
  T extends (...args: any[]) => Promise<infer U> ? U :
  T extends Promise<infer U> ? U :
  any;
