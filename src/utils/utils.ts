import { ComparatorResult } from '../types/types'

/**
 * isString
 * @param value
 */
export function isString<T>(value: any): value is string {
  return typeof value === 'string' || value instanceof String
}

/**
 * isArrayOfElements
 *
 * @param value
 */
export function isArrayOfElements<T>(value: any): value is T[] {
  return value instanceof Array
}

/**
 * compareAny<T>
 *
 * For numbers it is just > < >= <=
 * For strings is ASCII-code order
 *
 * @param obj1
 * @param obj2
 */
export function compareAny<T>(obj1: T, obj2: T): ComparatorResult {
  return obj1 > obj2 ? 1 : obj1 < obj2 ? -1 : 0
}

/**
 * compareNum<T>
 *
 * @param obj1
 * @param obj2
 */
export function compareNum<T>(obj1: T, obj2: T): ComparatorResult {
  return obj1 > obj2 ? 1 : obj1 < obj2 ? -1 : 0
}

/**
 * compareStr<T>
 *
 * @param obj1
 * @param obj2
 */
export function compareStr<T>(obj1: T, obj2: T): ComparatorResult {
  if (isString(obj1) && isString(obj2)) {
    let res = obj1.localeCompare(obj2)
    return res === -1 || res === 1 ? res : 0
  } else {
    throw Error('HashSet comparator allows only string | number to be returned')
  }
}
