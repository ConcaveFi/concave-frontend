import { MarketItem, StakingPosition } from '@concave/marketplace'
import { Box, Button, HStack, Text, VStack } from '@concave/ui'
import { useInsert_Cavemart_ListingMutation } from 'graphql/generated/graphql'
import { formatFixed } from 'utils/formatFixed'
import { Info } from './Info'

export const ConfirmSignature = ({
  stakingPosition,
  marketItem,
  signature,
  onClose,
}: {
  onClose: () => void
  signature: string
  stakingPosition: StakingPosition
  marketItem: MarketItem
}) => {
  const insertCavemart = useInsert_Cavemart_ListingMutation()
  const onSubmit = async () => {
    await insertCavemart.mutateAsync({
      tokenID: marketItem.tokenId.toString(),
      signatureHash: signature,
      endPrice: marketItem.endPrice.toString(),
      start: marketItem.start.toString(),
      startPrice: marketItem.startPrice.toString(),
      tokenOwner: marketItem.seller,
      tokenIsListed: true,
      deadline: marketItem.deadline.toString(),
    })
    onClose()
  }

  return (
    <VStack direction={'column'} gap={4} p={8}>
      <Text fontSize={`xl`} textAlign={'center'} fontWeight="bold" width={'full'}>
        Confirm signature
      </Text>
      <Box p={4} shadow={`Down Medium`} w={'full'} borderRadius={'3xl'}>
        <Info label="Item:" value={`#` + stakingPosition.tokenId.toString()}></Info>
        <Info
          label="Current price:"
          value={formatFixed(stakingPosition.currentValue) + ` CNV`}
        ></Info>
        <Info label="Listed price:" value={formatFixed(marketItem.startPrice) + ` CNV`}></Info>
        <Info
          label="Discount:"
          value={formatFixed(stakingPosition.calculateDiscount(marketItem), { decimals: 2 }) + `%`}
        ></Info>
      </Box>
      <HStack w={'full'} gap={2}>
        <Button w={'full'} onClick={onSubmit} variant={`primary`} size={`md`}>
          Submit
        </Button>
        <Button w={'full'} onClick={onClose} variant={`secondary`} size={`md`}>
          Cancel
        </Button>
      </HStack>
    </VStack>
  )
}
