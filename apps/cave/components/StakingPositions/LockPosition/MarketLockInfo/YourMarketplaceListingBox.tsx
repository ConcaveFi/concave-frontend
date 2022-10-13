import { DAI, MARKETPLACE_CONTRACT } from '@concave/core'
import { MarketItem, StakingPosition } from '@concave/marketplace'
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
import { useAccount } from 'wagmi'
import { usePositionDiscount } from './hooks/usePositionDiscount'
import { SaleModal } from './SellPositionModal'

export type UserMarketInfoState = ReturnType<typeof useYourMarketPlaceListing>
export const useYourMarketPlaceListing = ({
  stakingPosition,
}: {
  stakingPosition: StakingPosition
}) => {
  const chainId = stakingPosition.chainId
  const [state, setState] = useState<`` | `list` | `unlist`>('')

  const approveContractInfo = useApproveForAll({
    erc721: stakingPosition.address,
    operator: MARKETPLACE_CONTRACT[chainId],
    approved: true,
  })

  return {
    stakingPosition,
    isWaitingForConfirmation: approveContractInfo.isWaitingForConfirmation,
    isWaitingTransactionReceipt: approveContractInfo.isWaitingTransactionReceipt,
    state,
    setState,
    chainId,
    approveContractInfo,
  }
}

export const getMarketPlaceButtonProps = (
  marketItemState: UserMarketInfoState & { market: MarketItem },
): ButtonProps => {
  const {
    market,
    setState,
    isWaitingForConfirmation,
    isWaitingTransactionReceipt,
    approveContractInfo,
  } = marketItemState

  if (approveContractInfo.isLoading) {
    return { loadingText: '', disabled: true, isLoading: true }
  }
  if (isWaitingForConfirmation || approveContractInfo.isWaitingForConfirmation) {
    return { loadingText: 'Approve in wallet', disabled: true, isLoading: true }
  }
  if (isWaitingTransactionReceipt || approveContractInfo.isWaitingTransactionReceipt) {
    return { loadingText: 'Waiting receipt', disabled: true, isLoading: true }
  }
  if (market?.isListed && market?.type === `dutch auction`) {
    return {
      children: 'Unlist auction',
      onClick: () => setState(`unlist`),
      variant: 'primary.outline',
    }
  }
  const isListed = market?.isListed && market.deadline.mul(1000).gte(Date.now())
  if (isListed && market?.type === `list`) {
    return { children: 'Unlist', onClick: () => setState(`unlist`), variant: 'primary.outline' }
  }
  if (!approveContractInfo.isOK) {
    return {
      children: 'Approve contract',
      onClick: () => approveContractInfo.sendTx(),
      variant: 'primary',
    }
  }
  return { children: 'List for sale', onClick: () => setState(`list`) }
}

export const MarketListing = ({ stakingPosition }: { stakingPosition: StakingPosition }) => {
  const marketItemState = useYourMarketPlaceListing({ stakingPosition })
  const account = useAccount()
  const tmp = generateDefaultMarket(stakingPosition).new({ seller: account.address, signature: '' })
  const [market, setMarket] = useState(tmp.new())
  const buttonState = getMarketPlaceButtonProps({ ...marketItemState, market })
  const { isOpen, onToggle } = useDisclosure()
  const auctionEnd = formatDistanceToNow(new Date(+market?.deadline.toString() * 1000), {
    addSuffix: false,
  })
  const discount = usePositionDiscount(stakingPosition, market)

  const listPrice = market?.isListed
    ? `${formatFixed(market.startPrice, { decimals: market.currency.decimals })} ${
        market.currency?.symbol
      }`
    : '---'
  const discountText = market?.isListed
    ? `${formatFixed(discount.discount || BigNumber.from(0), { decimals: 2 })} %`
    : '---'

  const layoutIsMobile = useBreakpointValue({ base: true, md: false })
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
              <Info title="Token Id" info={stakingPosition.tokenId.toString()} />
              <Info title="List price" info={listPrice} />
            </Flex>
            <Flex
              flex={{ base: '', md: 1 }}
              justify={'space-around'}
              direction={{ base: 'column', md: 'row' }}
            >
              <Info title="Discount" info={discountText} />
              <Info title="Expiration date" info={market?.isListed ? auctionEnd : '--.--.--'} />
            </Flex>
          </Flex>
          <Button
            height={{ base: '40px', md: '50px' }}
            variant={'primary'}
            minW={{ base: '200px', md: '110px' }}
            maxW={{ md: '150px' }}
            size={'sm'}
            width={'full'}
            {...buttonState}
          />
        </Flex>
      </Flex>
      <SaleModal
        staking={stakingPosition}
        market={market}
        setMarket={setMarket}
        onClose={() => marketItemState.setState('')}
        state={marketItemState.state}
      />
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
const generateDefaultMarket = (staking: StakingPosition) => {
  if (staking?.market?.isListed) {
    return staking.market
  }
  return new MarketItem({
    seller: '',
    erc721: staking.address,
    currency: DAI[staking.chainId],
    tokenId: staking.tokenId.toString(),
    startPrice: 0,
    endPrice: 0,
    start: 0,
    deadline: 0,
    isListed: false,
    signature: '',
  })
}
