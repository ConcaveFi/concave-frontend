import { Box, Flex, gradientBorder, Text } from '@concave/ui'
import { numberMask } from 'utils/numberMask'

export const VaultActivityPosition = () => {
  return (
    <Flex
      w={'full'}
      rounded="2xl"
      sx={{ ...gradientBorder({ borderWidth: 2, variant: 'secondary' }) }}
      height="70px"
      fontSize={'18px'}
      fontWeight="bold"
      align={'center'}
      px={10}
    >
      <Text minW={'220px'} textAlign="start">
        Farm RAY-USDC
      </Text>
      <Flex direction={'column'}>
        <Text color={'text.small'}>Sold contract</Text>
        <Text color={'text.small'} fontSize="sm">
          {parseInt((Math.random() * 20).toString())} days ago
        </Text>
      </Flex>
      <Box flex={1} />
      <Flex direction={'column'} textAlign={'end'}>
        <Text color={'text.small'}>0-USDC 7/29 WETH PUT</Text>
        <Text color={'text.small'}>Atrike 1250</Text>
      </Flex>
      <Flex minW={'220px'} align={'end'} color={'Green Candle'} direction="column">
        <Text>+{numberMask(Math.random() * 1000000)}</Text>
        <Text fontSize={'sm'}>+{numberMask(Math.random() * 1000000)}</Text>
      </Flex>
    </Flex>
  )
}
