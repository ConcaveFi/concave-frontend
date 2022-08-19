// util to update array value on index, by passing an ArrayLike obj
export const updateArray = <T extends Array<T[number]>>(
  indexedObj: Omit<ArrayLike<T[number]>, 'length'>,
) => Array.from({ ...indexedObj, length: Object.values(indexedObj).length }) as T
