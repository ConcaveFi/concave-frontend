import { Container, Flex, Heading, Text } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import TransparencyCharts from 'components/Transparency/Charts/TransparencyCharts'
import DividendsCard from 'components/Transparency/DividendsCard'
import { TreasuryRedeemCard } from 'components/Transparency/TreasuryRedeemCard'
import { TransparencyDiagram as TransparencyDiagramComponent } from 'components/TransparencyDiagram/TransparencyDiagram'

const TransparencyDiagram = () => {
  return (
    <Container maxW={{ base: '60ch', sm: 'container.sm', lg: '90%' }} centerContent>
      <Flex align={'center'} w={'100%'} h={'100%'} gap={4} textAlign="center" direction="column">
        <Heading as="h1" mt={16} mb={3} fontSize="5xl">
          Transparency Dashboard
        </Heading>
        <Flex mt={0} align="center" gap={10} width="full" justify="center" alignItems={'center'}>
          <Text maxW={620} textAlign={'center'}>
            Concave&apos;s Treasury works to increase itself via investments, yield farming and
            bonding. Take a look at our stats, backing areas and diagrams on this comprehensive
            page.
          </Text>
        </Flex>
        <TransparencyDiagramComponent />
        <Flex w={'100%'} direction={'column'} gap={6} alignItems={'center'}>
          <TransparencyCharts />
          <DividendsCard />
          <TreasuryRedeemCard />
        </Flex>
      </Flex>
    </Container>
  )
}

TransparencyDiagram.Meta = {
  title: 'Concave | Transparency Overview',
  description: `Concave CO-OP's Treasury is fully transparent and managed to increase its value and generate quarterly dividends for CNV Stakers or pToken holders. Earn some Real Yield with DeFi 3.0`,
}

export default withPageTransition(TransparencyDiagram)
