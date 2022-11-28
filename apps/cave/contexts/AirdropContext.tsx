import { useDisclosure } from '@concave/ui'
import { getAirdropClaimableAmount, getProof, isWhitelisted } from 'components/Airdrop/airdrop'
import { createContext, useContext } from 'react'
import { useAccount } from 'wagmi'

interface AirdropContextProps {
  isOpen: boolean
  onOpen: VoidFunction
  onClose: VoidFunction
  whiteListed: boolean
  redeemable: number
  proof: string[]
}
const AirdropContext = createContext<AirdropContextProps>({
  isOpen: false,
  whiteListed: false,
  onClose: () => {},
  onOpen: () => {},
  redeemable: 0,
  proof: [],
})

export function AirdropProvider({ children }) {
  const airdropModal = useDisclosure()
  const { address } = useAccount()

  const proof = getProof(address)
  const whiteListed = isWhitelisted(address)
  const redeemable = getAirdropClaimableAmount(address)
  return (
    <AirdropContext.Provider
      value={{
        redeemable,
        onOpen: airdropModal.onOpen,
        onClose: airdropModal.onClose,
        isOpen: airdropModal.isOpen,
        whiteListed,
        proof,
      }}
    >
      {children}
    </AirdropContext.Provider>
  )
}
export const useAirdrop = () => useContext(AirdropContext)
