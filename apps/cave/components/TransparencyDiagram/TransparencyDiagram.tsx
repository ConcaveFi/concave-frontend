import { ChevronDownIcon } from '@concave/icons'
import {
  Box,
  Button,
  Flex,
  gradientBorder,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from '@concave/ui'
import { Dispatch, SetStateAction, useState } from 'react'
import { bondingEdges } from './edges/bondingEdges'
import { bondingEdgesMobile } from './edges/bondingEdgesMobile'
import { generalEdges } from './edges/generalEdges'
import { generalEdgesMobile } from './edges/generalEdgesMobile'
import { stakingEdges } from './edges/stakingEdges'
import { stakingEdgesMobile } from './edges/stakingEdgesMobile'
import {
  bondingNodes,
  bondingNodesMobile,
  generalNodes,
  generalNodesMobile,
  stakingNodes,
  stakingNodesMobile,
} from './nodes/nodes'
import { ReactFlowDiagram } from './ReactFlowDiagram'

enum DiagramButtons {
  TreasuryOverview = 'Treasury Overview',
  Revenue = 'Revenue',
  Trades = 'Trades',
  ClipperLP = 'Clipper LP',
  OperatingCosts = 'Operating Costs',
  GeneralDiagram = 'General Diagram',
  BondingDiagram = 'Bonding Diagram',
  StakingDiagram = 'Staking Diagram',
}

const SelectionButton = ({ diagramShown, setDiagramShown, chartName }) => (
  <Button
    variant={diagramShown === chartName ? 'primary.outline' : 'secondary'}
    size={'lg'}
    onClick={() => setDiagramShown(chartName)}
  >
    {chartName}
  </Button>
)

const DataStudio = ({ src }: { src: string }) => (
  <Flex src={src} as={'iframe'} w={'full'} h={'full'} overflow={'hidden'} rounded={'2xl'} />
)

export function TransparencyDiagram({ isMobile }: { isMobile: boolean }) {
  const [diagramShown, setDiagramShown] = useState<DiagramButtons>(DiagramButtons.TreasuryOverview)

  return (
    <>
      <VStack
        w={'100%'}
        height={'800px'}
        rounded={'2xl'}
        bg="bg.primary"
        shadow={'up'}
        minH={'500px'}
        maxH={{ base: '90vh', md: '800px' }}
        p={{ base: 4, sm: 5 }}
        gap={{ base: 2, sm: 5 }}
      >
        {isMobile ? (
          <MobileMenu diagramShown={diagramShown} setDiagramShown={setDiagramShown} />
        ) : (
          <DesktopMenu diagramShown={diagramShown} setDiagramShown={setDiagramShown} />
        )}
        <Flex
          rounded={'inherit'}
          shadow="down"
          w={'100%'}
          h="full"
          p={isMobile ? 2 : 4}
          py={isMobile ? 2 : 6}
          justify="start"
          overflowY={'auto'}
          direction="column"
          apply="scrollbar.big"
          gap={2}
        >
          {diagramShown === DiagramButtons.TreasuryOverview && (
            <DataStudio
              src={
                isMobile
                  ? 'https://datastudio.google.com/embed/reporting/8f3baa69-b193-41be-9d4f-ffcbc08d691a/page/p_0h786h6otc'
                  : 'https://datastudio.google.com/embed/reporting/f0ba2360-88f4-468a-8306-1923dd49f8a8/page/p_0h786h6otc'
              }
            />
          )}
          {diagramShown === DiagramButtons.Revenue && (
            <DataStudio
              src={
                'https://lookerstudio.google.com/embed/reporting/f0ba2360-88f4-468a-8306-1923dd49f8a8/page/p_ns2smuqp2c'
              }
            />
          )}
          {diagramShown === DiagramButtons.Trades && (
            <DataStudio
              src={
                'https://lookerstudio.google.com/embed/reporting/f0ba2360-88f4-468a-8306-1923dd49f8a8/page/p_afzrzcbq2c'
              }
            />
          )}
          {diagramShown === DiagramButtons.ClipperLP && (
            <DataStudio
              src={
                'https://lookerstudio.google.com/embed/reporting/f0ba2360-88f4-468a-8306-1923dd49f8a8/page/p_wmvudkqp2c'
              }
            />
          )}
          {diagramShown === DiagramButtons.OperatingCosts && (
            <DataStudio
              src={
                'https://lookerstudio.google.com/embed/reporting/f0ba2360-88f4-468a-8306-1923dd49f8a8/page/p_2bjylnpr2c'
              }
            />
          )}
          {diagramShown === DiagramButtons.GeneralDiagram && (
            <ReactFlowDiagram
              edges={isMobile ? generalEdgesMobile : generalEdges}
              nodes={isMobile ? generalNodesMobile : generalNodes}
              isMobile={isMobile}
            />
          )}
          {diagramShown === DiagramButtons.BondingDiagram && (
            <ReactFlowDiagram
              edges={isMobile ? bondingEdgesMobile : bondingEdges}
              nodes={isMobile ? bondingNodesMobile : bondingNodes}
              isMobile={isMobile}
            />
          )}
          {diagramShown === DiagramButtons.StakingDiagram && (
            <ReactFlowDiagram
              edges={isMobile ? stakingEdgesMobile : stakingEdges}
              nodes={isMobile ? stakingNodesMobile : stakingNodes}
              isMobile={isMobile}
            />
          )}
        </Flex>
      </VStack>
    </>
  )
}

const DesktopMenu = ({
  diagramShown,
  setDiagramShown,
}: {
  diagramShown: DiagramButtons
  setDiagramShown: Dispatch<SetStateAction<DiagramButtons>>
}) => (
  <Box
    justifyContent={'center'}
    flexWrap={'wrap'}
    w={'850px'}
    display={'flex'}
    flexDirection={'row'}
    gap={'1rem'}
  >
    {Object.values(DiagramButtons).map((currentValue) => (
      <SelectionButton
        chartName={currentValue}
        diagramShown={diagramShown}
        setDiagramShown={setDiagramShown}
      />
    ))}
  </Box>
)

const MobileMenu = ({
  diagramShown,
  setDiagramShown,
}: {
  diagramShown: DiagramButtons
  setDiagramShown: Dispatch<SetStateAction<DiagramButtons>>
}) => (
  <Menu isLazy matchWidth>
    {({ isOpen }) => (
      <>
        <MenuButton
          width={'full'}
          py={3}
          transition="all 0.4s"
          rounded={'xl'}
          fontSize={'lg'}
          shadow={'Up Small'}
          apply={'background.metalBrighter'}
          _expanded={{ bg: 'text.accent' }}
          sx={{ ...gradientBorder({ variant: 'secondary', borderWidth: 2 }) }}
        >
          {diagramShown}
          <ChevronDownIcon transition="0.4s all" transform={isOpen && 'rotate(180deg)'} />
        </MenuButton>
        <MenuList zIndex={5} py={3}>
          {Object.values(DiagramButtons).map((buttonOption) => (
            <MenuItem
              justifyContent={'center'}
              py={3}
              fontSize={'lg'}
              key={buttonOption}
              onClick={() => setDiagramShown(buttonOption)}
            >
              {buttonOption}
            </MenuItem>
          ))}
        </MenuList>
      </>
    )}
  </Menu>
)
