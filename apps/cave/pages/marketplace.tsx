import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  Collapse,
  Container,
  Flex,
  Heading,
  Modal,
  ModalFooter,
  Text,
  useMediaQuery,
} from '@concave/ui'
import GraphicGuide from 'components/LiquidStaking/GraphicGuide'
import MarketplaceSearchCard from 'components/Marketplace/MarketplaceSearchCard'
import MarketplaceStakeCard from 'components/Marketplace/MarketplaceStakeCard'
import MarketplaceActivityCard from 'components/Marketplace/MarketplaceActivityCard'
import { useRouter } from 'next/router'

const Marketplace = () => {
  const router = useRouter()
  const [isMoreThan1200] = useMediaQuery('(min-width: 1200px)')
  const [isMoreThan470] = useMediaQuery('(min-width: 470px)')
  const [columnDirection, setColumnDirection] = useState<'row' | 'column-reverse'>('row')
  const [headerDirection, setHeaderDirection] = useState<'row' | 'column'>('row')
  const [searchCardMT, setSearchCardMT] = useState(16)
  const [display, setDisplay] = useState<'flex' | 'none'>('flex')
  const [textAlign, setTextAlign] = useState<'right' | 'center'>('right')
  const [gap, setGap] = useState(8)
  const [width, setWidth] = useState('')
  const [pr, setPr] = useState(0)

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

  useEffect(() => {
    setWidth(isMoreThan470 ? 'full' : '')
    setPr(isMoreThan470 ? 0 : 5)
  }, [isMoreThan470])
  return (
    <Flex
    
      align={'center'}
      borderRadius={0}
      textAlign="center"
      direction="column"
      width={width}
      pr={pr}
    >
      {!viewTransactios ? (
        <>
          <Heading as="h1" mt={16} mb={3} fontSize="5xl">
            {'Marketplace'}
          </Heading>
          <Flex
            direction={headerDirection}
            mt={0}
            align="center"
            gap={10}
            width="full"
            justify="center"
            alignItems={'center'}
          >
            <Text maxW={520} textAlign={textAlign}>
              The Concave Marketplace is where you are able to buy and/or sell your locked-staked
              NFT positions. Most of the positions will has a discount but 12 month stakes, because
              it has a limited supply.
            </Text>
            <GraphicGuide />
          </Flex>

          <Flex direction={columnDirection} justify="center" align={'center'} gap={5} width="full">
            <Flex
              direction="column"
              float={'left'}
              position="relative"
              justify={'center'}
              align="center"
              mt={searchCardMT}
              // pl={pl}
            >
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
              <Box display={display} >
                <MarketplaceActivityCard />
              </Box>
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex direction={'column'} justify="center" align={'center'} gap={4} px={10}>
          <Flex height="120px" position="relative">
            <Flex mt={20} grow={1} justify="center" align={'center'} isTruncated>
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
    <Modal
      bluryOverlay={true}
      title="Marketplace"
      isOpen={true}
      onClose={() => router.push('swap')}
      isCentered
      motionPreset="slideInBottom"
      hideClose={true}
      bodyProps={{ alignItems: 'center', gap: 3, w: '100%', maxW: '350px' }}>
        <ModalFooter>
Coming Soon!
        </ModalFooter>
      </Modal>
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
