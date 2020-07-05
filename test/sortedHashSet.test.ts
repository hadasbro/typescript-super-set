import { HashableElem } from './types'
import { SortedHashSet } from '../src/core/sortedHashSet'
import { ORDER } from '../src/types/types'

describe('SortedHashSet Literals test', () => {
  let el1: HashableElem = {
    hashCode(): string {
      return this.name
    },
    name: 'el1',
    id: 2
  }

  let el1SameName: HashableElem = {
    hashCode(): string {
      return this.name
    },
    name: 'el1',
    id: 2
  }

  let el2: HashableElem = {
    hashCode(): string {
      return this.name
    },
    name: 'el2',
    id: 3
  }

  let el3: HashableElem = {
    hashCode(): string {
      return this.name
    },
    name: 'el3',
    id: 4
  }

  let mySet = new SortedHashSet<HashableElem, string>(ORDER.ASC, el1, el1, el1SameName, el2)
  let mySet2 = new SortedHashSet<HashableElem, string>(ORDER.DESC, el1, el1, el1SameName, el2)

  it('SortedHashSet test 1', () => {
    expect(mySet.toString()).toEqual('[{"name":"el1","id":2},{"name":"el2","id":3}]')
  })

  it('SortedHashSet test 2 (add)', () => {
    mySet.add(el1, el2, el1, el1SameName, el2, el3)
    expect(mySet.toString()).toEqual(
      '[{"name":"el1","id":2},{"name":"el2","id":3},{"name":"el3","id":4}]'
    )
  })

  it('SortedHashSet test 3 (delete)', () => {
    mySet.delete(el1SameName)
    expect(mySet.toString()).toEqual('[{"name":"el2","id":3},{"name":"el3","id":4}]')
    expect(mySet.hasNot(el1SameName)).toBeTruthy()
  })

  it('SortedHashSet test 5 (clear)', () => {
    mySet.clear()
    expect(mySet.elements).toEqual([])
  })

  it('SortedHashSet test 4 (has, hasAll, size)', () => {
    mySet.add(el2, el1, el1SameName, el3)
    expect(mySet.has(el1)).toBeTruthy()
    expect(mySet.hasAll(el2, el1, el1SameName)).toBeTruthy()
    expect(mySet.size()).toEqual(3)
  })

  it('SortedHashSet test order desc', () => {
    expect(mySet2.toString()).toEqual('[{"name":"el2","id":3},{"name":"el1","id":2}]')

    // reversed
    mySet2.reverseOrder()
    expect(mySet2.toString()).toEqual('[{"name":"el1","id":2},{"name":"el2","id":3}]')

    // reversed again
    mySet2.reverseOrder()
    expect(mySet2.toString()).toEqual('[{"name":"el2","id":3},{"name":"el1","id":2}]')

    // changed order
    mySet2.setSort(ORDER.ASC)
    expect(mySet2.toString()).toEqual('[{"name":"el1","id":2},{"name":"el2","id":3}]')
  })

  it('SortedHashSet test 6 (order)', () => {
    expect(mySet.toString()).toEqual(
      '[{"name":"el1","id":2},{"name":"el2","id":3},{"name":"el3","id":4}]'
    )
  })

  it('SortedHashSet test 7 (set order)', () => {
    mySet.setSort(ORDER.DESC)
    expect(mySet.toString()).toEqual(
      '[{"name":"el3","id":4},{"name":"el2","id":3},{"name":"el1","id":2}]'
    )
  })

  it('SortedHashSet test 8 (set order)', () => {
    mySet.setSort(ORDER.ASC)
    expect(mySet.toString()).toEqual(
      '[{"name":"el1","id":2},{"name":"el2","id":3},{"name":"el3","id":4}]'
    )
  })

  it('SortedHashSet test 9 (reverse order)', () => {
    mySet.reverseOrder()
    expect(mySet.toString()).toEqual(
      '[{"name":"el3","id":4},{"name":"el2","id":3},{"name":"el1","id":2}]'
    )
  })

  it('SortedHashSet test 10 (reverse order)', () => {
    mySet.reverseOrder()
    expect(mySet.toString()).toEqual(
      '[{"name":"el1","id":2},{"name":"el2","id":3},{"name":"el3","id":4}]'
    )
  })
})

/*
test shows that due to object's references and because Set is not able to
detect changes on objects references - it is possible to put 2 the same elements
to the set and, to make sure that our set is clear, sometimes we need to use Set.refresh()
 */
describe('SortedHashSet object reference test', () => {
  let el1: HashableElem = {
    hashCode(): string {
      return this.name
    },
    name: 'el1',
    id: 2
  }

  let el2: HashableElem = {
    hashCode(): string {
      return this.name
    },
    name: 'el2',
    id: 1
  }

  let mySet = new SortedHashSet<HashableElem, string>(ORDER.ASC, el2, el1)

  // now lets try to change IDs of both objects to be the same
  el2.name = 'same-name'
  el1.name = 'same-name'

  it('SortedHashSet object ref test 1', () => {
    expect(mySet.toString()).toEqual('[{"name":"same-name","id":2},{"name":"same-name","id":1}]')

    /*
      now lets refresh set to make sure that set's state is refreshed, set sees changes on objects references
      and again we have set of unique elements in correct order (here duplicates - one element - will be removed)
     */
    mySet.refresh()

    // elements should be filtered again, again unique and in correct order (if applicable)
    expect(mySet.toString()).toEqual('[{"name":"same-name","id":2}]')

    el2.name = 'another-name'
    mySet.add(el2)
    expect(mySet.toString()).toEqual('[{"name":"another-name","id":1},{"name":"same-name","id":2}]')

    mySet.reverseOrder()
    expect(mySet.toString()).toEqual('[{"name":"same-name","id":2},{"name":"another-name","id":1}]')
  })
})

// now lets test order and order in case if we change any key property (here object's id)
// lets rollback our objects changes to be as before
describe("SortedHashSet object reference test 2 (order in case obe object's reference change)", () => {
  let el1: HashableElem = {
    hashCode(): string {
      return this.name
    },
    name: 'el1',
    id: 2
  }

  let el2: HashableElem = {
    hashCode(): string {
      return this.name
    },
    name: 'el2',
    id: 1
  }

  let mySet = new SortedHashSet<HashableElem, string>(ORDER.ASC, el2, el1)

  it('SortedHashSet object ref test 1', () => {
    // here we have order by ID ASC
    expect(mySet.toString()).toEqual('[{"name":"el1","id":2},{"name":"el2","id":1}]')

    // now lets try to change names to force incorrect order
    el1.name = 'def'
    el2.name = 'abc'

    /*
      test - unfortunately  order is not correct.
      The reason of that is that Set doesnt see changes on object references and cannot detect such changes.
     */
    expect(mySet.toString()).toEqual('[{"name":"def","id":2},{"name":"abc","id":1}]')

    // what we can do is to refresh set
    mySet.refresh()

    // now order should be correct and in general set refreshed
    expect(mySet.toString()).toEqual('[{"name":"abc","id":1},{"name":"def","id":2}]')
  })
})
