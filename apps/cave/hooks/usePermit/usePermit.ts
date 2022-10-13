import { CNV_ADDRESS, CurrencyAmount, Token } from '@concave/core'
import { Provider } from '@ethersproject/abstract-provider'
import { Contract, Signer } from 'ethers'
import { useQuery } from 'react-query'
import { useSigner } from 'wagmi'
import { signPermitAllowed, signPermitAmount } from './permit'

const PERMIT_TYPEHASH = '0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9'
const DAI_TYPEHASH = '0xea2aa0a1be11a07ed86d755c93467f4f82362b452371d1ba94d1715123511acb'

const fetchPermitTypeHash = async (tokenAddress: string, provider: Provider) => {
  const tokenContract = new Contract(
    tokenAddress,
    ['function PERMIT_TYPEHASH() external view returns (bytes32)'],
    provider,
  )
  const [type] = await Promise.all([tokenContract.PERMIT_TYPEHASH()])
  return { type }
}

const signPermit = async (
  signer: Signer,
  currencyAmount: CurrencyAmount<Token>,
  spenderAddress: string,
  deadline: number,
) => {
  const { type } = await fetchPermitTypeHash(currencyAmount.currency.address, signer.provider)
  if (type === DAI_TYPEHASH) {
    const { holder, spender, nonce, expiry, allowed, v, r, s } = await signPermitAllowed(
      signer,
      currencyAmount,
      spenderAddress,
      deadline,
    )
    return { holder, spender, nonce, expiry, allowed, v, r, s }
  }
  if (type === PERMIT_TYPEHASH) {
    const { owner, spender, value, v, r, s } = await signPermitAmount(
      signer,
      currencyAmount,
      spenderAddress,
      deadline,
    )
    return { owner, spender, value, deadline, v, r, s }
  }
  throw 'Unsuportable'
}

/**
 * Our rinkeby DAI dont implements PermitAllowed
 */
const PERMITTABLE_TOKENS = [
  ...Object.values(CNV_ADDRESS),
  // DAI_ADDRESS[chain.mainnet.id]
]
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
