import { HashableObservableElemNum } from './types'
import { Observer } from '../src/types/observer'
import { AbstractSuperSet } from '../src/core/abstractSuperSet'
import { SortedHashSetObs } from '../src/core/sortedHashSetObs'
import { ORDER } from '../src/types/types'

function stringifySet(set: AbstractSuperSet<HashableObservableElemNum>) {
  return JSON.stringify(
    set.elements.map(el => {
      return { _name: el.getName(), _id: el.getId() }
    })
  )
}

let el1: HashableObservableElemNum = {
  _observers: new Set<Observer>(),
  _name: 'el1',
  _id: 2,

  hashCode(): number {
    return this._id
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

let el1SameName: HashableObservableElemNum = {
  _observers: new Set<Observer>(),
  _name: 'el1',
  _id: 2,

  hashCode(): number {
    return this._id
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

let el2: HashableObservableElemNum = {
  _observers: new Set<Observer>(),
  _name: 'el2',
  _id: 1,

  hashCode(): number {
    return this._id
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

let el3: HashableObservableElemNum = {
  _observers: new Set<Observer>(),
  _name: 'el3',
  _id: 3,

  hashCode(): number {
    return this._id
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
  let mySet = new SortedHashSetObs<HashableObservableElemNum, number>(
    ORDER.ASC,
    el1,
    el1,
    el1SameName,
    el2
  )
  let mySet2 = new SortedHashSetObs<HashableObservableElemNum, number>(
    ORDER.DESC,
    el1,
    el1,
    el1SameName,
    el2
  )

  it('SortedHashSetObs test 1', () => {
    expect(stringifySet(mySet)).toEqual('[{"_name":"el2","_id":1},{"_name":"el1","_id":2}]')
  })

  it('SortedHashSetObs test 2 (add)', () => {
    mySet.add(el1, el2, el1, el1SameName, el2, el3)
    expect(stringifySet(mySet)).toEqual(
      '[{"_name":"el2","_id":1},{"_name":"el1","_id":2},{"_name":"el3","_id":3}]'
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
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el1","_id":2},{"_name":"el2","_id":1}]')

    // reversed
    mySet2.reverseOrder()
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el2","_id":1},{"_name":"el1","_id":2}]')

    // reversed again
    mySet2.reverseOrder()
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el1","_id":2},{"_name":"el2","_id":1}]')

    // changed order
    mySet2.setSort(ORDER.ASC)
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el2","_id":1},{"_name":"el1","_id":2}]')
  })

  it('SortedHashSetObs test 6 (order)', () => {
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el2","_id":1},{"_name":"el1","_id":2}]')
  })

  it('SortedHashSetObs test 7 (set order)', () => {
    mySet2.setSort(ORDER.DESC)
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el1","_id":2},{"_name":"el2","_id":1}]')
  })

  it('SortedHashSetObs test 8 (set order)', () => {
    mySet2.setSort(ORDER.ASC)
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el2","_id":1},{"_name":"el1","_id":2}]')
  })

  it('SortedHashSetObs test 9 (reverse order)', () => {
    mySet2.reverseOrder()
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el1","_id":2},{"_name":"el2","_id":1}]')
  })

  it('SortedHashSetObs test 10 (reverse order)', () => {
    mySet2.reverseOrder()
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el2","_id":1},{"_name":"el1","_id":2}]')
  })
})
