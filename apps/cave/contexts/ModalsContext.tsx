import { useDisclosure } from '@concave/ui'
import { ConnectWalletModal } from 'components/ConnectWallet'
// import { DevelopGateway } from 'components/DevelopGateway'
import { UnsupportedNetworkModal } from 'components/UnsupportedNetworkModal'
import React, { ComponentType, createContext, useContext } from 'react'
import { useAccount, useConnect } from 'wagmi'
import dynamic from 'next/dynamic'

type ModalsDisclosure = Record<
  string,
  {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }
>
const ModalsContext = createContext({} as ModalsDisclosure)

const ConnectWalletModal: ComponentType<{ isOpen: boolean; onClose: () => void }> = dynamic(
  () => import('components/UserWallet/ConnectWalletModal').then((m) => m.ConnectWalletModal),
  { ssr: false },
)

let shouldFetchConnectWalletModal = false
export const ModalsProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const { isReconnecting, isDisconnected } = useAccount()
  const connectModal = useDisclosure()

  /* lazy load ConnectWalletModal only if couldn't restore a session */
  shouldFetchConnectWalletModal =
    shouldFetchConnectWalletModal || (!isReconnecting && isDisconnected)

  return (
    <ModalsContext.Provider value={{ connectModal }}>
      {/* <DevelopGateway /> */}
      <UnsupportedNetworkModal />
      {shouldFetchConnectWalletModal && (
        <ConnectWalletModal isOpen={connectModal.isOpen} onClose={connectModal.onClose} />
      )}
      {children}
    </ModalsContext.Provider>
  )
}

export const useModals = () => useContext(ModalsContext)

export default ModalsProvider
