import { Button, Card, Flex, Text, useBreakpointValue } from '@concave/ui'
import { MarketplaceActivityCard } from 'components/Marketplace/Activity/MarketplaceActivityCard'
import { MarketplaceHeader } from 'components/Marketplace/Header/MarketplaceHeader'
import { MarketplaceDashboard } from 'components/Marketplace/Main/MarketplaceDashboard'
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
    <Flex
      width={{ base: 'full' }}
      textAlign="center"
      direction="column"
      // overflowX={`scroll`}
      // h={'100vh'}
    >
      {!viewTransactions ? (
        <>
          <MarketplaceHeader />
          <Flex
            direction={{ xl: 'row', base: 'column-reverse' }}
            gap={4}
            maxH={'90vh'}
            justify="center"
            width="full"
          >
            <MarketplaceDashboard />
            <MarketplaceActivityCard />
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
      <Flex mt={2} direction={'column'} justify="center" align={'center'}></Flex>
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
