import { CNV_ADDRESS, FIXED_ORDER_MARKET_CONTRACT } from '@concave/core'
import { MarketItem, StakingPosition } from '@concave/marketplace'
import { Box, Button, ButtonProps, Flex, Text } from '@concave/ui'
import { formatDistanceToNow } from 'date-fns'
import { useApproveForAll } from 'hooks/useApprove'
import { useState } from 'react'
import { formatFixed } from 'utils/formatFixed'
import { useAccount } from 'wagmi'
import { Info } from '../Redeem/RedeemViewer'
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
    operator: FIXED_ORDER_MARKET_CONTRACT[chainId],
    approved: true,
  })

  return {
    stakingPosition,
    isTransactionSent: approveContractInfo.isTransactionSent,
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
    stakingPosition,
    state,
    market,
    setState,
    isWaitingForConfirmation,
    isTransactionSent,
    isWaitingTransactionReceipt,
    approveContractInfo,
  } = marketItemState

  if (isWaitingForConfirmation) {
    return { loadingText: 'Approve in wallet', disabled: true, isLoading: true }
  }
  if (isWaitingTransactionReceipt) {
    return { loadingText: 'Waiting receipt', disabled: true, isLoading: true }
  }
  if (market?.isListed && market?.type === `dutch auction`) {
    return {
      children: 'Unlist auction',
      onClick: () => setState(`unlist`),
      variant: 'primary.outline',
    }
  }
  if (market?.isListed && market?.type === `list`) {
    return { children: 'Unlist', onClick: () => setState(`unlist`), variant: 'primary.outline' }
  }
  if (!approveContractInfo.approve.data) {
    return {
      children: 'Approve contract',
      onClick: () => approveContractInfo.sendApproveTx(),
      variant: 'primary.outline',
    }
  }
  return { children: 'List for sale', onClick: () => setState(`list`) }
}

export const MarketListing = ({ stakingPosition }: { stakingPosition: StakingPosition }) => {
  const marketItemState = useYourMarketPlaceListing({ stakingPosition })
  const account = useAccount()
  const [market, setMarket] = useState(
    generateDefaultMarket(stakingPosition).new({ seller: account.address, signature: '' }),
  )
  const buttonState = getMarketPlaceButtonProps({ ...marketItemState, market })
  const auctionEnd = formatDistanceToNow(new Date(+market?.deadline.toString() * 1000), {
    addSuffix: false,
  })

  return (
    <Box shadow={market?.isListed ? '' : 'down'} borderRadius="2xl" width={'full'} p={4}>
      <Flex justify={{ lg: 'left', base: 'center' }}>
        <Text color="text.low" fontSize="lg" as="b">
          Your Marketplace Listing
        </Text>
      </Flex>
      <Flex justify={{ lg: 'left', md: 'center' }} direction={{ base: 'column', lg: 'row' }}>
        <Flex flexBasis={'200%'}>
          <Info
            label={'List Price:'}
            width={'full'}
            fontSize={'lg'}
            value={market?.isListed ? `${formatFixed(market.startPrice)} CNV` : '---'}
          />
          <Info
            label={'Discount:'}
            width={'full'}
            value={
              market?.isListed
                ? `${formatFixed(stakingPosition.calculateDiscount(market), { decimals: 2 })} %`
                : '---'
            }
          />
          <Info
            label={'Expiration Date:'}
            width={'full'}
            value={market?.isListed ? auctionEnd : '--.--.--'}
          />
        </Flex>
        <Button variant={'primary'} minW={'160px'} size={'md'} width={'full'} {...buttonState} />
      </Flex>
      <SaleModal
        staking={stakingPosition}
        market={market}
        setMarket={setMarket}
        onClose={() => marketItemState.setState(``)}
        state={marketItemState.state}
      />
    </Box>
  )
}

const generateDefaultMarket = (staking: StakingPosition) => {
  return (
    staking.market ||
    new MarketItem({
      seller: '',
      erc721: staking.address,
      erc20: CNV_ADDRESS[staking.chainId],
      tokenId: staking.tokenId.toString(),
      startPrice: staking.currentValue,
      endPrice: 0,
      start: 0,
      deadline: staking.maturity,
      isListed: false,
      signature: '',
    })
  )
}
