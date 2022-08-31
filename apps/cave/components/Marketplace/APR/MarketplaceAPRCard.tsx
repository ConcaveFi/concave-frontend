import { Box, Card } from '@concave/ui'
import { useLiquidStakeData } from 'components/LiquidStaking/hooks/useLiquidStakeData'
import StakeAprCard from './StakeAprCard'

export function MarketplaceAPRCard() {
  const { stakeData } = useLiquidStakeData()
  return (
    <Card
      gap={0}
      shadow="Block Up"
      w={{ base: '300px', md: '460px', xl: '300px' }}
      // h={{ base: '283px', md: '168px', xl: '283px' }}
      h={`450px`}
      style={{ alignContent: 'center', justifyContent: 'center' }}
      justify="center"
      variant="secondary"
    >
      <Box>
        {stakeData
          ?.sort(({ poolId: cur }, { poolId: previus }) => previus - cur)
          ?.map(({ totalVAPR, poolId }) => (
            <StakeAprCard APR={totalVAPR} poolId={poolId} key={poolId} />
          ))}
      </Box>
    </Card>
  )
}
