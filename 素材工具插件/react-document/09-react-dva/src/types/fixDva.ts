import type {
  Model as SourceModel,
  EffectsCommandMap as SourceEffectsCommandMap,
  EffectType,
} from 'dva'
import {
  call,
  PutEffect,
  select,
  all,
  take,
  cancel,
} from 'redux-saga/effects'
import { Action } from './index'

interface EffectsCommandMap extends SourceEffectsCommandMap {
  put: { <A extends Action>(action: A): PutEffect<A>; };
  call: typeof call;
  select: typeof select;
  all: typeof all;
  take: typeof take;
  cancel: typeof cancel;
  [key: string]: any;
}

type Effect = (action: Action, effects: EffectsCommandMap) => void

type EffectWithType = [Effect, { type : EffectType }];

// @ts-expect-error
export interface Model<S = any, A = Action> extends SourceModel {
  state?: S;
  reducers?: {
    [key: string]: (state: S, action: A) => S;
  };
  effects?: {
    [key: string]: Effect | EffectWithType;
  };
}
