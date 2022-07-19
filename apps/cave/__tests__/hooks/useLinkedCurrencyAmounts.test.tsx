import { ChainId, CNV, Currency, CurrencyAmount, DAI, Token, WETH9 } from '@concave/core'
import { act, renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'

import { useLinkedCurrencyAmounts } from 'components/CurrencyAmountField'
import { WagmiProvider } from 'contexts/WagmiContext'
import { toAmount } from 'utils/toAmount'

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

describe('useLinkedCurrencyAmounts', () => {
  it('derives fields on change', async () => {
    const currencies = [CNV[ChainId.ETHEREUM], DAI[ChainId.ETHEREUM]] as [Token, Token]

    const fakeDerivedAmount = toAmount(50, currencies[1])
    const onDerive = jest
      .fn<CurrencyAmount<Currency>, [CurrencyAmount<Currency>, [Currency, Currency]]>()
      .mockReturnValue(fakeDerivedAmount)

    const amount0 = toAmount(100, currencies[0])

    mockRouter.setCurrentUrl(
      `/?chainId=${ChainId.ETHEREUM}&currency0=${currencies[0].address}&currency1=${currencies[1].address}`,
    )

    const { result } = renderHook(() => useLinkedCurrencyAmounts({ onDerive }), {
      wrapper: createWrapper(),
    })

    // wait react query initialize query currencies
    await waitFor(() => {
      expect(result.current.currencies).toStrictEqual(currencies)
    })

    // expect amounts to be zero initially
    expect(result.current.amounts).toStrictEqual([
      toAmount(0, currencies[0]),
      toAmount(0, currencies[1]),
    ])

    // change field 0 and expect field 1 to be derived
    act(() => {
      result.current.onChangeField(0)(amount0)
    })

    expect(result.current.amounts).toStrictEqual([amount0, fakeDerivedAmount])
    expect(onDerive).toBeCalledTimes(1)
    expect(onDerive).toBeCalledWith(amount0, currencies)
  })

  it('change field currency', async () => {
    const initialCurrencies = [CNV[ChainId.ETHEREUM], DAI[ChainId.ETHEREUM]] as [Token, Token]

    mockRouter.setCurrentUrl(
      `/?chainId=${ChainId.ETHEREUM}&currency0=${initialCurrencies[0].address}&currency1=${initialCurrencies[1].address}`,
    )

    // onDerive returning undefined should not change the amount
    const { result } = renderHook(() => useLinkedCurrencyAmounts({ onDerive: () => undefined }), {
      wrapper: createWrapper(),
    })

    // wait react query initialize query currencies
    await waitFor(() => {
      expect(result.current.currencies).toStrictEqual(initialCurrencies) // checks initial currencies state
    })

    const field2Amount = toAmount(100, initialCurrencies[1])
    // change field currency
    act(() => {
      result.current.onChangeField(1)(field2Amount) // sets a value to the second field, just to check it won't be affected
      result.current.onChangeField(0)(toAmount(0, WETH9[ChainId.ETHEREUM]))
    })

    await waitFor(() => {
      expect(result.current.currencies).toStrictEqual([
        WETH9[ChainId.ETHEREUM],
        DAI[ChainId.ETHEREUM],
      ]) // checks currencies state really changed
    })

    expect(result.current.amounts).toStrictEqual([
      toAmount(0, WETH9[ChainId.ETHEREUM]),
      field2Amount,
    ])
  })

  it('switch field currencies if try setting the same', async () => {
    const initialCurrencies = [CNV[ChainId.ETHEREUM], DAI[ChainId.ETHEREUM]] as [Token, Token]

    mockRouter.setCurrentUrl(
      `/?chainId=${ChainId.ETHEREUM}&currency0=${initialCurrencies[0].address}&currency1=${initialCurrencies[1].address}`,
    )

    // onDerive returning undefined should not change the amount
    const { result } = renderHook(() => useLinkedCurrencyAmounts({ onDerive: () => undefined }), {
      wrapper: createWrapper(),
    })

    // wait react query initialize query currencies
    await waitFor(() => {
      expect(result.current.currencies).toStrictEqual(initialCurrencies) // checks initial currencies state
    })

    // set field 0 with the same currency as field 1
    act(() => {
      result.current.onChangeField(0)(toAmount(0, initialCurrencies[1]))
    })

    await waitFor(() => {
      expect(result.current.currencies).toStrictEqual([initialCurrencies[1], initialCurrencies[0]]) // checks currencies order inverted
    })
  })
})
