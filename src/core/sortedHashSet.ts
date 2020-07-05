import { HashSet } from './hashSet'
import { SortedSetInterface } from '../types/sortedSetInterface'
import { Hashable, ORDER } from '../types/types'

/**
 * SortedHashSet<T>
 *
 * Hash Set with order
 * @see HashSet<T>
 */
export class SortedHashSet<T extends Hashable<S>, S extends number | string> extends HashSet<T, S>
  implements SortedSetInterface<T> {
  /**
   * sort
   */
  protected sort: ORDER

  /**
   * setSort
   *
   * @param sort
   */
  public setSort(sort: ORDER): void {
    this.sort = sort
    this.sortSet()
  }

  /**
   * reverseOrder
   */
  public reverseOrder(): void {
    this.sort = this.sort === ORDER.DESC ? ORDER.ASC : ORDER.DESC
    this.sortSet()
  }

  /**
   * afterAction hook
   *
   * Sort using declared order/comparator
   *
   * @param fName
   * @param elements
   */
  protected afterAction(fName: string, elements: T | T[]): void {
    this.sortSet()
  }

  /**
   * sortSet
   */
  protected sortSet(): void {
    /* first super() call upon class construction */
    if (typeof this.sort === 'undefined') return

    const comparator =
      this.sort === ORDER.ASC
        ? (ob1: T, ob2: T) => this._comparator(ob1, ob2)
        : (ob1: T, ob2: T) => -1 * this._comparator(ob1, ob2)

    this.replaceAndPreventHook(this.elements.sort(comparator))
  }

  /**
   * constructor
   *
   * @param sort
   * @param elements
   */
  constructor(sort: ORDER, ...elements: T[]) {
    super(...elements)
    this.sort = sort
    this.sortSet()
  }
}
