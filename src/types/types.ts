import { Observable } from './observable'

/**
 * ComparatorResult
 */
export type ComparatorResult = (number & 1) | 0 | -1

/**
 * ORDER
 */
export enum ORDER {
  ASC,
  DESC
}

/**
 * Comparator
 */
export type Comparator<T> = (obj1: T, obj2: T) => ComparatorResult

/**
 * Hashable - objects with hashCode()
 */
export interface Hashable<T extends number | string> {
  hashCode(): T
}

/**
 * HashableObservable
 */
export interface HashableObservable<T extends number | string> extends Observable {
  hashCode(): T
}

/**
 * HashableReturn<T>
 *
 * potential type of Hashable<T>.hashCode() result
 */
export type HashableReturn<T> = T extends Hashable<infer U> ? U : never

/**
 * HashableReturnStr
 */
export type HashableReturnStr = HashableReturn<Hashable<string>>

/**
 * HashableReturnNum
 */
export type HashableReturnNum = HashableReturn<Hashable<number>>

/**
 *
 * DeepReadonly
 *
 * thanks to Minko Gechev (code snippet from @mgechev twitter)
 */
export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
  ? T
  : T extends object
  ? DeepReadonlyObject<T>
  : T

/**
 * DeepReadonlyArray
 *
 * thanks to Minko Gechev (code snippet from @mgechev twitter)
 */
export interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

/**
 * DeepReadonlyObject
 *
 * thanks to Minko Gechev (code snippet from @mgechev twitter)
 */
export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}
