export function Cache(maxSize = 60000) {
  const cache = new Map<string, unknown>()
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    const method = descriptor.value
    const newMethod = (...args: unknown[]) => {
      const methodKey = JSON.stringify({ key, args })
      const fromCache = cache.get(methodKey)
      if (fromCache) return fromCache
      const result = method.apply(target, args)
      cache.set(methodKey, result)
      setInterval(() => cache.delete(methodKey), maxSize)
      return result
    }
    descriptor.value = newMethod
  }
}
