import { CNV, CurrencyAmount, DAI, Token } from '@concave/core'
import { Signer } from 'ethers'
import { useQuery } from 'react-query'
import { chain, useSigner } from 'wagmi'
import { signPermitAllowed, signPermitAmount } from './permit'

const signPermit = async (
  signer: Signer,
  currencyAmount: CurrencyAmount<Token>,
  spenderAddress: string,
  deadline: number,
) => {
  const token = currencyAmount.currency
  if (token.equals(DAI[token.chainId])) {
    const { holder, spender, nonce, expiry, allowed, v, r, s } = await signPermitAllowed(
      signer,
      token.address,
      spenderAddress,
    )
    return { holder, spender, nonce, expiry, allowed, v, r, s }
  }

  const { owner, spender, value, v, r, s } = await signPermitAmount(
    signer,
    currencyAmount,
    spenderAddress,
    deadline,
  )
  return { owner, spender, value, deadline, v, r, s }
}

const PERMITTABLE_TOKENS = [CNV[chain.rinkeby.id], CNV[chain.mainnet.id]] //[DAI, CNV]

const isTokenPermissible = (token: Token) =>
  !!PERMITTABLE_TOKENS.find((t) => token.equals(t[token.chainId]))

export const usePermit = (
  currencyAmount: CurrencyAmount<Token>,
  spender: string,
  deadline: number = Date.now(),
) => {
  const { data: signer } = useSigner()
  const token = currencyAmount.currency
  // TODO: check contract for permit method
  const supportsPermit = isTokenPermissible(token)

  const {
    data: signedPermit,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    isIdle,
    refetch,
  } = useQuery(
    ['permit', token?.address, spender],
    () => signPermit(signer, currencyAmount, spender, deadline),
    {
      enabled: false,
      retry: 0,
    },
  )

  return {
    isSupported: supportsPermit,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    isIdle,
    signedPermit,
    signPermit: refetch,
  }
}
