import React from 'react'
import { Button, Image, Menu, MenuButton, MenuItem, MenuList } from '@concave/ui'
import { useAccount, useConnect } from 'wagmi'

// Takes a long hash string and truncates it.
function truncateHash(hash: string, length = 38): string {
  return hash.replace(hash.substring(6, length), '...')
}

const DisconnectButton = () => {
  const [account, disconnect] = useAccount()
  if (!account.data?.address) return null
  return (
    <Menu placement="bottom-end">
      <MenuButton as={Button}>{truncateHash(account.data?.address)}</MenuButton>
      <MenuList>
        <MenuItem onClick={disconnect}>Disconnect</MenuItem>
      </MenuList>
    </Menu>
  )
}

// const UnsuportedNetworkModal = ({ isOpen, onClose }) => (
//   <Modal isOpen={isOpen} onClose={onClose}>
//     <ModalOverlay />
//     <ModalContent>
//       <ModalContent>
//         <Text>
//           We currently only support {toOxfordComma(supportedNetworks.map((n) => n.chainName))}
//         </Text>
//         <Button onClick={() => switchNetwork()}>Swith to Ethereum</Button>
//       </ModalContent>
//     </ModalContent>
//   </Modal>
// )

const ConnectButton = ({ onError }: { onError: (e: Error) => void }) => {
  const [
    {
      data: { connectors },
    },
    connect,
  ] = useConnect()
  const injectedConnector = connectors.find((c) => c.id === 'injected')
  const walletConnectConnector = connectors.find((c) => c.id === 'walletConnect')
  return (
    <>
      <Menu placement="bottom-end">
        <MenuButton
          as={Button}
          variant="secondary"
          bgGradient="linear(to-tr, secondary.150, secondary.100)"
          size="large"
          w={200}
        >
          Connect your wallet
        </MenuButton>
        <MenuList>
          {injectedConnector && (
            <MenuItem
              icon={<Image maxWidth="20px" src="/images/logo-metamask.png" alt="MetaMask" />}
              onClick={() => connect(injectedConnector)}
            >
              MetaMask
            </MenuItem>
          )}
          <MenuItem
            icon={
              <Image maxWidth="20px" src="/images/logo-walletconnect.svg" alt="WalletConnect" />
            }
            onClick={() => connect(walletConnectConnector)}
          >
            WalletConnect
          </MenuItem>
        </MenuList>
        {/* <UnsuportedNetworkModal
          isOpen={state === 'unsupportedNetwork'}
          onClose={() => setState('idle')}
        /> */}
      </Menu>
    </>
  )
}

export function ConnectWallet(): JSX.Element {
  const [account] = useAccount()

  return account.data?.address ? (
    <DisconnectButton />
  ) : (
    <ConnectButton onError={(e) => console.log(e)} />
  )
}
