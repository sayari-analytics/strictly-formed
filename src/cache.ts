import { Id } from '~src/types'
import debounce from 'lodash.debounce'

class ComponentCache {
  public active: Set<Id>
  private queue: Set<Id>
  constructor() {
    this.active = new Set<Id>()
    this.queue = new Set<Id>()
  }

  private addQueue = debounce(() => {
    this.queue.forEach((id) => {
      if (this.active.has(id)) {
        // eslint-disable-next-line no-console
        console.warn(`
          strictly-formed | WARNING: "duplicate id"
            the id "${id}" is already in use.
            please use unique ids.
          `)
      } else {
        this.active.add(id)
      }
    })

    this.queue = new Set<Id>()
  }, 3000)

  public reset() {
    this.active = new Set<Id>()
  }

  public add<C>(id: Id<C>) {
    this.queue.add(id)
    this.addQueue()
  }

  public remove<C>(id: Id<C>) {
    this.active.delete(id)
  }
}

export default new ComponentCache()
