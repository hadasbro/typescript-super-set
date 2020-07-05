import { SetInterface } from '../types/setInterface'
import { Comparator, HashableReturnNum, HashableReturnStr } from '../types/types'

/**
 * AbstractSuperSet<T>
 *
 * Abstraction for Sets
 * (SimpleSet, HashSet, SortedSet etc)
 */
export abstract class AbstractSuperSet<T> implements SetInterface<T>, Iterable<T> {
  /**
   * Iterator
   */
  *[Symbol.iterator](): any {
    // Generator<T, any, any>
    for (let i = 0; i < this.elements.length; i++) {
      yield this.elements[i]
    }
  }

  /**
   * Types of actions
   */
  public static readonly ACTION_ADD = 'ACTION_ADD'
  public static readonly ACTION_DELETE = 'ACTION_DELETE'
  public static readonly ACTION_CLEAR = 'ACTION_CLEAR'
  public static readonly ACTION_REPLACE = 'ACTION_REPLACE'

  /**
   * _comparator
   *
   * @param obj1
   * @param obj2
   * @private
   */
  protected _comparator: Comparator<T>

  /**
   * _elements
   */
  protected _elements: T[] = []

  /**
   * afterAction hook
   *
   * Actions are insert update delete, any change in set
   * see: ACTION ADD, ACTION DELETE, ACTION CLEAR
   */
  protected abstract afterAction(fName: string, elements: T | T[]): void

  /**
   * beforeAction hook
   *
   * Actions are insert update delete, any change in set
   * see: ACTION ADD, ACTION DELETE, ACTION CLEAR
   */
  protected abstract beforeAction(fName: string, elements: T | T[]): void

  /**
   * toString
   */
  public toString() {
    return JSON.stringify(this.elements)
  }

  /**
   * actionAdd
   *
   * ACTION_ADD element
   *
   * @param elements
   */
  protected actionAdd(elements: T[]): void {
    this.beforeAction(AbstractSuperSet.ACTION_ADD, elements)
    elements.forEach(el => {
      if (this.isUnique(el)) {
        this._elements.push(el)
      }
    })
    this.afterAction(AbstractSuperSet.ACTION_ADD, elements)
  }

  /**
   * actionDelete
   *
   * ACTION_DELETE element
   *
   * @param elements
   */
  protected actionDelete(elements: T[]): void {
    this.beforeAction(AbstractSuperSet.ACTION_DELETE, elements)

    elements.forEach(element => {
      this._elements = this._elements.filter(el => this._comparator(el, element) !== 0)
    })

    this.afterAction(AbstractSuperSet.ACTION_DELETE, elements)
  }

  /**
   * clear
   *
   * ACTION_CLEAR set
   */
  protected actionClear(): this {
    this.beforeAction(AbstractSuperSet.ACTION_CLEAR, [])
    this._elements = []
    this.afterAction(AbstractSuperSet.ACTION_CLEAR, [])
    return this
  }

  /**
   * replaceAndPreventHook
   *
   * @param elements
   */
  protected replaceAndPreventHook(elements: T[]): void {
    this._elements = []
    elements.forEach(el => {
      if (this.isUnique(el)) this._elements.push(el)
    })
  }

  /**
   * replaceWithHook
   *
   * @param elements
   */
  protected replaceWithHook(elements: T[]): void {
    this.beforeAction(AbstractSuperSet.ACTION_REPLACE, elements)
    this.replaceAndPreventHook(elements)
    this.afterAction(AbstractSuperSet.ACTION_REPLACE, elements)
  }

  /**
   * isUnique
   *
   * @param element
   */
  protected isUnique(element: T): boolean {
    return !this._elements.length || !this._elements.some(el => this._comparator(el, element) === 0)
  }

  /**
   * isHashableStrType
   *
   * @param value
   */
  public static isHashableStrType(value: any): value is HashableReturnStr {
    return (value as HashableReturnStr).toUpperCase !== undefined
  }

  /**
   * isHashableNumType
   *
   * @param value
   */
  public static isHashableNumType(value: any): value is HashableReturnNum {
    return (value as HashableReturnNum).toExponential !== undefined
  }

  /**
   * refresh
   */
  public refresh(): void {
    this.replaceWithHook(this._elements)
  }

  /**
   * add
   */
  public add(...element: T[]): this {
    this.actionAdd(element)
    return this
  }

  /**
   * clear
   */
  public clear(): this {
    this.actionClear()
    return this
  }

  /**
   * add
   * @param elements
   */
  public delete(...elements: T[]): this {
    this.actionDelete(elements)
    return this
  }

  /**
   * has
   *
   * @param element
   */
  public has(element: T): boolean {
    return this._elements.some(el => this._comparator(el, element) === 0)
  }

  /**
   * hasNot
   *
   * @param element
   */
  public hasNot(element: T): boolean {
    return !this.has(element)
  }

  /**
   * hasAll
   *
   * @param element
   */
  public hasAll(...element: T[]): boolean {
    return element.every(el => this.has(el))
  }

  /**
   * size
   */
  public size(): number {
    return this._elements.length
  }

  /**
   * get elements
   */
  get elements(): T[] {
    return this._elements
  }

  /**
   * set elements
   *
   * @param elements
   */
  set elements(elements: T[]) {
    this.actionAdd(elements)
  }

  /**
   * constructor
   *
   * @param comparator
   * @param elements
   */
  protected constructor(comparator: Comparator<T>, ...elements: T[]) {
    this._comparator = comparator

    if (elements.length) {
      this.actionAdd(elements)
    }
  }
}
