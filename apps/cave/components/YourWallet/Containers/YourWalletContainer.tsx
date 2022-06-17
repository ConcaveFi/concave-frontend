import { CloseIcon } from '@concave/icons'
import { Flex, Text } from '@concave/ui'

export default function YourWalletContainer({ value, onClose }) {
  return (
    <Flex justify="space-between">
      <Flex direction={'column'} align={'start'} justify="center" p={4}>
        <Text fontWeight={'bold'} textColor={'text.low'} fontSize="20px">
          Your Wallet
        </Text>
        <Text fontWeight={'bold'} fontSize={'3xl'}>
          {value}
        </Text>
      </Flex>
      <Flex align={'start'} height={'full'}>
        <CloseIcon color={'text.low'} cursor="pointer" onClick={onClose} />
      </Flex>
    </Flex>
  )
}
