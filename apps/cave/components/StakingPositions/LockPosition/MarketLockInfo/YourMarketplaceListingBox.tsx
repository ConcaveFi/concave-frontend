import { DAI, MARKETPLACE_CONTRACT } from '@concave/core'
import { MarketItem, StakingPosition, stakingPositionInfo } from '@concave/marketplace'
import {
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@concave/ui'
import { formatDistanceToNow } from 'date-fns'
import { BigNumber } from 'ethers'
import { useApproveForAll } from 'hooks/useApprove'
import { FC, useState } from 'react'
import { formatFixed } from 'utils/bigNumberMask'
import { useProvider, useQuery } from 'wagmi'
import { SaleModal } from './SellPositionModal'

export const MarketListing = (props: { stakingPosition: StakingPosition }) => {
  const provider = useProvider()
  const layoutIsMobile = useBreakpointValue({ base: true, md: false })

  const positionInfo = useQuery([`position_info`, props.stakingPosition.tokenId], () => {
    return stakingPositionInfo({
      provider,
      tokenId: BigNumber.from(props.stakingPosition.tokenId).toNumber(),
    })
  })
  const [stakingPosition] = positionInfo.data || []
  const { isOpen, onToggle } = useDisclosure()
  const saleModal = useDisclosure({
    onClose: () => {
      console.log(`refetching`)
      positionInfo.refetch()
    },
  })
  if (!stakingPosition) return <p>Loading</p>
  const market = stakingPosition?.market

  const auctionEnd = formatDistanceToNow((market?.deadline.toNumber() || 1) * 1000, {
    addSuffix: false,
  })
  const isListed =
    market?.isListed &&
    market?.signature &&
    market.deadline.gte(0) &&
    market?.deadline.mul(1000).gt(Date.now())

  const listPrice = isListed
    ? `${formatFixed(market.startPrice, { decimals: market.currency.decimals })} ${
        market.currency?.symbol
      }`
    : '---'

  return (
    <Flex direction={'column'} height="full" position={'relative'}>
      <Flex
        direction={{ base: 'column-reverse', md: 'row' }}
        boxSize={'full'}
        p={3}
        gap={{ base: 0, md: 0 }}
        justify="space-between"
        align={'center'}
      >
        <Text
          onClick={layoutIsMobile ? onToggle : undefined}
          cursor={'pointer'}
          fontSize={'lg'}
          fontWeight={'bold'}
          color="text.low"
        >
          {layoutIsMobile && `Marketplace`}
          {!layoutIsMobile && `Marketplace:`}
        </Text>
        <Flex
          gap={{ base: 3, md: 0 }}
          align={'center'}
          direction={{ base: 'column', md: 'row' }}
          h={{ base: isOpen ? '150px' : '0px', md: '50px' }}
          overflow={{ base: !isOpen && 'hidden', md: 'visible' }}
          w="80%"
          transition={'.3s all'}
        >
          <Flex justify={'space-between'} w="full">
            <Flex
              flex={{ base: '', md: 1 }}
              justify={'space-around'}
              direction={{ base: 'column', md: 'row' }}
            >
              <Info title="Token Id" info={stakingPosition.tokenId?.toString()} />
              <Info title="List price" info={listPrice} />
            </Flex>
            <Flex
              flex={{ base: '', md: 1 }}
              justify={'space-around'}
              direction={{ base: 'column', md: 'row' }}
            >
              <Info title="Expiration date" info={isListed ? auctionEnd : '--.--.--'} />
            </Flex>
          </Flex>
          <Button
            height={{ base: '40px', md: '50px' }}
            variant={'primary'}
            minW={{ base: '200px', md: '110px' }}
            maxW={{ md: '150px' }}
            size={'sm'}
            width={'full'}
            onClick={saleModal.onOpen}
          >
            {isListed ? `Unlist` : `List for sale`}
          </Button>

          <SaleModal staking={stakingPosition} {...saleModal} />
        </Flex>
      </Flex>
    </Flex>
  )
}

type InfoProps = { title: string; info: string }
const Info: FC<InfoProps & FlexProps> = ({ info, title, ...props }) => (
  <Flex direction={'column'} align="start" {...props}>
    <Text fontSize="xs" color={'text.low'}>
      {title}
    </Text>
    <Text fontSize="sm" fontWeight={'bold'}>
      {info}
    </Text>
  </Flex>
)
