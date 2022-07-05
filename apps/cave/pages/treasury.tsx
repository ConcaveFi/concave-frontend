import { Flex } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import { BondGraphics } from 'components/Treasury/BondGraphics'
import DividendsCard from 'components/Treasury/DividendsCard'
import { useTreasuryData } from 'components/Treasury/Hooks/useTreasuryData'
import { TreasuryAssetsCard } from 'components/Treasury/TreasuryAssetsCard'
import { TreasuryDataCard } from 'components/Treasury/TreasuryDataCard'
import { TreasuryRedeemCard } from 'components/Treasury/TreasuryRedeemCard'
export function Treasury() {
  const { treasuryData, lastBondSolds, assets } = useTreasuryData()

  return (
    <Flex direction={'column'} align="center" gap={6} justify={'center'} w={'full'}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap={6}
        width="full"
        justify="center"
        align={'center'}
        position={'relative'}
      >
        <TreasuryDataCard
          lastBondSolds={lastBondSolds}
          firstRow={treasuryData?.firstRow}
          secondRow={treasuryData?.secondRow}
        />
        <TreasuryRedeemCard />
      </Flex>
      <BondGraphics />
      <TreasuryAssetsCard assets={assets} />
      <DividendsCard />
    </Flex>
  )
}

Treasury.Meta = {
  title: 'Concave | Treasury',
  description: `Concave has treasury strategies to take advantage of yield opportunities. It is broken down into Investment Research, Delta Neutral, and Stable Farm strategies.`,
}

export default withPageTransition(Treasury)
