import { Box, Button, Card, Flex, Heading, Text, useBreakpointValue } from '@concave/ui'
import { MarketplaceDashboard } from 'components/LiquidMarketplace/MarketplaceDashboard'
import GraphicGuide from 'components/LiquidStaking/GraphicGuide'
import MarketplaceActivityCard from 'components/Marketplace/MarketplaceActivityCard'
import { MarketplaceStakeCard } from 'components/Marketplace/MarketplaceStakeCard'
import { withPageTransition } from 'components/PageTransition'
import { useEffect, useState } from 'react'

const Marketplace = () => {
  const isLargerLayout = useBreakpointValue({
    base: false,
    md: false,
    sm: false,
    xl: true,
  })
  const [viewTransactions, setViewTransactions] = useState(false)

  useEffect(() => {
    if (isLargerLayout && viewTransactions == true) setViewTransactions(false)
  }, [isLargerLayout])

  return (
    <Flex width={{ base: 'full' }} borderRadius={0} textAlign="center" direction="column">
      {!viewTransactions ? (
        <>
          <Heading as="h1" mt={16} mb={3} fontSize="5xl">
            {'Marketplace'}
          </Heading>
          <Flex
            direction={{ xl: 'row', base: 'column' }}
            mt={0}
            align="center"
            gap={10}
            width="full"
            justify="center"
            alignItems={'center'}
          >
            <Text maxW={540} textAlign={{ xl: 'right', base: 'right' }}>
              The Concave Marketplace is where you are able to buy and sell your locked staked NFT
              positions. Prices are quoted in terms of CNV.
            </Text>
            <GraphicGuide />
          </Flex>

          <Flex
            direction={{ xl: 'row', base: 'column-reverse' }}
            justify="center"
            gap={{ base: 1, md: 8 }}
            width="full"
          >
            <Flex
              direction="column"
              float={'left'}
              position="relative"
              align="center"
              mt={{ xl: 12, md: 6, base: 0 }}
            >
              <MarketplaceDashboard />
            </Flex>
            <Flex
              direction="column"
              gap={{ xl: 8, base: 0 }}
              align="center"
              position="relative"
              mt={{ xl: 14, base: 0, md: 6 }}
            >
              <MarketplaceStakeCard />
              <SwitchView
                title="View Transactions"
                px={{ base: '40px', md: '140px' }}
                rounded="0px 0px 16px 16px"
                onClick={() => setViewTransactions(true)}
              />
              <Box display={{ xl: 'flex', base: 'none' }}>
                <MarketplaceActivityCard />
              </Box>
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex
          border={'2px solid white'}
          direction={'column'}
          width="full"
          justify="center"
          align={'center'}
          gap={4}
        >
          <Flex height="120px" position="relative">
            <Flex mt={20} grow={1} justify="center" align={'center'}>
              <Text fontWeight={700} fontSize={{ base: '2xl', md: '3xl' }}>
                {'<- Marketplace '}
              </Text>
              <Text fontSize={{ base: 'xl', md: '2xl' }} textColor={'gray.300'} pl={2}>
                {' > Transactions'}
              </Text>
            </Flex>
          </Flex>
          <Flex mt={2} direction={'column'} justify="center" align={'center'}>
            <SwitchView
              title="Back to Marketplace"
              px={{ base: '40px', md: '80px' }}
              onClick={() => setViewTransactions(false)}
              rounded="16px 16px 0px 0px "
            />
            <MarketplaceActivityCard />
          </Flex>
        </Flex>
      )}
      <Flex mt={2} direction={'column'} justify="center" align={'center'}>
        {/* <Modal
          bluryOverlay={true}
          title=""
          isOpen={true}
          onClose={() => router.push('gemswap')}
          isCentered
          motionPreset="slideInBottom"
          hideClose={true}
          bodyProps={{ alignItems: 'center', gap: 3, w: '100%', maxW: '350px' }}
        >
          <ModalFooter>
            <Text fontSize="2xl" textColor={'gray.300'} pl="3" pt={2}>
              Coming Soon!
            </Text>
          </ModalFooter>
        </Modal> */}
      </Flex>
    </Flex>
  )
}

interface SwitchViewProps {
  title: string
  px: string | any
  rounded: string
  onClick: () => void
}
const SwitchView = (props: SwitchViewProps) => {
  const { onClick, px, title } = props
  return (
    <Button _active={{}} onClick={() => onClick()} display={{ base: 'flex', xl: 'none' }}>
      <Card
        zIndex={-1}
        height={'32px'}
        rounded={props.rounded}
        variant="secondary"
        px={px}
        justify="center"
        fontSize={'18px'}
      >
        <Text>{title}</Text>
      </Card>
    </Button>
  )
}

Marketplace.Meta = {
  title: 'Concave | NFT Marketplace',
  description: `Trade your Liquid Staking positions and other NFTs in Concave's marketplace.`,
}

export default withPageTransition(Marketplace)
