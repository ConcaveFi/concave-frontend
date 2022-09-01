import { UnsupportedNetworkModal } from 'components/UnsupportedNetworkModal'
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { useAccount } from 'wagmi'
import create from 'zustand'
import { combine } from 'zustand/middleware'

const ConnectWalletModal: ComponentType<{ isOpen: boolean; onClose: () => void }> = dynamic(
  () => import('components/UserWallet/ConnectWalletModal').then((m) => m.ConnectWalletModal),
  { ssr: false },
)

const createModalStore = () =>
  create(
    combine({ isOpen: false }, (set) => ({
      onClose: () => set((s) => ({ isOpen: false })),
      onOpen: () => set((s) => ({ isOpen: true })),
    })),
  )

export const useConnectModal = createModalStore()

let shouldFetchConnectWalletModal = false
export const Modals = () => {
  const { isReconnecting, isDisconnected } = useAccount()
  const connectModal = useConnectModal()

  /* lazy load ConnectWalletModal only if couldn't restore a session */
  shouldFetchConnectWalletModal =
    shouldFetchConnectWalletModal || (!isReconnecting && isDisconnected)

  return (
    <>
      <UnsupportedNetworkModal />
      {shouldFetchConnectWalletModal && (
        <ConnectWalletModal isOpen={connectModal.isOpen} onClose={connectModal.onClose} />
      )}
    </>
  )
}
