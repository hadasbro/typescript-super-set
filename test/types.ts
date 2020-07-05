import { Observable } from '../src/types/observable'
import { Observer } from '../src/types/observer'
import { Hashable, HashableObservable } from '../src/types/types'

/**
 * Elem
 */
export interface Elem {
  id: number
  name: string
}

/**
 * ObservableElem
 */
export interface ObservableElem extends Observable {
  _id: number
  _name: string
  _observers: Set<Observer>

  getId(): number
  setId(id: number): void
  getName(): string
  setName(name: string): void
  notify(): void
}

/**
 * HashableElem
 */
export interface HashableElem extends Hashable<string> {
  id: number
  name: string
}

/**
 * HashableElemNum
 */
export interface HashableElemNum extends Hashable<number> {
  id: number
  name: string
}

/**
 * HashableElem
 */
export interface HashableObservableElem extends HashableObservable<string> {
  _id: number
  _name: string
  _observers: Set<Observer>

  getId(): number
  setId(id: number): void
  getName(): string
  setName(name: string): void
  notify(): void
}

export interface HashableObservableElemNum extends HashableObservable<number> {
  _id: number
  _name: string
  _observers: Set<Observer>

  getId(): number
  setId(id: number): void
  getName(): string
  setName(name: string): void
  notify(): void
}

/**
 * HashableStr
 */
export class HashableStr implements Hashable<string> {
  public name: string
  public type: string

  hashCode(): string {
    return this.type
  }

  constructor(name: string, type: string) {
    this.name = name
    this.type = type
  }
}
