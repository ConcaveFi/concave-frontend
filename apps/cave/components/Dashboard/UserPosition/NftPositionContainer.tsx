import { Box, Flex, HStack, Image, Text } from '@concave/ui'

interface NftPositionContainerProps {
  stakeType: number
  redeemIn: number
}

const NftPositionContainer = (props: NftPositionContainerProps) => {
  const { stakeType, redeemIn } = props
  const redeemInDays = (redeemIn / (1000 * 3600 * 24)).toFixed()
  const periodToPoolParameter = {
    0: '360 Days',
    1: '180 Days',
    2: '90 Days',
    3: '45 Days',
  }
  const period = periodToPoolParameter[stakeType]
  return (
    <Box
      pos="relative"
      overflowY={'auto'}
      maxHeight={'100px'}
      borderRadius="16px"
      cursor="pointer"
      boxShadow={'up'}
      width={{ lg: '540px', md: '380px' }}
    >
      <Flex direction="row" gap={4} alignItems="center" justify="center" m={2}>
        <Flex
          pos="relative"
          w="177px"
          h="68px"
          overflowY={'hidden'}
          borderRadius="16px"
          boxShadow={'Down Medium'}
          px={2}
        >
          <HStack>
            <Flex w={'55%'} pl={2} direction="column">
              <Text fontSize="xs" color="text.low" fontWeight="medium">
                Stake Period
              </Text>
              <Text fontSize="s" color="white" fontWeight="bold">
                {period}
              </Text>
            </Flex>
            <Box w={'45%'}>
              <Image sizes="100%" src={'/assets/marketplace/6mposition.png'} alt="position" />
            </Box>
          </HStack>
        </Flex>

        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Redeem In:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {redeemInDays} Days
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default NftPositionContainer
