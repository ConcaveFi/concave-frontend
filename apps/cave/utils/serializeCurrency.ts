import { Currency } from '@concave/core'

export const getAddressOrSymbol = (c: Currency) => {
  if (!c) return null
  return c.isNative ? c.symbol : c.wrapped.address
}

/*
    util for using currencies on react dependency arrays 
*/
export const serializeCurrency = (c: Currency) => `${getAddressOrSymbol(c)} ${c.chainId}`
