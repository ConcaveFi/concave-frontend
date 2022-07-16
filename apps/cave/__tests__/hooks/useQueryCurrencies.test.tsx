import { ChainId, CNV, Currency, DAI, Ether, USDC, WNATIVE } from '@concave/core'
import { act, renderHook, waitFor } from '@testing-library/react'
import { useQueryCurrencies } from 'components/AMM/hooks/useQueryCurrencies'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'

import { WagmiProvider } from 'contexts/WagmiContext'
import mockRouter from 'next-router-mock'

jest.mock('next/router', () => require('next-router-mock'))

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  // eslint-disable-next-line react/display-name
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider>{children}</WagmiProvider>
    </QueryClientProvider>
  )
}

setLogger({
  log: console.log,
  warn: console.warn,
  // ✅ no more errors on the console
  error: () => {},
})

describe('useQueryCurrencies', () => {
  it('defaults when there is no query params', async () => {
    const defaultCurrencies = { [ChainId.ETHEREUM]: [CNV[1], DAI[1]] as [Currency, Currency] }
    const { result } = renderHook(() => useQueryCurrencies(defaultCurrencies), {
      wrapper: createWrapper(),
    })

    expect(result.current.currencies).toBe(defaultCurrencies[ChainId.ETHEREUM])
  })

  it('no defaults and no query params', async () => {
    const { result } = renderHook(() => useQueryCurrencies(), { wrapper: createWrapper() })
    expect(result.current.currencies).toStrictEqual([undefined, undefined])
  })

  describe('returns correct query param tokens', () => {
    it('both are addresses', async () => {
      const chainId = ChainId.ETHEREUM
      const currency0 = USDC[chainId]
      const currency1 = WNATIVE[chainId]

      mockRouter.setCurrentUrl(`/?currency0=${currency0.address}&currency1=${currency1.address}`)

      const { result } = renderHook(() => useQueryCurrencies(), { wrapper: createWrapper() })

      await waitFor(() => expect(result.current.isLoading).toBeFalsy())
      expect(result.current.currencies).toStrictEqual([currency0, currency1])
    })

    it('one address and one native symbol', async () => {
      const chainId = ChainId.ETHEREUM
      const currency0 = USDC[chainId]
      const currency1 = Ether.onChain(chainId)

      mockRouter.setCurrentUrl(`/?currency0=${currency0.address}&currency1=${currency1.symbol}`)

      const { result } = renderHook(() => useQueryCurrencies(), { wrapper: createWrapper() })

      await waitFor(() => expect(result.current.isLoading).toBeFalsy())
      expect(result.current.currencies).toStrictEqual([currency0, currency1])
    })

    it('uses right chain', async () => {
      const chainId = ChainId.RINKEBY
      const currency0 = DAI[chainId]
      const currency1 = CNV[chainId]

      mockRouter.setCurrentUrl(
        `/?currency0=${currency0.address}&currency1=${currency1.address}&chainId=${chainId}`,
      )

      const { result } = renderHook(() => useQueryCurrencies(), { wrapper: createWrapper() })

      await waitFor(() => expect(result.current.isLoading).toBeFalsy())
      expect(result.current.currencies).toStrictEqual([currency0, currency1])
    })

    it(`don't crash on random input`, async () => {
      const chainId = ChainId.ETHEREUM
      const currency0 = DAI[chainId]
      const randomValue = 'dasd2rdas'

      mockRouter.setCurrentUrl(`/?currency0=${currency0.address}&currency1=${randomValue}`)

      const { result } = renderHook(() => useQueryCurrencies(), { wrapper: createWrapper() })

      await waitFor(() => expect(result.current.isLoading).toBeFalsy())
      expect(result.current.currencies).toStrictEqual([currency0, undefined])
    })
  })

  describe('onChangeCurrencies', () => {
    it('correctly updates query params and state', async () => {
      const chainId = ChainId.ETHEREUM
      const currency0 = USDC[chainId]
      const currency1 = WNATIVE[chainId]

      mockRouter.setCurrentUrl(`/`) // reset from previous test

      const { result } = renderHook(() => useQueryCurrencies(), { wrapper: createWrapper() })
      await waitFor(() => expect(result.current.isLoading).toBeFalsy())
      expect(result.current.currencies).toStrictEqual([undefined, undefined])

      act(() => {
        result.current.onChangeCurrencies([currency0, currency1])
      })
      await waitFor(() => expect(result.current.isLoading).toBeFalsy())

      expect(mockRouter.query).toStrictEqual({
        currency0: currency0.address,
        currency1: currency1.address,
        chainId,
      })
      expect(result.current.currencies).toStrictEqual([currency0, currency1])
    })
  })
})
