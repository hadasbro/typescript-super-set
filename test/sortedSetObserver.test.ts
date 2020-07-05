import { ObservableElem } from './types'
import { SortedSetObs } from '../src/core/sortedSetObs'
import { Observer } from '../src/types/observer'
import { AbstractSuperSet } from '../src/core/abstractSuperSet'
import { ORDER } from '../src/types/types'

function stringifySet(set: AbstractSuperSet<ObservableElem>) {
  return JSON.stringify(
    set.elements.map(el => {
      return { _name: el.getName(), _id: el.getId() }
    })
  )
}

let el1: ObservableElem = {
  _observers: new Set<Observer>(),
  _name: 'el1',
  _id: 2,

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

let el1Copy: ObservableElem = {
  _observers: new Set<Observer>(),
  _name: 'el1Copy',
  _id: 2,

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

let el2: ObservableElem = {
  _observers: new Set<Observer>(),
  _name: 'el2',
  _id: 1,

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

let el3: ObservableElem = {
  _observers: new Set<Observer>(),
  _name: 'el3',
  _id: 3,

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

/*
  comparator compares ObservableElements by ID, for greater returns 1, for lower -1, for equal ObservableElements returns 0
 */
let elIdComparator = (el1: ObservableElem, el2: ObservableElem) =>
  el1.getId() === el2.getId() ? 0 : el1.getId() > el2.getId() ? 1 : -1

describe('Observable SortedSetObs test', () => {
  let mySet = new SortedSetObs<ObservableElem>(
    elIdComparator,
    ORDER.DESC,
    el2,
    el1,
    el1Copy,
    el2,
    el1
  )

  it('Observable SortedSetObs test 1', () => {
    mySet.add(el1, el2, el1Copy)
    expect(mySet.elements.some(el => el.getId() === 2)).toBeTruthy()
    expect(mySet.elements.some(el => el.getId() === 1)).toBeTruthy()
    expect(mySet.size()).toEqual(2)
  })

  it('Observable SortedSetObs test 2 (add)', () => {
    mySet.add(el1, el2, el1Copy)
    expect(mySet.elements.some(el => el.getId() === 2)).toBeTruthy()
    expect(mySet.elements.some(el => el.getId() === 1)).toBeTruthy()
    expect(mySet.size()).toEqual(2)
  })

  it('Observable SortedSetObs test 3 (delete)', () => {
    mySet.delete(el1Copy)
    expect(mySet.elements.some(el => el.getId() === 1)).toBeTruthy()
    expect(mySet.elements.some(el => el.getId() === 2)).toBeFalsy()
    expect(mySet.size()).toEqual(1)
    expect(mySet.hasNot(el1Copy)).toBeTruthy()
  })

  it('Observable SortedSetObs test 4 (clear)', () => {
    mySet.clear()
    expect(mySet.elements).toEqual([])
  })

  it('Observable SortedSetObs test 5 (has, hasAll, size)', () => {
    mySet.add(el2, el1, el1Copy)
    expect(mySet.has(el1)).toBeTruthy()
    expect(mySet.hasAll(el2, el1, el1Copy)).toBeTruthy()
    expect(mySet.size()).toEqual(2)
  })

  let mySet2 = new SortedSetObs<ObservableElem>(
    elIdComparator,
    ORDER.DESC,
    el2,
    el1,
    el1Copy,
    el2,
    el1
  )
  mySet2.add(el2, el1, el1Copy)

  it('Observable SortedSetObs test 6 (order)', () => {
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el1","_id":2},{"_name":"el2","_id":1}]')
  })

  it('Observable SortedSetObs test 7 (set order)', () => {
    mySet2.setSort(ORDER.DESC)
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el1","_id":2},{"_name":"el2","_id":1}]')
  })

  it('Observable SortedSetObs test 8 (set order)', () => {
    mySet2.setSort(ORDER.ASC)
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el2","_id":1},{"_name":"el1","_id":2}]')
  })

  it('Observable SortedSetObs test 9 (reverse order)', () => {
    mySet2.reverseOrder()
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el1","_id":2},{"_name":"el2","_id":1}]')
  })

  it('Observable SortedSetObs test 10 (reverse order)', () => {
    mySet2.reverseOrder()
    expect(stringifySet(mySet2)).toEqual('[{"_name":"el2","_id":1},{"_name":"el1","_id":2}]')
  })
})

describe('Observable SortedSetObs empty constructor test', () => {
  let mySet = new SortedSetObs<ObservableElem>(elIdComparator, ORDER.DESC)

  mySet.add(el2, el1, el1Copy, el2, el1)

  it('Observable SortedSetObs test 1', () => {
    mySet.add(el1, el2, el1Copy)
    expect(mySet.elements.some(el => el.getId() === 2)).toBeTruthy()
    expect(mySet.elements.some(el => el.getId() === 1)).toBeTruthy()
    expect(mySet.size()).toEqual(2)
  })

  it('Observable SortedSetObs test 2 (add)', () => {
    mySet.add(el1, el2, el1Copy)
    expect(mySet.elements.some(el => el.getId() === 2)).toBeTruthy()
    expect(mySet.elements.some(el => el.getId() === 1)).toBeTruthy()
    expect(mySet.size()).toEqual(2)
  })

  it('Observable SortedSetObs test 3 (delete)', () => {
    mySet.delete(el1Copy)
    expect(mySet.elements.some(el => el.getId() === 1)).toBeTruthy()
    expect(mySet.elements.some(el => el.getId() === 2)).toBeFalsy()
    expect(mySet.size()).toEqual(1)
    expect(mySet.hasNot(el1Copy)).toBeTruthy()
  })

  it('Observable SortedSetObs test 4 (clear)', () => {
    mySet.clear()
    expect(mySet.elements).toEqual([])
  })

  it('Observable SortedSetObs test 5 (has, hasAll, size)', () => {
    mySet.add(el2, el1, el1Copy)
    expect(mySet.has(el1)).toBeTruthy()
    expect(mySet.hasAll(el2, el1, el1Copy)).toBeTruthy()
    expect(mySet.size()).toEqual(2)
  })

  it('Observable SortedSetObs test 6 (order)', () => {
    mySet.add(el2, el1, el1Copy)
    expect(stringifySet(mySet)).toEqual('[{"_name":"el1","_id":2},{"_name":"el2","_id":1}]')
  })

  it('Observable SortedSetObs test 7 (set order)', () => {
    mySet.setSort(ORDER.DESC)
    expect(stringifySet(mySet)).toEqual('[{"_name":"el1","_id":2},{"_name":"el2","_id":1}]')
  })

  it('Observable SortedSetObs test 8 (set order)', () => {
    mySet.setSort(ORDER.ASC)
    expect(stringifySet(mySet)).toEqual('[{"_name":"el2","_id":1},{"_name":"el1","_id":2}]')
  })

  it('Observable SortedSetObs test 9 (reverse order)', () => {
    mySet.reverseOrder()
    expect(stringifySet(mySet)).toEqual('[{"_name":"el1","_id":2},{"_name":"el2","_id":1}]')
  })

  it('Observable SortedSetObs test 10 (reverse order)', () => {
    mySet.reverseOrder()
    expect(stringifySet(mySet)).toEqual('[{"_name":"el2","_id":1},{"_name":"el1","_id":2}]')
  })
})

// now lets test order and order in case if we change any key property (here object's id)
// lets rollback our objects changes to be as before
describe("Observable SortedSetObs object reference test 2 (order in case obe object's reference change)", () => {
  it('Observable SortedSetObs object ref test 1', () => {
    let mySet = new SortedSetObs<ObservableElem>(elIdComparator, ORDER.ASC, el2, el1, el3)

    // here we have order by ID ASC
    expect(stringifySet(mySet)).toEqual(
      '[{"_name":"el2","_id":1},{"_name":"el1","_id":2},{"_name":"el3","_id":3}]'
    )

    // now lets swap object's IDs (so in ideal world Set should see this and order of ObservableElements should change)
    el2.setId(2)
    el1.setId(1)

    // also lets set id = 1 for el3 (that change causes that el3 and el1 are identical - from
    // comparators perspective so one of the should be removed from the set)
    el3.setId(1)

    let expectedSetStr = '[{"_name":"el1","_id":1},{"_name":"el2","_id":2}]'
    expect(stringifySet(mySet)).toEqual(expectedSetStr)

    // after refresh set also should be the same
    mySet.refresh()
    expect(stringifySet(mySet)).toEqual(expectedSetStr)
  })
})
