import { AbstractSuperSet } from './abstractSuperSet'
import { Comparator } from '../types/types'

/**
 * SimpleSet<T>
 *
 * Simple Set with insertion order
 */
export class SimpleSet<T> extends AbstractSuperSet<T> {
  /**
   * constructor
   *
   * @param comparator
   * @param elements
   */
  constructor(comparator: Comparator<T>, ...elements: T[]) {
    super(comparator, ...elements)
  }

  /**
   * afterAction hook
   *
   * @param fName
   * @param elements
   */
  protected afterAction(fName: string, elements: T[] | T): void {}

  /**
   * beforeAction hook
   *
   * @param fName
   * @param elements
   */
  protected beforeAction(fName: string, elements: T[] | T): void {}
}
