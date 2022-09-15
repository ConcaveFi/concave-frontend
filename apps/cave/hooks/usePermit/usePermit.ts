import { CNV_ADDRESS, CurrencyAmount, DAI, DAI_ADDRESS, Token } from '@concave/core'
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
      currencyAmount,
      spenderAddress,
      deadline,
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

/**
 * Our rinkeby DAI dont implements PermitAllowed
 */
const PERMITTABLE_TOKENS = [...Object.values(CNV_ADDRESS), DAI_ADDRESS[chain.mainnet.id]]
const isTokenPermissible = (token: Token) => {
  return !!PERMITTABLE_TOKENS.includes(token?.address)
}
export type UsePermiReturn = ReturnType<typeof usePermit>
export const usePermit = (
  currencyAmount: CurrencyAmount<Token>,
  spender: string,
  deadline: number,
) => {
  const { data: signer } = useSigner()
  const token = currencyAmount?.currency
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
    ['permit', token?.address, currencyAmount.quotient.toString(), spender],
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
    currencyAmount,
    signedPermit,
    signPermit: refetch,
  }
}
