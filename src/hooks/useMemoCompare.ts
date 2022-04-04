import { equals } from 'ramda'
import { useRef } from 'react'

export const useMemoCompare = <Deps, Result>(
  factory: () => Result,
  deps: Deps
) => {
  const result = useRef<Result>()
  const prevDeps = useRef<Deps>(deps)

  if (result.current === undefined || !equals(deps, prevDeps.current)) {
    result.current = factory()
  }

  prevDeps.current = deps
  return result.current
}
