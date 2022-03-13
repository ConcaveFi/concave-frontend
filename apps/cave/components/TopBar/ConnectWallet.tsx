import React from 'react'
import { Button, Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useAccount, useConnect } from 'wagmi'

import { useIsMounted } from 'hooks/useIsMounted'

const miniAddress = (address) =>
  `${address.substr(0, 6)}...${address.substr(address.length - 6, address.length)}`

const DisconnectButton = () => {
  const [{ data, loading }, disconnect] = useAccount({ fetchEns: false })
  return (
    <Menu placement="bottom-end">
      <MenuButton as={Button} isLoading={loading} borderRadius="xl" variant="secondary">
        {data.address && miniAddress(data.address)}
      </MenuButton>
      <MenuList bg="black.100" borderRadius="xl" px={1}>
        <MenuItem borderRadius="lg" onClick={disconnect}>
          Disconnect
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

const ConnectButton = ({ onError }: { onError: (e: Error) => void }) => {
  const [{ data, error }, connect] = useConnect()
  const isMounted = useIsMounted()
  return (
    <>
      <Menu placement="bottom-end" isLazy>
        <MenuButton
          as={Button}
          variant="secondary"
          bgGradient="linear(to-tr, secondary.150, secondary.100)"
          size="large"
          w={200}
        >
          Connect wallet
        </MenuButton>
        <MenuList bg="black.100" borderRadius="xl" minW="min" px={1}>
          {isMounted &&
            data.connectors.map((connector) => {
              if (!connector.ready) return null
              // change image from using connector id to something else, injected can be metamask, coinbase, brave etc
              return (
                <MenuItem
                  borderRadius="xl"
                  icon={<Image maxWidth="20px" src={`/connectors/${connector.id}.png`} alt="" />}
                  key={connector.id}
                  onClick={() => connect(connector)}
                >
                  {connector.name}
                </MenuItem>
              )
            })}
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
  const [{ data }] = useConnect()

  return data.connected ? <DisconnectButton /> : <ConnectButton onError={(e) => console.log(e)} />
}
