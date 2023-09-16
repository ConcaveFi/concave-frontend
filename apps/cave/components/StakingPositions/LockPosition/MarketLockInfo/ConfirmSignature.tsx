import { MarketItem, StakingPosition } from '@concave/marketplace'
import { Box, Button, HStack, Text, VStack } from '@concave/ui'
import { formatFixed } from 'utils/bigNumberMask'
import { Info } from './Info'

export const ConfirmSignature = ({
  market,
  staking,
  onSubmit,
  onCancel,
}: {
  onSubmit: VoidFunction
  onCancel: VoidFunction
  staking: StakingPosition
  market: MarketItem
}) => {
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
      </Box>
      <HStack w={'full'} gap={2}>
        <Button w={'full'} onClick={onSubmit} variant={`primary`} size={`md`}>
          Submit
        </Button>
        <Button w={'full'} onClick={onCancel} variant={`secondary`} size={`md`}>
          Cancel
        </Button>
      </HStack>
    </VStack>
  )
}
