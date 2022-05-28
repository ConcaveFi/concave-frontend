import { Token } from '@concave/gemswap-sdk'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount, useBalance } from 'wagmi'

// mainnnet
// bbtCNV 0x0000000012a0592C154D552C410030E724b2eA00
// aCNV 0x6ff0106d34feee8a8acf2e7b9168480f86b82e2f

// rinkeby
// bbtCNV 0x98501987a763ccE92539CB4650969ddA16b33454

export default function useVestedTokens({ chainId }: { chainId: number }) {
  const networkId = useCurrentSupportedNetworkId()
  const [{ data: account }] = useAccount()
  const [{ data: bbtCNVData }] = useBalance({
    addressOrName: account?.address,
    token: bbtCNV_ADDRESS[networkId],
  })
  const [{ data: aCNVData }] = useBalance({
    addressOrName: account?.address,
    token: aCNV_ADDRESS[networkId],
  })

  const pCNVData = false
  //   const [{ data: pCNVData }] = useBalance({
  //     addressOrName: account?.address,
  //     token: pCNV_ADDRESS[networkId],
  //   })
  return {
    aCNVData: networkId == 1 && aCNVData,
    pCNVData,
    bbtCNVData,
  }
}

export const bbtCNV_ADDRESS = {
  1: '0x0000000012a0592C154D552C410030E724b2eA00',
  4: '0x98501987a763ccE92539CB4650969ddA16b33454',
}
export const aCNV_ADDRESS = {
  1: '0x6ff0106d34feee8a8acf2e7b9168480f86b82e2f',
  4: '0',
}

export const pCNV_ADDRESS = {
  1: '0',
  4: '0',
}
