import { Flex, Heading, Text } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import { TransparencyDiagram as TransparencyDiagramComponent } from 'components/TransparencyDiagram/TransparencyDiagram'
import { BondGraphics } from 'components/Treasury/BondGraphics'
import DividendsCard from 'components/Treasury/DividendsCard'
import { TreasuryRedeemCard } from 'components/Treasury/TreasuryRedeemCard'

const TransparencyDiagram = () => {
  return (
    <Flex align={'center'} w={'100%'} h={'100%'} gap={4} textAlign="center" direction="column">
      <>
        <Heading as="h1" mt={16} mb={3} fontSize="5xl">
          Transparency Diagram
        </Heading>
        <Flex mt={0} align="center" gap={10} width="full" justify="center" alignItems={'center'}>
          <Text maxW={520} textAlign={'center'}>
          Concave's Treasury works to increase itself via investments, yield farming and bonding. Take a look at our stats, backing areas and diagrams on this comprehensive page.
          </Text>
        </Flex>
        <TransparencyDiagramComponent />
        <Flex direction={'column'} maxW="80%" gap={6}>
          <BondGraphics />
          <DividendsCard />
          <TreasuryRedeemCard />
        </Flex>
      </>
    </Flex>
  )
}

TransparencyDiagram.Meta = {
  title: `Concave | Transparency Overview`,
  description: `Concave CO-OP's Treasury is fully transparent and managed to increase its value and generate quarterly dividends for CNV Stakers or pToken holders. Earn some Real Yield with DeFi 3.0`,
}

export default withPageTransition(TransparencyDiagram)
