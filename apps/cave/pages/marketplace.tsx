import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
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
  useEffect(() => {
    setColumnDirection(isMoreThan1200 ? 'row' : 'column-reverse')
    setHeaderDirection(isMoreThan1200 ? 'row' : 'column')
    setDisplay(isMoreThan1200 ? 'flex' : 'none')
    setSearchCardMT(isMoreThan1200 ? 16 : 6)
    setTextAlign(isMoreThan1200 ? 'right' : 'center')
  })

  return (
    <Container maxW="container.lg" borderRadius={0} border="" textAlign="center">
      <Heading as="h1" mt={16} mb={3} fontSize="5xl">
        Marketplace
      </Heading>
      <Flex direction={headerDirection} mt={0} align="center" gap={10} justify="center">
        <Text maxW={520} textAlign={textAlign}>
          The Concave Marketplace is where you are able to buy and/or sell your locked-staked NFT
          positions. Most of the positions will has a discount but 12 month stakes, because it has a
          limited supply.
        </Text>
        <GraphicGuide />
      </Flex>

      <Flex direction={columnDirection} justify="center" align={'center'} width="full">
        <Flex
          direction="column"
          float={'left'}
          mr="6"
          gap={8}
          position="relative"
          mt={searchCardMT}
        >
          <MarketplaceSearchCard />
        </Flex>
        <Flex direction="column" gap={5} position="relative" mt={searchCardMT}>
          <MarketplaceStakeCard />
          <Box display={display}>
            <MarketplaceActivityCard />
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}

export default Marketplace
