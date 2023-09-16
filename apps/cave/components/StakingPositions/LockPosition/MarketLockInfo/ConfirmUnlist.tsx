import { StakingPosition } from '@concave/marketplace'
import { Box, Button, HStack, Text, VStack } from '@concave/ui'
import { formatFixed } from 'utils/bigNumberMask'
import { Info } from './Info'
import { useListeForSaleState } from './SellPositionModal'

export const ConfirmUnlist = ({
  staking,
  onClose,
}: {
  onClose: VoidFunction
  staking: StakingPosition
}) => {
  const { market, clearSignature } = useListeForSaleState({ staking })

  return (
    <VStack direction={'column'} gap={4} p={4}>
      <Text fontSize={`xl`} textAlign={'center'} fontWeight="bold" width={'full'}>
        Confirm unlist
      </Text>
      <Box p={4} shadow={`Down Medium`} w={'full'} borderRadius={'3xl'}>
        <Info label="Item:" value={`#` + market.tokenId.toString()}></Info>
        <Info label="Current price:" value={formatFixed(staking.currentValue) + ` CNV`}></Info>
      </Box>
      <HStack w={'full'} gap={2}>
        <Button w={'full'} onClick={() => clearSignature(onClose)} variant={`primary`} size={`md`}>
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
