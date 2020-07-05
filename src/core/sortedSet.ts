import { AbstractSuperSet } from './abstractSuperSet'
import { Comparator, ORDER } from '../types/types'

/**
 * SortedSetInterface<T>
 *
 * Ordered set (order by comparator result ASC/DESC)
 */
export class SortedSet<T> extends AbstractSuperSet<T> implements SortedSet<T> {
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
   * Sort Set using declared order/comparator
   *
   * @param fName
   * @param elements
   */
  protected afterAction(fName: string, elements: T | T[]): void {
    this.sortSet()
  }

  /**
   * beforeAction hook
   *
   * @param fName
   * @param elements
   */
  protected beforeAction(fName: string, elements: T | T[]): void {}

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
   * @param comparator
   * @param sort
   * @param elements
   */
  constructor(comparator: Comparator<T>, sort: ORDER, ...elements: T[]) {
    super(comparator, ...elements)
    this.sort = sort
    this.sortSet()
  }
}
