/* eslint-disable no-console */
export const warn = (message: string): void => {
  if (typeof console === 'object' && typeof console.warn === 'function') {
    console.warn(`strictly-formed | WARNING: ${message}`)
  }
}
