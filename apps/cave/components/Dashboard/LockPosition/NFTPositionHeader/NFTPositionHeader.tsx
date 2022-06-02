import { Flex, Grid, GridItem, Image, Text } from '@concave/ui'
import { format } from 'date-fns'
import { NFTPositionHeaderProps, useNFTLockedPositionState } from './useNFTPositionViewer'

export const NFTPositionHeader = (props: NFTPositionHeaderProps) => {
  const { period, redeemInDays, imgNameByPeriod, redeemDate, active, toogleActive } =
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

      <GridItem display={'flex'} flexDir={'column'} justifyContent={'center'} colSpan={1}>
        <Text color="text.low" fontSize="sm">
          Redeem In:
        </Text>
        <Text fontSize="md" fontWeight="bold">
          {redeemInDays}
        </Text>
      </GridItem>

      <GridItem display={'flex'} flexDir={'column'} justifyContent={'center'} colSpan={1} h="auto">
        <Text color="text.low" fontSize="sm">
          Redeem Date
        </Text>
        <Text fontSize="md" fontWeight="bold">
          {format(redeemDate, `MM.dd.yy`)}
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
          //height={'80px'}
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
