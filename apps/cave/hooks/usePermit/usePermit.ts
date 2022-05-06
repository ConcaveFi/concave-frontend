import { Signer } from 'ethers'
import { useSigner } from 'wagmi'
import { CNV, DAI, Token } from '@concave/gemswap-sdk'
import { useQuery } from 'react-query'
import { signPermitAllowed, signPermitAmount } from './permit'

const signPermit = async (signer: Signer, token: Token, spenderAddress: string) => {
  if (token.equals(DAI[token.chainId])) {
    const { holder, spender, nonce, expiry, allowed, v, r, s } = await signPermitAllowed(
      signer,
      token.address,
      spenderAddress,
    )
    return [holder, spender, nonce, expiry, allowed, v, r, s]
  }

  const { owner, spender, value, deadline, v, r, s } = await signPermitAmount(
    signer,
    token.address,
    spenderAddress,
  )
  return [owner, spender, value, deadline, v, r, s]
}

const PERMITTABLE_TOKENS = [] //[DAI, CNV]

const isTokenPermissible = (token: Token) =>
  !!PERMITTABLE_TOKENS.find((t) => token.equals(t[token.chainId]))

export const usePermit = (token: Token, spender: string) => {
  const [{ data: signer }] = useSigner()

  // TODO: check contract for permit method
  const supportsPermit = isTokenPermissible(token)

  const {
    data: signedPermit,
    isLoading,
    isSuccess,
    isError,
    isIdle,
    refetch,
  } = useQuery(['permit', token.address, spender], () => signPermit(signer, token, spender), {
    enabled: false,
  })

  return {
    isSupported: supportsPermit,
    isLoading,
    isSuccess,
    isError,
    isIdle,
    signedPermit,
    signPermit: refetch,
  }
}
