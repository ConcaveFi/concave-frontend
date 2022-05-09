import { useDisclosure } from '@concave/ui'
import { ConnectWalletModal } from 'components/ConnectWallet'
import { DevelopGateway } from 'components/DevelopGateway'
import { UnsupportedNetworkModal } from 'components/UnsupportedNetworkModal'
import React, { createContext, useContext } from 'react'

type ModalsDisclosure = Record<
  string,
  {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }
>
const ModalsContext = createContext({} as ModalsDisclosure)

export const ModalsProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const connectModal = useDisclosure()

  return (
    <ModalsContext.Provider value={{ connectModal }}>
      <DevelopGateway />
      <UnsupportedNetworkModal />
      <ConnectWalletModal isOpen={connectModal.isOpen} onClose={connectModal.onClose} />
      {children}
    </ModalsContext.Provider>
  )
}

export const useModals = () => useContext(ModalsContext)

export default ModalsProvider
