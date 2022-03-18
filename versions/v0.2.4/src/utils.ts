export const isNil = <T, U>(value: any) => value === null || value === undefined;

export const defaultTo = <T, U>(
  defaultValue: T,
  value: U
): T | Exclude<U, null | undefined> => isNil(value) ?
  defaultValue :
  value as Exclude<U, null | undefined>

export const mergeLeft = <T, R>(a: T) => (b: R): T & R => Object.assign({}, b, a);
// TODO - undefined keys should be dropped
// export const mergeLeft = <T extends { [key: string]: any }, R extends { [key: string]: any }>(a: T) => (b: R): T & R => {
//   const out = Object.assign({}, b);

//   for (const key in a) {
//     if (a[key] !== undefined) {
//       out[key] = a[key]
//     }
//   }

//   return out as T & R;
// }
