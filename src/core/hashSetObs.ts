import { AbstractSuperSet } from './abstractSuperSet'
import { isArrayOfElements } from '../utils/utils'
import { Observer } from '../types/observer'
import { HashableObservable } from '../types/types'
import { HashSet } from './hashSet'

/**
 * HashSet<T>
 *
 * Hash Set - set uses Hashable.hashCode() to differentiate/distinguish
 * elements. Also, depending on hashCode type (number or string) set
 * uses either number comparison either string comparison (String.localeCompare)
 *
 * This is extended, experimental version of Set implementing Observer pattern
 * (Observable elements notify this - Observer Set about important changes which
 * may affect order of elements or just structure of this Set)
 */
export class HashSetObs<T extends HashableObservable<S>, S extends number | string>
  extends HashSet<T, S>
  implements Observer {
  /**
   * update
   *
   * @param element
   */
  update(element: T): void {
    let correspondingEl = this._elements.filter(el => this._comparator(el, element) === 0)

    let [first] = correspondingEl

    if (typeof first === 'undefined') {
      // if we cannot find our element anymore, that means that either element is no longer in set
      // either - especially - that any key-value (which affected comparator's result) for that
      // element has changed so now, just to be sure that element is still in the set and elements
      // are in correct order we need to refresh set.

      this.refresh()
    } else if (first !== element) {
      // Otherwise - if we can find this element in our set and also if element we found is the same
      // object (reference) then, that means that even if anything changed in our element - it should
      // not cause any change in set (because comparator still returns the same value for that element)
      // reference equality check is needed here to make sure that we are aware about swapping objects
      // e.g. if we have objects {name:'a', id: 1} and {name:'b', id: 2} and if we swap/edit them to be
      // {name:'a', id: 2} and {name:'b', id: 1} then comparator still will be able to find them both
      // but we need to refresh set anyway, to ensure that order of elements is correct (sorted sets)

      this.refresh()
    }

    // in other scenario (we are able to find an element in set and it is the same one) - we dont
    // need to refresh set because it will look exactly the same and its in general correct
  }

  /**
   * afterAction
   *
   * @param fName
   * @param elements
   */
  protected afterAction(fName: string, elements: T | T[]): void {
    /* register this Set as an observer for elements */

    // noinspection DuplicatedCode
    if ([AbstractSuperSet.ACTION_ADD, AbstractSuperSet.ACTION_REPLACE].includes(fName)) {
      if (isArrayOfElements(elements)) {
        elements.forEach(el => {
          if (!el.hasObserver(this)) {
            el.attach(this)
          }
        })
      } else if (!elements.hasObserver(this)) {
        elements.attach(this)
      }
    }

    /* unregister this Set from being observer for element */

    if ([AbstractSuperSet.ACTION_CLEAR, AbstractSuperSet.ACTION_DELETE].includes(fName)) {
      if (isArrayOfElements(elements)) {
        elements.forEach(el => {
          if (el.hasObserver(this)) {
            el.detach(this)
          }
        })
      } else if (elements.hasObserver(this)) {
        elements.detach(this)
      }
    }
  }
}
