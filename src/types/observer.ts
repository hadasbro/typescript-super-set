import { Observable } from './observable'

/**
 * Observer
 *
 * Interface is used by all "Observer" Sets e.g.
 * HashSetObs, SimpleSetObs, SortedSetObs, SortedHashSetObs etc.
 */
export interface Observer {
  /**
   * Receive update from Observable element
   *
   * @param element
   */
  update(element: Observable): void
}
