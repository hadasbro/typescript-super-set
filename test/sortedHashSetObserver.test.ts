import { HashableObservableElem } from './types'
import { Observer } from '../src/types/observer'
import { AbstractSuperSet } from '../src/core/abstractSuperSet'
import { SortedHashSetObs } from '../src/core/sortedHashSetObs'
import { ORDER } from '../src/types/types'

function stringifySet(set: AbstractSuperSet<HashableObservableElem>) {
  return JSON.stringify(
    set.elements.map(el => {
      return { _name: el.getName(), _id: el.getId() }
    })
  )
}

let el1: HashableObservableElem = {
  _observers: new Set<Observer>(),
  _name: 'el1',
  _id: 2,

  hashCode(): string {
    return this._name
  },

  attach(observer: Observer): void {
    if (!this._observers.has(observer)) {
      this._observers.add(observer)
    }
  },

  detach(observer: Observer): void {
    this._observers.delete(observer)
  },

  getObservers(): WeakSet<Observer> {
    return this._observers
  },

  hasObserver(observer: Observer): boolean {
    return this._observers.has(observer)
  },

  notify(): void {
    this._observers.forEach(observer => observer.update(this))
  },

  getId(): number {
    return this._id
  },

  setId(id: number): void {
    this._id = id
    this.notify()
  },

  getName(): string {
    return this._name
  },

  setName(name: string): void {
    this._name = name
    this.notify()
  }
}

let el1SameName: HashableObservableElem = {
  _observers: new Set<Observer>(),
  _name: 'el1',
  _id: 2,

  hashCode(): string {
    return this._name
  },

  attach(observer: Observer): void {
    if (!this._observers.has(observer)) {
      this._observers.add(observer)
    }
  },

  detach(observer: Observer): void {
    this._observers.delete(observer)
  },

  getObservers(): WeakSet<Observer> {
    return this._observers
  },

  notify(): void {
    this._observers.forEach(observer => observer.update(this))
  },

  hasObserver(observer: Observer): boolean {
    return this._observers.has(observer)
  },

  getId(): number {
    return this._id
  },

  setId(id: number): void {
    this._id = id
    this.notify()
  },

  getName(): string {
    return this._name
  },

  setName(name: string): void {
    this._name = name
    this.notify()
  }
}

let el2: HashableObservableElem = {
  _observers: new Set<Observer>(),
  _name: 'el2',
  _id: 1,

  hashCode(): string {
    return this._name
  },

  attach(observer: Observer): void {
    if (!this._observers.has(observer)) {
      this._observers.add(observer)
    }
  },

  detach(observer: Observer): void {
    this._observers.delete(observer)
  },

  getObservers(): WeakSet<Observer> {
    return this._observers
  },

  hasObserver(observer: Observer): boolean {
    return this._observers.has(observer)
  },

  notify(): void {
    this._observers.forEach(observer => observer.update(this))
  },

  getId(): number {
    return this._id
  },

  setId(id: number): void {
    this._id = id
    this.notify()
  },

  getName(): string {
    return this._name
  },

  setName(name: string): void {
    this._name = name
    this.notify()
  }
}

let el3: HashableObservableElem = {
  _observers: new Set<Observer>(),
  _name: 'el3',
  _id: 3,

  hashCode(): string {
    return this._name
  },

  attach(observer: Observer): void {
    if (!this._observers.has(observer)) {
      this._observers.add(observer)
    }
  },

  detach(observer: Observer): void {
    this._observers.delete(observer)
  },

  getObservers(): WeakSet<Observer> {
    return this._observers
  },

  hasObserver(observer: Observer): boolean {
    return this._observers.has(observer)
  },

  notify(): void {
    this._observers.forEach(observer => observer.update(this))
  },

  getId(): number {
    return this._id
  },

  setId(id: number): void {
    this._id = id
    this.notify()
  },

  getName(): string {
    return this._name
  },

  setName(name: string): void {
    this._name = name
    this.notify()
  }
}

