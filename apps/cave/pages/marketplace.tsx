import { Box, Button, Card, Flex, Heading, Text, useBreakpointValue } from '@concave/ui'
import GraphicGuide from 'components/LiquidStaking/GraphicGuide'
import MarketplaceActivityCard from 'components/Marketplace/MarketplaceActivityCard'
import MarketplaceSearchCard from 'components/Marketplace/MarketplaceSearchCard'
import MarketplaceStakeCard from 'components/Marketplace/MarketplaceStakeCard'
import React, { useEffect, useState } from 'react'

const Marketplace = () => {
  const isLargerLayout = useBreakpointValue({ base: false, xl: true })
  const [viewTransactions, setViewTransactions] = useState(false)

  useEffect(() => {
    if (isLargerLayout && viewTransactions == true) setViewTransactions(false)
  }, [isLargerLayout])

  return (
    <Flex
      width={{ base: '', md: 'full', xl: 'full', sm: 'full' }}
      align={'center'}
      borderRadius={0}
      textAlign="center"
      direction="column"
      pr={{ base: 5, md: 0, xl: 0, sm: 0 }}
    >
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
            <Text maxW={520} textAlign={{ xl: 'right', base: 'center' }}>
              The Concave Marketplace is where you are able to buy and/or sell your locked-staked
              NFT positions. Most of the positions will has a discount but 12 month stakes, because
              it has a limited supply.
            </Text>
            <GraphicGuide />
          </Flex>

          <Flex
            direction={{ xl: 'row', base: 'column-reverse' }}
            justify="center"
            align={'center'}
            gap={8}
            width="full"
          >
            <Flex
              direction="column"
              float={'left'}
              position="relative"
              justify={'center'}
              align="center"
              mt={{ xl: 12, base: 6 }}
            >
              <MarketplaceSearchCard />
            </Flex>
            <Flex
              direction="column"
              gap={{ xl: 8, base: 0 }}
              align="center"
              position="relative"
              mt={{ xl: 14, base: 6 }}
            >
              <MarketplaceStakeCard />
              <SwitchView
                title="View Transactions"
                px="140px"
                rounded="0px 0px 16px 16px"
                onClick={() => setViewTransactions(true)}
                active={!isLargerLayout}
              />
              <Box display={{ xl: 'flex', base: 'none' }}>
                <MarketplaceActivityCard />
              </Box>
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex direction={'column'} justify="center" align={'center'} gap={4} px={10}>
          <Flex height="120px" position="relative">
            <Flex mt={20} grow={1} justify="center" align={'center'} noOfLines={1}>
              <Text fontWeight={700} fontSize="3xl">
                {'<- Marketplace '}
              </Text>
              <Text fontSize="2xl" textColor={'gray.300'} pl="3" pt={2}>
                {' > Transactions'}
              </Text>
            </Flex>
          </Flex>
          <Flex mt={2} direction={'column'} justify="center" align={'center'}>
            <SwitchView
              title="Back to Marketplace"
              px="80px"
              onClick={() => setViewTransactions(false)}
              active={true}
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
          onClose={() => router.push('swap')}
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
  px: string
  active: boolean
  rounded: string
  onClick: () => void
}
const SwitchView = (props: SwitchViewProps) => {
  const { active, onClick, px, title } = props
  return (
    <Button _active={{}} onClick={() => onClick()} display={active ? 'flex' : 'none'}>
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
  title: 'Concave | Marketplace',
  description: `Trade your Liquid Staked positions and other assets in Concave’s marketplace.`,
}

export default Marketplace
