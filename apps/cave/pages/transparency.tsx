import { Container, Flex, Heading, Text, useBreakpointValue } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import TransparencyCharts from 'components/Transparency/Charts/TransparencyCharts'
import { TransparencyDiagram as TransparencyDiagramComponent } from 'components/TransparencyDiagram/TransparencyDiagram'
import { TreasuryUpdateBanner } from 'components/TreasuryUpdateBanner'

const TransparencyDiagram = () => {
  const isMobile = useBreakpointValue({ base: true, xl: false })

  return (
    <Container maxW={{ base: '60ch', sm: 'container.sm', lg: '90%' }} p={{ base: 0 }} centerContent>
      <Flex align={'center'} w={'100%'} h={'100%'} gap={4} textAlign="center" direction="column">
        <Heading
          as="h1"
          apply="background.text-brightBlue"
          fontWeight={'semibold'}
          mt={16}
          mb={3}
          fontSize="5xl"
        >
          Transparency Dashboard
        </Heading>
        <Flex mt={0} align="center" gap={10} width="full" justify="center" alignItems={'center'}>
          <Text apply="background.text-brightBlue" maxW={620} textAlign={'center'}>
            Concave&apos;s Treasury works to increase itself via investments, yield farming and
            bonding. Take a look at our stats, backing areas and diagrams on this comprehensive
            page.
          </Text>
        </Flex>
        <TreasuryUpdateBanner />

        <TransparencyDiagramComponent isMobile={isMobile} />
        <Flex w={'100%'} direction={'column'} gap={6} alignItems={'center'}>
          <TransparencyCharts isMobile={isMobile} />
        </Flex>
      </Flex>
    </Container>
  )
}

TransparencyDiagram.Meta = {
  title: 'Concave | Transparency Overview',
  description: `Concave works to increase treasury value via asset management of seed investments, asset investments, trades, revenue, and bonding. Take a look at our transparency dashboard to get a view of treasury and protocol statistics`,
}

export default withPageTransition(TransparencyDiagram)
