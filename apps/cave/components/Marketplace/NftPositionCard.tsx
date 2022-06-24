import { MarketItemInfo } from '@concave/marketplace'
import { Box, Collapse, Flex, HStack, Image, Text } from '@concave/ui'
import { formatDistanceToNowStrict } from 'date-fns'
import { useState } from 'react'
import { formatFixed } from 'utils/formatFixed'
import { BidButton } from './Bid'
import { BuyButton } from './Buy'

interface NftPositionBoxProps {
  marketInfo: MarketItemInfo
  active?: boolean
  onClick?: () => void
}

const NftPositionBox = (props: NftPositionBoxProps) => {
  const { discount, position } = props.marketInfo
  const active = props.active
  const redeemInDays = formatDistanceToNowStrict(position.maturity * 1000, { unit: 'day' })

  const stakeImage = {
    0: '12mposition.png',
    1: '6mposition.png',
    2: '3mposition.png',
    3: '1mposition.png',
  }[position.poolID]
  const period = {
    0: '360 Days',
    1: '180 Days',
    2: '90 Days',
    3: '45 Days',
  }[position.poolID]

  return (
    <Flex
      grow={1}
      height={'full'}
      maxHeight={{ base: '180px', lg: '80px', xl: '80px' }}
      position="relative"
      rounded="2xl"
      shadow={'up'}
      direction={{ base: 'column', lg: 'row', xl: 'row' }}
    >
      <Flex height={'full'}>
        <HStack
          spacing={{ base: 14, lg: 0, xl: 0 }}
          width={{ base: 'full', xl: '177px', lg: '177px' }}
          height={68}
          shadow={'Down Medium'}
          rounded={'2xl'}
        >
          <Flex w={'55%'} pl={2} direction="column" textAlign={'start'}>
            <Text fontSize="xs" color="text.low" fontWeight="medium" ml={3}>
              Stake Pool
            </Text>
            <Text fontSize="s" color="white" fontWeight="bold" ml={3}>
              {period}
            </Text>
          </Flex>
          <Flex w={{ base: '55%', lg: '45%' }} justify="end">
            <Image
              width={{ base: '90px', lg: '70px' }}
              height={{ base: '90px', lg: '70px' }}
              src={`/assets/marketplace/${stakeImage}`}
              alt="position"
            />
          </Flex>
        </HStack>
      </Flex>

      <Flex width={'full'}>
        <Flex flex={1} justifyContent="center" direction={'column'} textAlign={'start'} ml="6">
          <Text color="text.low" fontSize={{ base: '12px', xl: 'sm', lg: 'sm' }} noOfLines={1}>
            Redeem In:
          </Text>
          <Text fontSize={{ base: '14px', xl: 'sm', lg: 'sm' }} fontWeight="bold">
            {redeemInDays}
          </Text>
        </Flex>
        <Flex flex={1} justifyContent="center" direction={'column'} textAlign={'start'} ml="6">
          <Text color="text.low" fontSize={{ base: '12px', xl: 'sm', lg: 'sm' }} noOfLines={1}>
            Price:
          </Text>
          <Text fontSize={{ base: '14px', xl: 'sm', lg: 'sm' }} fontWeight="bold" noOfLines={1}>
            {formatFixed(props.marketInfo.listPrice)} CNV
          </Text>
        </Flex>
        <Flex flex={1} justifyContent="center" direction={'column'} textAlign={'start'} ml="6">
          <Text color="text.low" fontSize={{ base: '12px', xl: 'sm', lg: 'sm' }}>
            Discount:
          </Text>
          <Text fontSize={{ base: '14px', xl: 'sm', lg: 'sm' }} fontWeight="bold">
            {formatFixed(props.marketInfo?.discount, { decimals: 2 })}%
          </Text>
        </Flex>
        <Flex
          flex={1.3}
          justifyContent="center"
          width={'60px'}
          height="60px"
          alignItems={'center'}
          zIndex={3}
        >
          <Image
            transition={'all'}
            transitionDuration="0.3s"
            transform={!!active ? 'rotate(180deg)' : ''}
            boxSize="60px"
            src={`/assets/liquidstaking/modal-arrow-logo.svg`}
            alt="arrow down logo"
            cursor={'pointer'}
            onClick={props.onClick}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
export const NftPositionCard = ({ marketInfo }: NftPositionBoxProps) => {
  const [active, setActive] = useState(false)
  return (
    <Flex
      shadow={active ? 'up' : ''}
      bg={active ? 'stroke.primary' : 'rgb(0,0,0,0)'}
      rounded={'2xl'}
      justifyContent="center"
      my={active ? 6 : '1px'}
      mx="auto"
      transition="all"
      transitionDuration={'0.3s'}
      maxH={'280px'}
      width={{ lg: '570px', base: 'full' }}
      position="relative"
    >
      <Box
        position={'absolute'}
        height="full"
        width={'full'}
        bgImage={'/assets/textures/metal.png'}
        bgSize="20%"
        rounded={'2xl'}
      />
      <Flex
        direction={'column'}
        height="full"
        m={'2px'}
        bg={{
          base: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
          md: 'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)',
        }}
        rounded={'2xl'}
        onClick={() => {}}
        flex={1}
      >
        <NftPositionBox
          active={active}
          marketInfo={marketInfo}
          onClick={() => setActive(!active)}
        />
        <Collapse in={active}>
          <MarketItemInfoBody marketItem={marketInfo} />
        </Collapse>
      </Flex>
    </Flex>
  )
}

const MarketItemInfoBody = ({ marketItem }: { marketItem: MarketItemInfo }) => {
  const redeemDate = new Date(marketItem.position.maturity * 1000).toString().slice(4, 16)
  return (
    <Flex
      direction={{ xl: 'row', lg: 'row', base: 'column' }}
      justifyContent="start"
      alignItems={'center'}
    >
      <Flex flex={1} justify={'space-around'} width={'full'}>
        <Flex
          py={4}
          direction={'column'}
          justifyContent="start"
          alignItems={'start'}
          textAlign="start"
        >
          <Text width={'full'} color={'text.low'} fontSize={{ base: '12px', xl: 'sm', lg: 'sm' }}>
            Redeem date:
          </Text>
          <Text width={'full'} fontWeight={700} fontSize={{ base: '14px', xl: 'sm', lg: 'sm' }}>
            {redeemDate}
          </Text>
        </Flex>
        <Flex textAlign={'start'} direction={'column'} justifyContent="center">
          <Text color={'text.low'} fontSize={{ base: '12px', xl: 'sm', lg: 'sm' }}>
            Current value
          </Text>
          <Flex justifyContent={'center'} alignItems="center">
            <Text width={'full'} fontWeight={700} fontSize={{ base: '14px', xl: 'sm', lg: 'sm' }}>
              {formatFixed(marketItem.position.currentValue, { decimals: 18 })} CNV
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <BidButton marketInfo={marketItem} />
      <BuyButton marketInfo={marketItem} />
    </Flex>
  )
}
