import { MarketItem, StakingPosition } from '@concave/marketplace'
import { Box, Button, HStack, Text, VStack } from '@concave/ui'
import { useInsert_Marketplace_ListingMutation } from 'graphql/generated/graphql'
import { Dispatch, SetStateAction } from 'react'
import { formatFixed } from 'utils/bigNumberMask'
import { usePositionDiscount } from './hooks/usePositionDiscount'
import { Info } from './Info'

export const ConfirmUnlist = ({
  market,
  staking,
  setMarket,
  onClose,
}: {
  setMarket: Dispatch<SetStateAction<MarketItem>>
  onClose: VoidFunction
  staking: StakingPosition
  market: MarketItem
}) => {
  const insertMarketplace = useInsert_Marketplace_ListingMutation()

  const onSubmit = async () => {
    const marketItem = staking.market || market
    await insertMarketplace.mutateAsync({
      tokenID: marketItem.tokenId.toString(),
      signatureHash: marketItem.tokenId.toString(),
      endPrice: marketItem.endPrice.toString(),
      start: marketItem.start.toString(),
      startPrice: marketItem.startPrice.toString(),
      tokenOwner: marketItem.seller,
      deadline: marketItem.deadline.toString(),
      tokenIsListed: false,
    })
    setMarket(market.new({ isListed: false }))
    onClose()
  }
  const discount = usePositionDiscount(staking, market)

  return (
    <VStack direction={'column'} gap={4} p={4}>
      <Text fontSize={`xl`} textAlign={'center'} fontWeight="bold" width={'full'}>
        Confirm unlist
      </Text>
      <Box p={4} shadow={`Down Medium`} w={'full'} borderRadius={'3xl'}>
        <Info label="Item:" value={`#` + market.tokenId.toString()}></Info>
        <Info label="Current price:" value={formatFixed(staking.currentValue) + ` CNV`}></Info>
        <Info
          label="Listed price:"
          value={formatFixed(market.startPrice, market.currency) + ` ${market.currency.symbol}`}
        ></Info>
        <Info
          label="Discount:"
          isLoading={discount.isLoading}
          value={formatFixed(discount.discount, { decimals: 2 }) + `%`}
        ></Info>
      </Box>
      <HStack w={'full'} gap={2}>
        <Button w={'full'} onClick={onSubmit} variant={`primary`} size={`md`}>
          Confirm
        </Button>
        <Button
          w={'full'}
          onClick={() => {
            onClose()
          }}
          variant={`secondary`}
          size={`md`}
        >
          Cancel
        </Button>
      </HStack>
    </VStack>
  )
}
