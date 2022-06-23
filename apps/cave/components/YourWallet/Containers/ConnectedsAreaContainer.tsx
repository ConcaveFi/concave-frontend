import { Avatar, Button, Flex, Text, useDisclosure } from '@concave/ui'
import { ChangeNetworkModal } from 'components/ChangeNetworkModal'
import { ConnectWalletModal } from 'components/ConnectWallet'
import { useConnect, useNetwork } from 'wagmi'

export default function ConnectedAreasContainer() {
  const { activeConnector } = useConnect()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { activeChain } = useNetwork()
  const {
    isOpen: isChangeNetworkOpen,
    onClose: onCloseChangeNetwork,
    onOpen: onOpenChangeNetwork,
  } = useDisclosure()
  return (
    <Flex direction={'column'} gap={4}>
      <Flex
        rounded="3xl"
        height={'60px'}
        shadow="down"
        align={'center'}
        justify="space-between"
        gap={8}
      >
        <Text ml={4} fontSize="12px" fontWeight="700" textColor={'text.low'}>
          Connected with {activeConnector?.name}
        </Text>
        <Button
          mr={2}
          rounded={'3xl'}
          onClick={onOpen}
          _focus={{}}
          px="3"
          height="40px"
          boxShadow="Up Big"
        >
          <Text my={'auto'} mx="auto" fontWeight={'bold'} fontSize={{ base: '14px', sm: 'lg' }}>
            Change
          </Text>
        </Button>
      </Flex>
      <Flex justify="space-between" rounded="3xl" height={'60px'} shadow="down" align={'center'}>
        <Text fontSize="12px" ml={4} fontWeight="700" textColor={'text.low'}>
          Change Network
        </Text>
        <Button
          onClick={onOpenChangeNetwork}
          rounded={'3xl'}
          _focus={{}}
          height="40px"
          boxShadow="Up Big"
          mr={2}
        >
          <Flex justify={'end'} flex={1} gap={2}>
            <Avatar
              shadow={'0px 0px 20px 0px #111'}
              ml={3}
              width="25px"
              height={'25px'}
              mt={'2px'}
              src={
                activeChain.id == 1
                  ? 'https://images-ext-2.discordapp.net/external/6xv9IUyAOWmlbQE8LfBQNr5pBjHIADMgOmbHWKMbutg/https/raw.githubusercontent.com/ConcaveFi/assets/master/blockchains/ethereum/info/logo.png'
                  : 'https://raw.githubusercontent.com/ConcaveFi/assets/master/blockchains/arbitrum/info/logo.png'
              }
            />
            <Text my={'auto'} mr={4} fontWeight={'bold'} fontSize={{ base: '14px', sm: 'lg' }}>
              {activeChain?.name}
            </Text>
          </Flex>
        </Button>
        <ChangeNetworkModal isOpen={isChangeNetworkOpen} onClose={onCloseChangeNetwork} />
        <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Flex>
  )
}
