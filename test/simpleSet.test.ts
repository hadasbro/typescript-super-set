import { Elem } from './types'
import { SimpleSet } from '../src/core/simpleSet'

describe('SimpleSet test', () => {
  let el1: Elem = {
    name: 'el1',
    id: 2
  }

  let el1Copy: Elem = {
    name: 'el1Copy',
    id: 2
  }

  let el2: Elem = {
    name: 'el2',
    id: 1
  }

  /*
  comparator compares elements by ID, for greater returns 1, for lower -1, for equal elements returns 0
  */
  let elIdComparator = (el1: Elem, el2: Elem) => (el1.id === el2.id ? 0 : el1.id > el2.id ? 1 : -1)

  let mySet = new SimpleSet<Elem>(elIdComparator, el2, el1, el1Copy)

  it('SimpleSet test 1', () => {
    expect(mySet.toString()).toEqual('[{"name":"el2","id":1},{"name":"el1","id":2}]')
  })

  it('SimpleSet test 2 (add)', () => {
    mySet.add(el1, el2, el1Copy)
    expect(mySet.toString()).toEqual('[{"name":"el2","id":1},{"name":"el1","id":2}]')
  })

  it('SimpleSet test 3 (delete)', () => {
    mySet.delete(el1Copy)
    expect(mySet.toString()).toEqual('[{"name":"el2","id":1}]')
    expect(mySet.hasNot(el1Copy)).toBeTruthy()
  })

  it('SimpleSet test 5 (clear)', () => {
    mySet.clear()
    expect(mySet.elements).toEqual([])
  })

  it('SimpleSet test 4 (has, hasNot, hasAll, size)', () => {
    mySet.add(el2, el1, el1Copy)
    expect(mySet.has(el1)).toBeTruthy()
    expect(mySet.hasNot(el1)).toBeFalsy()
    expect(mySet.hasAll(el2, el1, el1Copy)).toBeTruthy()
    expect(mySet.size()).toEqual(2)
  })
})

describe('SimpleSet empty constructor test', () => {
  let el1: Elem = {
    name: 'el1',
    id: 2
  }

  let el1Copy: Elem = {
    name: 'el1Copy',
    id: 2
  }

  let el2: Elem = {
    name: 'el2',
    id: 1
  }

  /*
  comparator compares elements by ID, for greater returns 1, for lower -1, for equal elements returns 0
  */
  let elIdComparator = (el1: Elem, el2: Elem) => (el1.id === el2.id ? 0 : el1.id > el2.id ? 1 : -1)

  let mySet = new SimpleSet<Elem>(elIdComparator)

  mySet.add(el2, el1, el1Copy)

  it('SimpleSet test 1', () => {
    expect(mySet.toString()).toEqual('[{"name":"el2","id":1},{"name":"el1","id":2}]')
  })

  it('SimpleSet test 2 (add)', () => {
    mySet.add(el1, el2, el1Copy)
    expect(mySet.toString()).toEqual('[{"name":"el2","id":1},{"name":"el1","id":2}]')
  })

  it('SimpleSet test 3 (delete)', () => {
    mySet.delete(el1Copy)
    expect(mySet.toString()).toEqual('[{"name":"el2","id":1}]')
    expect(mySet.hasNot(el1Copy)).toBeTruthy()
  })

  it('SimpleSet test 5 (clear)', () => {
    mySet.clear()
    expect(mySet.elements).toEqual([])
  })

  it('SimpleSet test 4 (has, hasNot, hasAll, size)', () => {
    mySet.add(el2, el1, el1Copy)
    expect(mySet.has(el1)).toBeTruthy()
    expect(mySet.hasNot(el1)).toBeFalsy()
    expect(mySet.hasAll(el2, el1, el1Copy)).toBeTruthy()
    expect(mySet.size()).toEqual(2)
  })
})

describe('SimpleSet object reference test', () => {
  let el1: Elem = {
    name: 'el1',
    id: 2
  }

  let el2: Elem = {
    name: 'el2',
    id: 1
  }

  /*
  comparator compares elements by ID, for greater returns 1, for lower -1, for equal elements returns 0
  */
  let elIdComparator = (el1: Elem, el2: Elem) => (el1.id === el2.id ? 0 : el1.id > el2.id ? 1 : -1)

  let mySet = new SimpleSet<Elem>(elIdComparator, el2, el1)

  // now lets try to change IDs of both objects to be the same
  el2.id = 1
  el1.id = 1

  it('SimpleSet object ref test', () => {
    /*
      now, even if we declare comparator which takes into consideration object IDs and
      even if we declare our set to contain only unique elements (in terms of object's id)
      we have set with 2 objects with the same ID

      The reason of that is that Set doesnt see changes on object references and cannot
      detect such changes.
     */
    expect(mySet.toString()).toEqual('[{"name":"el2","id":1},{"name":"el1","id":1}]')

    /*
      now lets refresh set to make sure that set's state is refreshed, set sees changes on objects references
      and again we have set of unique elements in correct order (here duplicates - one element - will be removed)
     */
    mySet.refresh()

    // elements should be filtered again, again unique and in correct order (if applicable)
    expect(mySet.toString()).toEqual('[{"name":"el2","id":1}]')
  })
})
