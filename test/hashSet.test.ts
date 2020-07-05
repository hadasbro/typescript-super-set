import { HashableElem, HashableStr } from './types'
import { HashSet } from '../src/core/hashSet'

describe('HashSet Literals test', () => {
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

  let mySet = new HashSet<HashableElem, string>(el1, el1, el1SameName, el2)

  it('HashSet test 1', () => {
    expect(mySet.toString()).toEqual('[{"name":"el1","id":2},{"name":"el2","id":3}]')
  })

  it('HashSet test 2 (add)', () => {
    mySet.add(el1, el2, el1, el1SameName, el2, el3)
    expect(mySet.toString()).toEqual(
      '[{"name":"el1","id":2},{"name":"el2","id":3},{"name":"el3","id":4}]'
    )
  })

  it('HashSet test 3 (delete)', () => {
    mySet.delete(el1SameName)
    expect(mySet.toString()).toEqual('[{"name":"el2","id":3},{"name":"el3","id":4}]')
    expect(mySet.hasNot(el1SameName)).toBeTruthy()
  })

  it('HashSet test 5 (clear)', () => {
    mySet.clear()
    expect(mySet.elements).toEqual([])
  })

  it('HashSet test 4 (has, hasAll, size)', () => {
    mySet.add(el2, el1, el1SameName, el3)
    expect(mySet.has(el1)).toBeTruthy()
    expect(mySet.hasAll(el2, el1, el1SameName)).toBeTruthy()
    expect(mySet.size()).toEqual(3)
  })
})

describe('HashSet Empty constructor test', () => {
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

  let mySet = new HashSet<HashableElem, string>()

  mySet.add(el1, el1, el1SameName, el2)

  it('HashSet test 1', () => {
    expect(mySet.toString()).toEqual('[{"name":"el1","id":2},{"name":"el2","id":3}]')
  })

  it('HashSet test 2 (add)', () => {
    mySet.add(el1, el2, el1, el1SameName, el2, el3)
    expect(mySet.toString()).toEqual(
      '[{"name":"el1","id":2},{"name":"el2","id":3},{"name":"el3","id":4}]'
    )
  })

  it('HashSet test 3 (delete)', () => {
    mySet.delete(el1SameName)
    expect(mySet.toString()).toEqual('[{"name":"el2","id":3},{"name":"el3","id":4}]')
    expect(mySet.hasNot(el1SameName)).toBeTruthy()
  })

  it('HashSet test 5 (clear)', () => {
    mySet.clear()
    expect(mySet.elements).toEqual([])
  })

  it('HashSet test 4 (has, hasAll, size)', () => {
    mySet.add(el2, el1, el1SameName, el3)
    expect(mySet.has(el1)).toBeTruthy()
    expect(mySet.hasAll(el2, el1, el1SameName)).toBeTruthy()
    expect(mySet.size()).toEqual(3)
  })
})

describe('HashSet Classes test', () => {
  let el1 = new HashableStr('Name1', 'type1')
  let el2 = new HashableStr('Name2', 'type2')
  let el3 = new HashableStr('Name3', 'type1') // type1 repeated
  let el4 = new HashableStr('Name4', 'type2') // type2 repeated
  let el5 = new HashableStr('Name5', 'type3')
  let el6 = new HashableStr('Name6', 'type4')
  let el7 = new HashableStr('Name7', 'type5')

  let mySet = new HashSet<HashableStr, string>(el1, el1, el2, el3, el4, el5, el6)

  it('HashSet class test 1', () => {
    expect(mySet.toString()).toEqual(
      '[{"name":"Name1","type":"type1"},{"name":"Name2","type":"type2"},{"name":"Name5","type":"type3"},{"name":"Name6","type":"type4"}]'
    )
  })

  it('HashSet class test 2 (add)', () => {
    mySet.add(el7, el7)
    expect(mySet.toString()).toEqual(
      '[{"name":"Name1","type":"type1"},{"name":"Name2","type":"type2"},{"name":"Name5","type":"type3"},{"name":"Name6","type":"type4"},{"name":"Name7","type":"type5"}]'
    )
  })

  it('HashSet class test 3 (delete)', () => {
    // items are distinguished by type, so here we have type=2 so even if we dont have exactly the
    // same object (name='Name4' and type='type2') in Set, but we have "the same one" from Set's perspective
    // (name=any and type='type2') - that one will be deleted (and every other "the same one" so object with type=2)
    mySet.delete(el4)
    mySet.delete(el5)
    expect(mySet.toString()).toEqual(
      '[{"name":"Name1","type":"type1"},{"name":"Name6","type":"type4"},{"name":"Name7","type":"type5"}]'
    )
  })

  it('HashSet class test 5 (clear)', () => {
    mySet.clear()
    expect(mySet.elements).toEqual([])
  })

  it('HashSet class test 4 (has, hasAll, size)', () => {
    mySet.add(el1, el1, el2, el3, el4, el5, el6)
    expect(mySet.has(el1)).toBeTruthy()
    expect(mySet.hasAll(el1, el2, el3, el4, el5)).toBeTruthy()
    expect(mySet.size()).toEqual(4)
  })
})

describe('HashSet object reference test', () => {
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

  let mySet = new HashSet<HashableElem, string>(el2, el1)

  it('HashSet object ref test 1', () => {
    expect(mySet.toString()).toEqual('[{"name":"el2","id":1},{"name":"el1","id":2}]')

    // now lets try to change names of both objects to be the same (and then also hashCode)
    el2.name = 'name1'
    el1.name = 'name1'

    // now we have 2 the identical objects in set ("identical" in Set & comparator meaning, so
    // here "identical" means 2 objects with the same name (vecause hashCode returns name so
    // distunguish objects by name)
    expect(mySet.toString()).toEqual('[{"name":"name1","id":1},{"name":"name1","id":2}]')

    // what we can do is to refresh set
    mySet.refresh()

    // now we should correct set with unique elements (in terms of hashCode) again
    expect(mySet.toString()).toEqual('[{"name":"name1","id":1}]')
  })
})
