
export module Strings {
  export function isObjectEmpty(obj: any) {
    if (obj === null || obj === undefined) return true
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
}
