import { useDisclosure } from '@concave/ui'
import { createContext, useContext } from 'react'

interface AirdropContextProps {
  isOpen: boolean
  onOpen: VoidFunction
  onClose: VoidFunction
}
const AirdropContext = createContext<AirdropContextProps>({
  onClose: () => {},
  onOpen: () => {},
  isOpen: false,
})

export function AirdropProvider({ children }) {
  const airdropModal = useDisclosure()
  return (
    <AirdropContext.Provider
      value={{
        onOpen: airdropModal.onOpen,
        onClose: airdropModal.onClose,
        isOpen: airdropModal.isOpen,
      }}
    >
      {children}
    </AirdropContext.Provider>
  )
}
export const useAirdrop = () => useContext(AirdropContext)
