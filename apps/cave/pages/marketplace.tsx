import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  Collapse,
  Container,
  Flex,
  Heading,
  HStack,
  Popover,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
  useMediaQuery,
} from '@concave/ui'
import GraphicGuide from 'components/LiquidStaking/GraphicGuide'
import MarketplaceSearchCard from 'components/Marketplace/MarketplaceSearchCard'
import MarketplaceStakeCard from 'components/Marketplace/MarketplaceStakeCard'
import MarketplaceActivityCard from 'components/Marketplace/MarketplaceActivityCard'
import StakePeriodCard from 'components/Marketplace/StakePeriodCard'

const Marketplace = () => {
  const [isMoreThan1200] = useMediaQuery('(min-width: 1200px)')
  const [columnDirection, setColumnDirection] = useState<'row' | 'column-reverse'>('row')
  const [headerDirection, setHeaderDirection] = useState<'row' | 'column'>('row')
  const [searchCardMT, setSearchCardMT] = useState(16)
  const [display, setDisplay] = useState<'flex' | 'none'>('flex')
  const [textAlign, setTextAlign] = useState<'right' | 'center'>('right')
  const [gap, setGap] = useState(8)

  const [viewTransactios, setViewTransactions] = useState(false)

  useEffect(() => {
    setColumnDirection(isMoreThan1200 ? 'row' : 'column-reverse')
    setHeaderDirection(isMoreThan1200 ? 'row' : 'column')
    setDisplay(isMoreThan1200 ? 'flex' : 'none')
    setSearchCardMT(isMoreThan1200 ? 16 : 6)
    setTextAlign(isMoreThan1200 ? 'right' : 'center')
    setGap(isMoreThan1200 ? 8 : 0)
    if (isMoreThan1200 && viewTransactios == true) setViewTransactions(false)
  }, [isMoreThan1200])

  return (
    <Container maxW="container.lg" borderRadius={0} border="" textAlign="center">
      {!viewTransactios ? (
        <>
          <Heading as="h1" mt={16} mb={3} fontSize="5xl">
            {'Marketplace'}
          </Heading>
          <Flex direction={headerDirection} mt={0} align="center" gap={10} justify="center">
            <Text maxW={520} textAlign={textAlign}>
              The Concave Marketplace is where you are able to buy and/or sell your locked-staked
              NFT positions. Most of the positions will has a discount but 12 month stakes, because
              it has a limited supply.
            </Text>
            <GraphicGuide />
          </Flex>

          <Flex direction={columnDirection} justify="center" align={'center'} gap={5} width="full">
            <Flex direction="column" float={'left'} gap={8} position="relative" mt={searchCardMT}>
              <MarketplaceSearchCard />
            </Flex>
            <Flex direction="column" gap={gap} align="center" position="relative" mt={searchCardMT}>
              <MarketplaceStakeCard />
              <SwitchView
                title="View Transactions"
                px="140px"
                rounded="0px 0px 16px 16px"
                onClick={() => setViewTransactions(true)}
                active={!isMoreThan1200}
              />
              <Box display={display}>
                <MarketplaceActivityCard />
              </Box>
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex direction={'column'} justify="center" align={'center'} gap={4} width="full">
          <Flex width={'full'} height="100px" position="relative">
            <Flex mt={20} grow={1} justify="center" align={'center'}>
              <Text fontWeight={700} fontSize="4xl">
                {'<- Marketplace '}
              </Text>
              <Text fontSize="2xl" textColor={'gray.300'} pl="3" pt={2}>
                {' > Transactions'}
              </Text>
            </Flex>
          </Flex>
          <Flex mt={12} direction={'column'} justify="center" align={'center'}>
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
    </Container>
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
  const [display, setDiplay] = useState<'flex' | 'none'>('flex')
  return (
    <Collapse in={active}>
      <Button _active={{}} onClick={() => onClick()}>
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
    </Collapse>
  )
}

export default Marketplace
