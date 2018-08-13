export const isNil = <T, U>(value: any) => value === null || value === undefined;

export const defaultTo = <T, U>(
  defaultValue: T,
  value: U
): T | Exclude<U, null | undefined> => isNil(value) ?
  defaultValue :
  value as Exclude<U, null | undefined>
