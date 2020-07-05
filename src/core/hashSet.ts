import { AbstractSuperSet } from './abstractSuperSet'
import { compareAny, compareNum, compareStr, isArrayOfElements } from '../utils/utils'
import { Hashable } from '../types/types'

/**
 * HashSet<T>
 *
 * Hash Set - set uses Hashable.hashCode() to differentiate/distinguish
 * elements. Also, depending on hashCode type (number or string) set
 * uses either number comparison either string comparison (String.localeCompare)
 */
export class HashSet<T extends Hashable<S>, S extends number | string> extends AbstractSuperSet<T> {
  /**
   * initialized
   */
  protected initialized: boolean = false

  /**
   * initComparator
   *
   * @param element
   */
  protected initComparator(element: T): void {
    if (HashSet.isHashableStrType(element.hashCode())) {
      this._comparator = (o1: T, o2: T) => compareStr(o1.hashCode(), o2.hashCode())
    } else if (AbstractSuperSet.isHashableNumType(element.hashCode())) {
      this._comparator = (o1: T, o2: T) => compareNum(o1.hashCode(), o2.hashCode())
    } else {
      throw new Error('Not supported element in ' + this.constructor.name)
    }

    this.initialized = true
  }

  /**
   * constructor
   *
   * @param elements
   */
  constructor(...elements: T[]) {
    // init with no values and standard comparator
    super((o1: T, o2: T) => compareAny(o1.hashCode(), o2.hashCode()))

    if (elements.length) {
      this.initComparator(elements[0])
      this.elements = elements
    }
  }

  /**
   * beforeAction
   *
   * Init comparator if not done yet
   * (if set was instantiated without values e.g. new HashSet();)
   *
   * @param fName
   * @param elements
   */
  protected beforeAction(fName: string, elements?: T | T[]): void {
    if (!this.initialized && fName === this.actionAdd.name && elements) {
      if (isArrayOfElements(elements)) {
        this.initComparator(elements[0])
      } else {
        this.initComparator(elements)
      }
    }
  }

  /**
   * afterAction hook
   *
   * @param fName
   * @param elements
   */
  protected afterAction(fName: string, elements?: T | T[]): void {}
}
