export const isString = (value: unknown): value is string =>
  typeof value === 'string'
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number'
export const isBool = (value: unknown): value is boolean =>
  typeof value === 'boolean'

export const pushSet = <T>(set: Set<T>, ...items: T[]): Set<T> => {
  const newSet = new Set<T>()
  set.forEach((x) => newSet.add(x))
  items.forEach((x) => newSet.add(x))
  return newSet
}

export const filterSet = <T>(
  predicate: (item: T) => boolean,
  set: Set<T>
): Set<T> => {
  const newSet = new Set<T>()
  set.forEach((x) => {
    if (predicate(x)) {
      newSet.add(x)
    }
  })
  return newSet
}
