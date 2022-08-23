import { MarketItem, StakingPosition } from '@concave/marketplace'
import { Box, Button, HStack, Text, VStack } from '@concave/ui'
import { useInsert_Marketplace_ListingMutation } from 'graphql/generated/graphql'
import { Dispatch, SetStateAction } from 'react'
import { formatFixed } from 'utils/bigNumberMask'
import { Info } from './Info'
import { usePositionDiscount } from './hooks/usePositionDiscount'

export const ConfirmSignature = ({
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
    await insertMarketplace.mutateAsync({
      tokenID: market.tokenId.toString(),
      signatureHash: market.signature,
      endPrice: market.endPrice.toString(),
      start: market.start.toString(),
      startPrice: market.startPrice.toString(),
      tokenOwner: market.seller,
      tokenIsListed: true,
      deadline: market.deadline.toString(),
      tokenOption: market.erc20,
    })
    setMarket(market.new({ isListed: true }))
    onClose()
  }
  const discount = usePositionDiscount(staking, market)

  return (
    <VStack direction={'column'} gap={4} p={4}>
      <Text fontSize={`xl`} textAlign={'center'} fontWeight="bold" width={'full'}>
        Confirm signature
      </Text>
      <Box p={4} shadow={`Down Medium`} w={'full'} borderRadius={'3xl'}>
        <Info label="Item:" value={`#` + market.tokenId.toString()}></Info>
        <Info label="Current price:" value={formatFixed(staking.currentValue) + ` CNV`}></Info>
        <Info
          label="Listed price:"
          value={
            formatFixed(market.startPrice, { ...market.currency }) + ` ${market.currency.symbol}`
          }
        ></Info>
        <Info
          label="Discount:"
          isLoading={discount.isLoading}
          value={formatFixed(discount.discount || 0, { decimals: 2 }) + `%`}
        ></Info>
      </Box>
      <HStack w={'full'} gap={2}>
        <Button w={'full'} onClick={onSubmit} variant={`primary`} size={`md`}>
          Submit
        </Button>
        <Button
          w={'full'}
          onClick={() => {
            setMarket(market.new({ isListed: false, signature: '' }))
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
