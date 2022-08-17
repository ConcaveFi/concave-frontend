import { DAI, MARKETPLACE_CONTRACT } from '@concave/core'
import { MarketItem, StakingPosition } from '@concave/marketplace'
import { Box, Button, ButtonProps, Flex, Text } from '@concave/ui'
import { formatDistanceToNow } from 'date-fns'
import { BigNumber } from 'ethers'
import { useApproveForAll } from 'hooks/useApprove'
import { useState } from 'react'
import { formatFixed } from 'utils/BigNumberMasks'
import { useAccount } from 'wagmi'
import { Info } from '../Redeem/RedeemViewer'
import { SaleModal } from './SellPositionModal'
import { usePositionDiscount } from './usePositionDiscount'

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
  if (market?.isListed && market?.type === `list`) {
    return { children: 'Unlist', onClick: () => setState(`unlist`), variant: 'primary.outline' }
  }
  if (!approveContractInfo.isOK) {
    return {
      children: 'Approve contract',
      onClick: () => approveContractInfo.sendTx(),
      variant: 'primary.outline',
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
  const auctionEnd = formatDistanceToNow(new Date(+market?.deadline.toString() * 1000), {
    addSuffix: false,
  })
  const discount = usePositionDiscount(stakingPosition, market)

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
            value={
              market?.isListed
                ? `${formatFixed(market.startPrice, { decimals: market.currency.decimals })} ${
                    market.currency?.symbol
                  }`
                : '---'
            }
          />
          <Info
            label={'Discount:'}
            width={'full'}
            isLoading={discount.isLoading}
            value={
              market?.isListed
                ? `${formatFixed(discount.discount || BigNumber.from(0), { decimals: 2 })} %`
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
        onClose={() => marketItemState.setState('')}
        state={marketItemState.state}
      />
    </Box>
  )
}

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
