import { CNV, NATIVE } from '@concave/core'
import { renderHook, waitFor } from '@testing-library/react'
import { chain } from 'wagmi'
import { WagmiProvider } from '../../contexts/WagmiContext'
import { useCurrencyBalanceOfAddress } from '../../hooks/useCurrencyBalance'

describe('Check useCurrencyBalanceOfAddress', () => {
  const options = { wrapper: WagmiProvider }
  const wallet = '0x8522093305253EfB2685241dc0C587CDD9B10e4B'
  const timeout = 5_000

  it('CNV on mainnet', async () => {
    const currency = CNV[chain.mainnet.id]
    const options = { wrapper: WagmiProvider }
    const { result } = renderHook(() => useCurrencyBalanceOfAddress(currency, wallet), options)
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), { timeout })
    const { data: currencyAmount } = result.current
    expect(currencyAmount.currency.wrapped.address).toBe(currency.address)
    expect(currencyAmount.currency.symbol).toBe('CNV')
    expect(currencyAmount.toSignificant()).toBeDefined()
  })

  it('CNV on rinkeby', async () => {
    const currency = CNV[chain.rinkeby.id]
    const options = { wrapper: WagmiProvider }
    const { result } = renderHook(() => useCurrencyBalanceOfAddress(currency, wallet), options)
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), { timeout })
    const { data: currencyAmount } = result.current
    expect(currencyAmount.currency.wrapped.address).toBe(currency.address)
    expect(currencyAmount.currency.symbol).toBe('CNV')
    expect(currencyAmount.greaterThan(0)).toBeTruthy()
  })

  it('Check useCurrencyBalanceOfAddress with native on rinkeby', async () => {
    const currency = NATIVE[chain.rinkeby.id]
    const { result } = renderHook(() => useCurrencyBalanceOfAddress(currency, wallet), options)
    const { data: currencyAmount } = result.current
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), { timeout })
    expect(currencyAmount).toBeDefined()
    expect(currencyAmount.currency.symbol).toBe('ETH')
    expect(currencyAmount.currency.isNative).toBeTruthy()
    expect(currencyAmount.greaterThan(0))
  })

  it('Check useCurrencyBalanceOfAddress with native on mainnet', async () => {
    const currency = NATIVE[chain.mainnet.id]
    const { result } = renderHook(() => useCurrencyBalanceOfAddress(currency, wallet), options)
    const { data: currencyAmount } = result.current
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), { timeout })
    expect(currencyAmount).toBeDefined()
    expect(currencyAmount.currency.symbol).toBe('ETH')
    expect(currencyAmount.currency.isNative).toBeTruthy()
    expect(currencyAmount.greaterThan(0))
  })
})
