import { Elem } from './types'
import { SortedSet } from '../src/core/sortedSet'
import { ORDER } from '../src/types/types'

describe('SortedSet test', () => {
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

  let mySet = new SortedSet<Elem>(elIdComparator, ORDER.DESC, el2, el1, el1Copy, el2, el1)

  it('SortedSet test 1', () => {
    mySet.add(el1, el2, el1Copy)
    expect(mySet.elements.some(el => el.id === 2)).toBeTruthy()
    expect(mySet.elements.some(el => el.id === 1)).toBeTruthy()
    expect(mySet.size()).toEqual(2)
  })

  it('SortedSet test 2 (add)', () => {
    mySet.add(el1, el2, el1Copy)
    expect(mySet.elements.some(el => el.id === 2)).toBeTruthy()
    expect(mySet.elements.some(el => el.id === 1)).toBeTruthy()
    expect(mySet.size()).toEqual(2)
  })

  it('SortedSet test 3 (delete)', () => {
    mySet.delete(el1Copy)
    expect(mySet.elements.some(el => el.id === 1)).toBeTruthy()
    expect(mySet.elements.some(el => el.id === 2)).toBeFalsy()
    expect(mySet.size()).toEqual(1)
    expect(mySet.hasNot(el1Copy)).toBeTruthy()
  })

  it('SortedSet test 4 (clear)', () => {
    mySet.clear()
    expect(mySet.elements).toEqual([])
  })

  it('SortedSet test 5 (has, hasAll, size)', () => {
    mySet.add(el2, el1, el1Copy)
    expect(mySet.has(el1)).toBeTruthy()
    expect(mySet.hasAll(el2, el1, el1Copy)).toBeTruthy()
    expect(mySet.size()).toEqual(2)
  })

  it('SortedSet test 6 (order)', () => {
    mySet.add(el2, el1, el1Copy)
    expect(mySet.toString()).toEqual('[{"name":"el1","id":2},{"name":"el2","id":1}]')
  })

  it('SortedSet test 7 (set order)', () => {
    mySet.setSort(ORDER.DESC)
    expect(mySet.toString()).toEqual('[{"name":"el1","id":2},{"name":"el2","id":1}]')
  })

  it('SortedSet test 8 (set order)', () => {
    mySet.setSort(ORDER.ASC)
    expect(mySet.toString()).toEqual('[{"name":"el2","id":1},{"name":"el1","id":2}]')
  })

  it('SortedSet test 9 (reverse order)', () => {
    mySet.reverseOrder()
    expect(mySet.toString()).toEqual('[{"name":"el1","id":2},{"name":"el2","id":1}]')
  })

  it('SortedSet test 10 (reverse order)', () => {
    mySet.reverseOrder()
    expect(mySet.toString()).toEqual('[{"name":"el2","id":1},{"name":"el1","id":2}]')
  })
})

describe('SortedSet empty constructor test', () => {
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

  let mySet = new SortedSet<Elem>(elIdComparator, ORDER.DESC)

  mySet.add(el2, el1, el1Copy, el2, el1)

  it('SortedSet test 1', () => {
    mySet.add(el1, el2, el1Copy)
    expect(mySet.elements.some(el => el.id === 2)).toBeTruthy()
    expect(mySet.elements.some(el => el.id === 1)).toBeTruthy()
    expect(mySet.size()).toEqual(2)
  })

  it('SortedSet test 2 (add)', () => {
    mySet.add(el1, el2, el1Copy)
    expect(mySet.elements.some(el => el.id === 2)).toBeTruthy()
    expect(mySet.elements.some(el => el.id === 1)).toBeTruthy()
    expect(mySet.size()).toEqual(2)
  })

  it('SortedSet test 3 (delete)', () => {
    mySet.delete(el1Copy)
    expect(mySet.elements.some(el => el.id === 1)).toBeTruthy()
    expect(mySet.elements.some(el => el.id === 2)).toBeFalsy()
    expect(mySet.size()).toEqual(1)
    expect(mySet.hasNot(el1Copy)).toBeTruthy()
  })

  it('SortedSet test 4 (clear)', () => {
    mySet.clear()
    expect(mySet.elements).toEqual([])
  })

  it('SortedSet test 5 (has, hasAll, size)', () => {
    mySet.add(el2, el1, el1Copy)
    expect(mySet.has(el1)).toBeTruthy()
    expect(mySet.hasAll(el2, el1, el1Copy)).toBeTruthy()
    expect(mySet.size()).toEqual(2)
  })

  it('SortedSet test 6 (order)', () => {
    mySet.add(el2, el1, el1Copy)
    expect(mySet.toString()).toEqual('[{"name":"el1","id":2},{"name":"el2","id":1}]')
  })

  it('SortedSet test 7 (set order)', () => {
    mySet.setSort(ORDER.DESC)
    expect(mySet.toString()).toEqual('[{"name":"el1","id":2},{"name":"el2","id":1}]')
  })

  it('SortedSet test 8 (set order)', () => {
    mySet.setSort(ORDER.ASC)
    expect(mySet.toString()).toEqual('[{"name":"el2","id":1},{"name":"el1","id":2}]')
  })

  it('SortedSet test 9 (reverse order)', () => {
    mySet.reverseOrder()
    expect(mySet.toString()).toEqual('[{"name":"el1","id":2},{"name":"el2","id":1}]')
  })

  it('SortedSet test 10 (reverse order)', () => {
    mySet.reverseOrder()
    expect(mySet.toString()).toEqual('[{"name":"el2","id":1},{"name":"el1","id":2}]')
  })
})

describe('SortedSet object reference test', () => {
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

  let mySet = new SortedSet<Elem>(elIdComparator, ORDER.ASC, el2, el1)

  // now lets try to change IDs of both objects to be the same
  el2.id = 1
  el1.id = 1

  it('SortedSet object ref test 1', () => {
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

// now lets test order and order in case if we change any key property (here object's id)
// lets rollback our objects changes to be as before
describe("SortedSet object reference test 2 (order in case obe object's reference change)", () => {
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

  let mySet = new SortedSet<Elem>(elIdComparator, ORDER.ASC, el2, el1)

  it('SortedSet object ref test 1', () => {
    // here we have order by ID ASC
    expect(mySet.toString()).toEqual('[{"name":"el2","id":1},{"name":"el1","id":2}]')

    // now lets swap object's IDs (so in ideal world Set should see this and order of elements should change)
    el2.id = 2
    el1.id = 1

    /*
      test - unfortunately  order is not correct.
      The reason of that is that Set doesnt see changes on object references and cannot detect such changes.
     */
    expect(mySet.toString()).toEqual('[{"name":"el2","id":2},{"name":"el1","id":1}]')

    // what we can do is to refresh set
    mySet.refresh()

    // now order should be correct and in general set refreshed
    expect(mySet.toString()).toEqual('[{"name":"el1","id":1},{"name":"el2","id":2}]')
  })
})
