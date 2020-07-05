import { Observer } from '../src/types/observer'
import { AbstractSuperSet } from '../src/core/abstractSuperSet'
import { SortedHashSetObs } from '../src/core/sortedHashSetObs'
import { HashableObservable, ORDER } from '../src/types/types'

function stringifySet(set: AbstractSuperSet<Element>) {
  return JSON.stringify(
    set.elements.map(el => {
      return { _name: el.name, _id: el.id }
    })
  )
}

/**
 * AbstractElement
 *
 * Abstraction for Observable elements
 */
abstract class AbstractElement<T extends string> implements HashableObservable<T> {
  /**
   * registered Observers (e.g. Set implementing interface Observer)
   */
  private _observers = new Set<Observer>()

  /**
   * hashCode
   */
  abstract hashCode(): T

  /**
   * attach
   *
   * Attach new observer
   *
   * @param observer
   */
  public attach(observer: Observer): void {
    if (!this._observers.has(observer)) {
      this._observers.add(observer)
    }
  }

  /**
   * detach
   *
   * Detach observer
   *
   * @param observer
   */
  public detach(observer: Observer): void {
    this._observers.delete(observer)
  }

  /**
   * getObservers
   *
   * get Observers
   */
  public getObservers(): WeakSet<Observer> {
    return this._observers
  }

  /**
   * hasObserver
   *
   * Check if observer is already registered
   * @param observer
   */
  public hasObserver(observer: Observer): boolean {
    return this._observers.has(observer)
  }

  /**
   * notify
   *
   * notify all observers about important changes
   */
  public notify(): void {
    this._observers.forEach(observer => observer.update(this))
  }
}

/**
 * Element
 */
class Element extends AbstractElement<string> {
  private _name: string
  private _id: number

  constructor(name: string, id: number) {
    super()
    this._name = name
    this._id = id
  }

  /**
   * hashCode returns name, so uniqueness
   * means that elements have different name
   */
  hashCode(): string {
    return this._name
  }

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name
    this.notify() // notify observers about change
  }

  get id(): number {
    return this._id
  }

  set id(id: number) {
    this._id = id
    this.notify() // notify observers (this could be omitted)
  }
}

let element1: Element = new Element('element1', 2)
let element1Copy: Element = new Element('element1', 2)
let element2: Element = new Element('element2', 1)
let element3: Element = new Element('element3', 3)

describe('Reference elemenets test', () => {
  it('Ref test 1', () => {
    let mySet = new SortedHashSetObs<Element, string>(
      ORDER.ASC,
      element2,
      element1,
      element3,
      element1Copy
    )

    // here we have order by ID ASC
    expect(stringifySet(mySet)).toEqual(
      '[{"_name":"element1","_id":2},{"_name":"element2","_id":1},{"_name":"element3","_id":3}]'
    )

    // now lets swap object's names (that should affect elements order in Set)
    element2.name = 'aelement2'
    element1.name = 'belement1'

    // also lets set the same name for element3 as for element1 (that should cause removal for one of
    // those elements because from Element.hashCode() perspective both of them are considered as equal)
    element3.name = 'belement1'

    let expectedSetStr = '[{"_name":"aelement2","_id":1},{"_name":"belement1","_id":2}]'
    expect(stringifySet(mySet)).toEqual(expectedSetStr)

    // after refresh set also should be the same
    mySet.refresh()
    expect(stringifySet(mySet)).toEqual(expectedSetStr)
  })
})
