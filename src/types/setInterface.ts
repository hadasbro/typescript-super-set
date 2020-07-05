/**
 * SetInterface<T>
 *
 * All SetInterface's methods
 */
export interface SetInterface<T> {
  /**
   * add
   *
   * Add new, unique element
   * (use comparator for checking elements equality)
   *
   * @param element
   */
  add(...element: T[]): this

  /**
   * delete
   *
   * Delete element or many of them
   * (use comparator for checking elements equality)
   *
   * @param element
   */
  delete(...element: T[]): this

  /**
   * clear
   *
   * Clear set, remove all elements
   */
  clear(): this

  /**
   * has
   *
   * Check if set contains element
   * (use comparator for checking elements equality)
   *
   * @param element
   */
  has(element: T): boolean

  /**
   * hasAll
   *
   * @param element
   */
  hasAll(...element: T[]): boolean

  /**
   * hasNot
   *
   * @param element
   */
  hasNot(element: T): boolean

  /**
   * size
   *
   * Get set's size (number of elements)
   */
  size(): number

  /**
   * refresh
   *
   * Refresh set to make sure that set contains unique elements in correct
   * order (in case of mutable objects and any kind of changes on them)
   */
  refresh(): void
}
