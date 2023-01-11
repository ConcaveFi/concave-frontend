import { useDisclosure } from '@concave/ui'
import { AidropSeasonProps, useAirdropSeason } from 'hooks/useAirdropSeason'
import { createContext, useContext } from 'react'

interface AirdropContextProps {
  isOpen: boolean
  onOpen: VoidFunction
  onClose: VoidFunction
  Q4: AidropSeasonProps
  special: AidropSeasonProps
}
const AirdropContext = createContext<AirdropContextProps>({
  special: { proof: [''], redeemable: 0, whiteListed: false },
  Q4: { proof: [''], redeemable: 0, whiteListed: false },
  onClose: () => {},
  onOpen: () => {},
  isOpen: false,
})

export function AirdropProvider({ children }) {
  const airdropModal = useDisclosure()

  const special = useAirdropSeason('special')
  const Q4 = useAirdropSeason('Q4')
  return (
    <AirdropContext.Provider
      value={{
        onOpen: airdropModal.onOpen,
        onClose: airdropModal.onClose,
        isOpen: airdropModal.isOpen,
        special,
        Q4,
      }}
    >
      {children}
    </AirdropContext.Provider>
  )
}
export const useAirdrop = () => useContext(AirdropContext)
