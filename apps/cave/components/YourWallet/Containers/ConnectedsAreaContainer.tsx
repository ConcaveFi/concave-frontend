import { Avatar, Button, Flex, Text, useDisclosure } from '@concave/ui'
import { ChangeNetworkModal } from 'components/ChangeNetworkModal'
import { useNetwork } from 'wagmi'

export default function ConnectedAreasContainer() {
  const { chain } = useNetwork()
  const {
    isOpen: isChangeNetworkOpen,
    onClose: onCloseChangeNetwork,
    onOpen: onOpenChangeNetwork,
  } = useDisclosure()
  return (
    <>
      <Flex
        p={2}
        pl={3}
        justify="space-between"
        rounded="3xl"
        shadow="down"
        w="100%"
        align="center"
        gap={5}
      >
        <Text fontSize="sm" fontWeight="bold" color="text.low">
          Change Network
        </Text>
        <Button onClick={onOpenChangeNetwork} p={2} rounded="3xl" shadow="Up Big" h="40px">
          <Avatar
            shadow="up"
            w="25px"
            h="25px"
            src={
              chain.id == 1
                ? 'https://raw.githubusercontent.com/ConcaveFi/assets/master/blockchains/ethereum/info/logo.png'
                : 'https://raw.githubusercontent.com/ConcaveFi/assets/master/blockchains/arbitrum/info/logo.png'
            }
          />
          <Text mx={2} fontWeight={'bold'} fontSize={{ base: '14px', sm: 'lg' }}>
            {chain?.name}
          </Text>
        </Button>
      </Flex>
      <ChangeNetworkModal isOpen={isChangeNetworkOpen} onClose={onCloseChangeNetwork} />
    </>
  )
}
