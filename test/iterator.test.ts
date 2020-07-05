import { Elem } from './types'
import { SimpleSet } from '../src/core/simpleSet'

describe('Iterator test', () => {
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

  it('Iterator test', () => {
    mySet.add(el2, el1, el1Copy)
    let ctr = 1
    // @ts-ignore
    for (let value of mySet) {
      expect(value.id).toEqual(ctr)
      ctr++
    }
  })
})
