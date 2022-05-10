import { AVERAGE_BLOCK_TIME } from 'constants/blockchain'
import { BigNumber, Contract } from 'ethers'
import { Currency, CurrencyAmount, NATIVE } from '@concave/gemswap-sdk'
import { useQuery } from 'react-query'
import { erc20ABI, useAccount, useSigner } from 'wagmi'

export const useCurrencyBalance = (currency: Currency, { watch = false } = {}) => {
  const [{ data: account }] = useAccount()
  const [{ data: signer }] = useSigner()
  const chainId = currency?.chainId
  return useQuery(
    ['balance', currency?.symbol, currency?.wrapped.address, account?.address, chainId],
    async () => {
      if (currency.isNative) {
        const b = (await signer.getBalance()) as BigNumber
        return CurrencyAmount.fromRawAmount(NATIVE[chainId], b.toString())
      }

      const contract = new Contract(currency.wrapped.address, erc20ABI, signer)
      const b = (await contract.balanceOf(account.address)) as BigNumber
      return CurrencyAmount.fromRawAmount(currency, b.toString())
    },
    {
      refetchInterval: watch ? AVERAGE_BLOCK_TIME[chainId] : false,
      enabled: !!currency && !!chainId && !!account?.address && !!signer,
      notifyOnChangeProps: 'tracked',
      retry: false,
    },
  )
}

export type UseCurrencyBalanceData = ReturnType<typeof useCurrencyBalance>
