import { CloseIcon } from '@concave/icons'
import { Flex, Text } from '@concave/ui'

export default function YourWalletContainer({ value, onClose }) {
  return (
    <Flex height="52%" justify="space-between">
      <Flex ml={8} direction={'column'} align={'start'} justify="center">
        <Text fontWeight={'bold'} textColor={'text.low'} fontSize="20px">
          Your Wallet
        </Text>
        <Text fontWeight={'bold'} fontSize={'3xl'}>
          {value}
        </Text>
      </Flex>
      <Flex align={'start'} height={'full'} mt={3} mr={3}>
        <CloseIcon color={'text.low'} cursor="pointer" onClick={onClose} />
      </Flex>
    </Flex>
  )
}
