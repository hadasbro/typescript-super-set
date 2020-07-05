import { Observer } from './observer'

/**
 * Observable
 *
 * Interface must be implemented in all Elements
 * used in every "observer sets" e.g. HashSetObs,
 * SimpleSetObs, SortedSetObs, SortedHashSetObs etc.
 *
 * Those sets watch changes in every attached object
 * and in case of any key-changes (e.g. changes which may
 * affect elements uniqueness or order of elements in set
 * set is being refreshed)
 */
export interface Observable {
  /**
   * Notify all observers about an event.
   *
   * Notify all collections, especially Sets including
   * this element, then something has changed, so Set
   * may need to control if elements are still unique
   * and in the correct order
   */
  notify(): void

  /**
   * Add/register new observer
   * @param observer
   */
  attach(observer: Observer): void

  /**
   * Unregister observer
   *
   * @param observer
   */
  detach(observer: Observer): void

  /**
   * check if observer is already registered
   */
  hasObserver(observer: Observer): boolean

  /**
   * get all observers
   */
  getObservers(): WeakSet<Observer>
}
