import { Card, Flex } from '@concave/ui'
import { useLiquidStakeData } from 'components/LiquidStaking/hooks/useLiquidStakeData'
import { Loading } from 'components/Loading'
import StakeAprCard from './StakeAprCard'

export function MarketplaceStakeCard() {
  const { stakeData, isLoading } = useLiquidStakeData()
  return (
    <Card
      zIndex={2}
      gap={2}
      shadow="Block Up"
      w={{ base: '300px', md: '460px', xl: '300px' }}
      h={{ base: '283px', md: '168px', xl: '283px' }}
      style={{ alignContent: 'center', justifyContent: 'center' }}
      justify="center"
      variant="secondary"
    >
      <Flex
        direction={{ md: 'row', base: 'column', xl: 'column' }}
        gap={{ base: -10, md: 5, xl: -10 }}
        position="relative"
        as={Loading}
        isLoading={isLoading}
        size="lg"
      >
        {stakeData
          ?.sort(({ poolId: cur }, { poolId: previus }) => previus - cur)
          ?.map(({ totalVAPR, poolId }) => (
            <StakeAprCard APR={totalVAPR} poolId={poolId} key={poolId} />
          ))}
      </Flex>
    </Card>
  )
}
