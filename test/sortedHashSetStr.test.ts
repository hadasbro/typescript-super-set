import { HashableElemNum } from './types'
import { SortedHashSet } from '../src/core/sortedHashSet'
import { ORDER } from '../src/types/types'

describe('SortedHashSet Literals test', () => {
  let el1: HashableElemNum = {
    hashCode(): number {
      return this.id
    },
    name: 'el1',
    id: 2
  }

  let el1SameName: HashableElemNum = {
    hashCode(): number {
      return this.id
    },
    name: 'el1',
    id: 2
  }

  let el2: HashableElemNum = {
    hashCode(): number {
      return this.id
    },
    name: 'el2',
    id: 3
  }

  let el3: HashableElemNum = {
    hashCode(): number {
      return this.id
    },
    name: 'el3',
    id: 4
  }

  let mySet = new SortedHashSet<HashableElemNum, number>(ORDER.ASC, el1, el1, el1SameName, el2)
  let mySet2 = new SortedHashSet<HashableElemNum, number>(ORDER.DESC, el1, el1, el1SameName, el2)

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
