import { Flex, Grid, GridItem, Image, Text } from '@concave/ui'
import { format } from 'date-fns'
import { truncateNumber } from 'utils/truncateNumber'
import { NFTPositionHeaderProps, useNFTLockedPositionState } from './useNFTPositionViewer'

export const NFTPositionHeader = (props: NFTPositionHeaderProps) => {
  const { period, redeemInDays, imgNameByPeriod, redeemDate, active, toogleActive, tokenId } =
    useNFTLockedPositionState(props)
  return (
    <Grid w={'full'} p={2} boxShadow={'up'} borderRadius={'2xl'} templateColumns="repeat(7,1fr)">
      <GridItem
        colSpan={2}
        display={'flex'}
        justifyContent={'center'}
        px={3}
        boxShadow={'Down Medium'}
        borderRadius={'2xl'}
      >
        <Flex direction="column" maxW={'90px'} h="full" justifyContent={'center'} w="full">
          <Text fontSize="xs" color="text.low" fontWeight="medium">
            Stake Pool
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
      </GridItem>

      <GridItem
        display={'flex'}
        flexDir={'column'}
        justifyContent={'start'}
        colSpan={1}
        h="full"
        position={'relative'}
        lineHeight="18px"
        fontWeight={'bold'}
        mt={2}
      >
        <Text color="text.low" fontSize="sm">
          Redeem Date
        </Text>
        <Text fontSize="md">{format(redeemDate, `MM/dd/yy`)}</Text>
        <Flex justify={'center'} align="end" gap={1}>
          <Text fontSize="sm" textColor="text.low">
            In:
          </Text>
          <Text fontSize="sm" fontWeight={'bold'} textColor="text.accent">
            {redeemInDays}
          </Text>
        </Flex>
      </GridItem>
      <GridItem
        lineHeight="18px"
        fontWeight={'bold'}
        mt={2}
        display={'flex'}
        flexDir={'column'}
        justifyContent={'start'}
        colSpan={1}
      >
        <Text color="text.low" fontSize="sm">
          Token Id:
        </Text>
        <Text fontSize="md" fontWeight="bold">
          {+tokenId?.toString()}
        </Text>
      </GridItem>
      <GridItem display={'flex'} colSpan={3} h="full" justifyContent={'space-around'}>
        <Image
          ml={'auto'}
          userSelect={'none'}
          width={'80px'}
          transition={'all'}
          transitionDuration="0.3s"
          transform={!active ? 'rotate(180deg)' : ''}
          maxH={'68.8px'}
          src={`/assets/liquidstaking/modal-arrow-logo.svg`}
          alt="arrow down logo"
          cursor={'pointer'}
          onClick={toogleActive}
        />
      </GridItem>
    </Grid>
  )
}
