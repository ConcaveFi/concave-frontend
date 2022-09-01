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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a enim sed sem.
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
  title: 'Concave | Transparency Diagram',
  description: ``,
}

export default withPageTransition(TransparencyDiagram)
