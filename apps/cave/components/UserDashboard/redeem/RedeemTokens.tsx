import { VStack } from '@concave/ui'
import { RedeemTokensCard } from 'components/UserDashboard/redeem/RedeemTokensCard'

export function RedeemTokens() {
  return (
    <VStack w={'full'} h={'full'} justifyContent={'space-around'}>
      <RedeemTokensCard></RedeemTokensCard>
    </VStack>
  )
}