describe('SortedHashSetObs Literals test', () => {
  let mySet = new SortedHashSetObs<HashableObservableElem, string>(
    ORDER.ASC,
    el1,
    el1,
    el1SameName,
    el2
  )
  let mySet2 = new SortedHashSetObs<HashableObservableElem, string>(
    ORDER.DESC,
    el1,
    el1,
    el1SameName,
    el2
  )

  it('SortedHashSetObs test 1', () => {
    expect(stringifySet(mySet)).toEqual('[{"_name":"el1","_id":2},{"_name":"el2","_id":1}]')
  })

  it('SortedHashSetObs test 2 (add)', () => {
    mySet.add(el1, el2, el1, el1SameName, el2, el3)
    expect(stringifySet(mySet)).toEqual(
      '[{"_name":"el1","_id":2},{"_name":"el2","_id":1},{"_name":"el3","_id":3}]'
    )
  })

  it('SortedHashSetObs test 3 (delete)', () => {
    mySet.delete(el1SameName)
    expect(stringifySet(mySet)).toEqual('[{"_name":"el2","_id":1},{"_name":"el3","_id":3}]')
    expect(mySet.hasNot(el1SameName)).toBeTruthy()
  })

  it('SortedHashSetObs test 5 (clear)', () => {
    mySet.clear()
    expect(mySet.elements).toEqual([])
  })

  it('SortedHashSetObs test 4 (has, hasAll, size)', () => {
    mySet.add(el2, el1, el1SameName, el3)
    expect(mySet.has(el1)).toBeTruthy()
    expect(mySet.hasAll(el2, el1, el1SameName)).toBeTruthy()
    expect(mySet.size()).toEqual(3)
  })

  it('SortedHashSetObs test order desc', () => {
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el2","_id":1},{"_name":"el1","_id":2}]')

    // reversed
    mySet2.reverseOrder()
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el1","_id":2},{"_name":"el2","_id":1}]')

    // reversed again
    mySet2.reverseOrder()
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el2","_id":1},{"_name":"el1","_id":2}]')

    // changed order
    mySet2.setSort(ORDER.ASC)
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el1","_id":2},{"_name":"el2","_id":1}]')
  })

  it('SortedHashSetObs test 6 (order)', () => {
    expect(stringifySet(mySet)).toEqual(
      '[{"_name":"el1","_id":2},{"_name":"el2","_id":1},{"_name":"el3","_id":3}]'
    )
  })

  it('SortedHashSetObs test 7 (set order)', () => {
    mySet.setSort(ORDER.DESC)
    expect(stringifySet(mySet)).toEqual(
      '[{"_name":"el3","_id":3},{"_name":"el2","_id":1},{"_name":"el1","_id":2}]'
    )
  })

  it('SortedHashSetObs test 8 (set order)', () => {
    mySet.setSort(ORDER.ASC)
    expect(stringifySet(mySet)).toEqual(
      '[{"_name":"el1","_id":2},{"_name":"el2","_id":1},{"_name":"el3","_id":3}]'
    )
  })

  it('SortedHashSetObs test 9 (reverse order)', () => {
    mySet.reverseOrder()
    expect(stringifySet(mySet)).toEqual(
      '[{"_name":"el3","_id":3},{"_name":"el2","_id":1},{"_name":"el1","_id":2}]'
    )
  })

  it('SortedHashSetObs test 10 (reverse order)', () => {
    mySet.reverseOrder()
    expect(stringifySet(mySet)).toEqual(
      '[{"_name":"el1","_id":2},{"_name":"el2","_id":1},{"_name":"el3","_id":3}]'
    )
  })
})

// now lets test order and order in case if we change any key property (here object's id)
// lets rollback our objects changes to be as before
describe("SortedHashSetObs object reference test 2 (order in case obe object's reference change)", () => {
  let mySet = new SortedHashSetObs<HashableObservableElem, string>(ORDER.ASC, el2, el1, el3)

  it('SortedHashSetObs object ref test 1', () => {
    // here we have order by name ASC
    expect(stringifySet(mySet)).toEqual(
      '[{"_name":"el1","_id":2},{"_name":"el2","_id":1},{"_name":"el3","_id":3}]'
    )

    // now lets try to change names to force incorrect order
    el1.setName('bel1')
    el2.setName('ael2')

    // and also set the same name for el3 as for el1
    el3.setName('bel1')

    let expectedSetStr = '[{"_name":"ael2","_id":1},{"_name":"bel1","_id":2}]'

    // here we have order by name ASC
    expect(stringifySet(mySet)).toEqual(expectedSetStr)

    // also after refresh result should be exactly the same
    mySet.refresh()
    expect(stringifySet(mySet)).toEqual(expectedSetStr)
  })
})
