import { Flex, Image, Text } from '@concave/ui'
import { NFTPositionHeaderProps, useNFTLockedPositionState } from './hooks/useNFTPositionViewer'

export const NFTPositionHeader = (props: NFTPositionHeaderProps) => {
  const { period, redeemInDays, imgNameByPeriod, redeemDate, active, toogleActive, tokenId } =
    useNFTLockedPositionState(props)
  const { stakingPosition } = props
  const readyForReedem = stakingPosition.maturity <= Date.now() / 1000

  return (
    <Flex
      width={'full'}
      boxShadow={'up'}
      direction={{ base: 'column', md: 'row' }}
      borderRadius={'2xl'}
      height={{ md: '84px', base: '150px' }}
      p={2}
    >
      <Flex
        display={'flex'}
        justify={{ base: 'space-between', md: '' }}
        px={3}
        boxShadow={'Down Medium'}
        borderRadius={'2xl'}
        minW="190px"
      >
        <Flex direction="column" maxW={'90px'} h="full" justifyContent={'center'} w="full">
          <Text fontSize="xs" color="text.low" fontWeight="medium">
            Stake pool
          </Text>
          <Text fontSize="s" color="white" whiteSpace={'nowrap'} fontWeight="bold">
            {period}
          </Text>
        </Flex>
        <Image
          w="auto"
          maxH={'68.8px'}
          src={`/assets/marketplace/${imgNameByPeriod}`}
          alt="position"
        />
      </Flex>
      <Flex height="full" flex={1} align={'start'} gap={4} px="4">
        <Flex
          display={'flex'}
          flexDir={'column'}
          justifyContent={'start'}
          align="start"
          h="full"
          position={'relative'}
          lineHeight="18px"
          fontWeight={'bold'}
          mt={2}
        >
          <Text color="text.low" fontSize="sm">
            Redeem date
          </Text>
          {redeemInDays ? (
            <>
              <Text fontSize="md">
                {redeemDate.toString().slice(11, 15) === '1969'
                  ? '-'
                  : redeemDate.toString().slice(4, 16)}
              </Text>
              <Flex justify={'center'} align="end" gap={1}>
                {!readyForReedem && (
                  <Text fontSize="sm" textColor="text.low">
                    In:
                  </Text>
                )}
                <Text fontSize="sm" fontWeight={'bold'} textColor="text.accent">
                  {!readyForReedem && redeemInDays}
                  {readyForReedem && 'redeemable'}
                </Text>
              </Flex>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </Flex>
        <Flex
          lineHeight="18px"
          fontWeight={'bold'}
          mt={2}
          display={'flex'}
          flexDir={'column'}
          justifyContent={'start'}
        >
          <Text color="text.low" fontSize="sm">
            Token id:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {+tokenId?.toString()}
          </Text>
        </Flex>
        <Flex flex={1} justify="end">
          <Image
            userSelect={'none'}
            draggable={'false'}
            width={'80px'}
            transition={'all'}
            transitionDuration="0.3s"
            transform={active ? 'rotate(180deg)' : ''}
            maxH={'68.8px'}
            src={`/assets/liquidstaking/modal-arrow-logo.svg`}
            alt="arrow down logo"
            cursor={'pointer'}
            onClick={toogleActive}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
