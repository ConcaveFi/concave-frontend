import { Box, Flex, HStack, Image, Text } from '@concave/ui'
import { formatUnits } from 'ethers/lib/utils'
import { NFTPositionHeaderProps, useNFTLockedPositionState } from './useNFTPositionViewer'

export const NFTPositionHeader = (props: NFTPositionHeaderProps) => {
  const { period, redeemInDays, imgNameByPeriod, tokenId, active, toogleActive } =
    useNFTLockedPositionState(props)
  return (
    <Box
      pos="relative"
      overflow={'hidden'}
      maxHeight={'100px'}
      borderRadius="16px"
      boxShadow={'up'}
      width={{ lg: '700px', md: '520px' }}
    >
      <Flex direction="row" gap={4} alignItems="center" justify="center" m={2} position="relative">
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
                Stake Pool
              </Text>
              <Text fontSize="s" color="white" fontWeight="bold">
                {period}
              </Text>
            </Flex>
            <Box w={'45%'}>
              <Image sizes="100%" src={`/assets/marketplace/${imgNameByPeriod}`} alt="position" />
            </Box>
          </HStack>
        </Flex>

        <Flex flex={1} direction={'row'} gap={6} textAlign={'start'} ml="2">
          <Flex direction={'column'}>
            <Text color="text.low" fontSize="sm">
              Redeem In:
            </Text>
            <Text fontSize="md" fontWeight="bold">
              {redeemInDays}
            </Text>
          </Flex>
          <Flex direction={'column'} align="center">
            <Text color="text.low" fontSize="sm">
              Token ID:
            </Text>
            <Text fontSize="md" fontWeight="bold">
              {formatUnits(tokenId, 0)}
            </Text>
          </Flex>
        </Flex>

        <Flex width={'full'} height="50px" position={'absolute'} justify="end" align={'center'}>
          <Flex width={'80px'}>
            <Image
              userSelect={'none'}
              transition={'all'}
              transitionDuration="0.3s"
              transform={!active ? 'rotate(180deg)' : ''}
              height={'80px'}
              src={`/assets/liquidstaking/modal-arrow-logo.svg`}
              alt="arrow down logo"
              cursor={'pointer'}
              onClick={toogleActive}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
