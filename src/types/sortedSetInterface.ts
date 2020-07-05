import { ORDER } from './types'

/**
 * SortedSet
 */
export interface SortedSetInterface<T> {
  /**
   * setSort
   *
   * @param sort
   */
  setSort(sort: ORDER): void

  /**
   * reverseOrder
   */
  reverseOrder(): void
}
