import { MarketplaceDashboard } from 'components/Marketplace/Main/MarketplaceDashboard'
import { Text } from '@concave/ui'

const NoPositions = () => (
  <>
    <Text size={'lg'} w={'full'} mt={'auto'} mb={'auto'} fontWeight={'bold'}>
      {`Currently you don't have any positions listed for sale`}
    </Text>
  </>
)

export function MarketplaceSnapshot() {
  return (
    <MarketplaceDashboard filterUserPositions w={'100%'} h={'auto'} justifyContentSort={'center'}>
      <NoPositions></NoPositions>
    </MarketplaceDashboard>
  )
}
