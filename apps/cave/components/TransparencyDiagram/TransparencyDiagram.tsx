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
  useBreakpointValue,
  VStack,
} from '@concave/ui'
import { Dispatch, SetStateAction, useState } from 'react'
import ReactFlow, { ConnectionLineType, Controls } from 'react-flow-renderer'
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
  nodeTypes,
  stakingNodes,
  stakingNodesMobile,
} from './nodes/nodes'
import { edgeStyle, labelStyle } from './styles'

enum DiagramButtons {
  TreasuryOverview = 'Treasury Overview',
  COOPTreasury = 'CO-OP Treasury',
  ConcaveTreasury = 'Concave Treasury',
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

const ReactFlowDiagram = ({ edges, nodes, isMobile }) => (
  <ReactFlow
    edges={edges}
    nodes={nodes}
    nodeTypes={nodeTypes}
    elevateEdgesOnSelect
    fitView
    fitViewOptions={{ padding: 0.15 }}
    minZoom={0}
    zoomOnPinch
    panOnDrag
    defaultEdgeOptions={{
      type: ConnectionLineType.SimpleBezier,
      style: { ...edgeStyle },
      labelStyle: { ...labelStyle },
      labelShowBg: false,
    }}
  >
    {isMobile ? <></> : <Controls showInteractive={false} />}
  </ReactFlow>
)

export function TransparencyDiagram() {
  const [diagramShown, setDiagramShown] = useState<DiagramButtons>(DiagramButtons.TreasuryOverview)
  const isMobile = useBreakpointValue({ base: true, xl: false })

  return (
    <>
      <VStack
        w={'100%'}
        height={'800px'}
        rounded={'2xl'}
        apply="background.metalBrighter"
        shadow={'up'}
        p={5}
        gap={5}
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
          bg={'linear-gradient(238.35deg, #19394C 9.11%, #0A161F 92.45%)'}
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
          {diagramShown === DiagramButtons.COOPTreasury && (
            <DataStudio
              src={
                isMobile
                  ? 'https://datastudio.google.com/embed/reporting/8f3baa69-b193-41be-9d4f-ffcbc08d691a/page/p_hjeiqnsnyc'
                  : 'https://datastudio.google.com/embed/reporting/f0ba2360-88f4-468a-8306-1923dd49f8a8/page/p_va7gtbqnyc'
              }
            />
          )}
          {diagramShown === DiagramButtons.ConcaveTreasury && (
            <DataStudio
              src={
                isMobile
                  ? 'https://datastudio.google.com/embed/reporting/8f3baa69-b193-41be-9d4f-ffcbc08d691a/page/p_k60ihuz1yc'
                  : 'https://datastudio.google.com/embed/reporting/f0ba2360-88f4-468a-8306-1923dd49f8a8/page/p_65t8ugz1yc'
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
    justifyContent={'space-between'}
    flexWrap={'wrap'}
    w={'620px'}
    display={'flex'}
    flexDirection={'row'}
    gap={'1rem'}
  >
    <SelectionButton
      chartName={DiagramButtons.TreasuryOverview}
      diagramShown={diagramShown}
      setDiagramShown={setDiagramShown}
    />
    <SelectionButton
      chartName={DiagramButtons.COOPTreasury}
      diagramShown={diagramShown}
      setDiagramShown={setDiagramShown}
    />
    <SelectionButton
      chartName={DiagramButtons.ConcaveTreasury}
      diagramShown={diagramShown}
      setDiagramShown={setDiagramShown}
    />
    <SelectionButton
      chartName={DiagramButtons.GeneralDiagram}
      diagramShown={diagramShown}
      setDiagramShown={setDiagramShown}
    />
    <SelectionButton
      chartName={DiagramButtons.BondingDiagram}
      diagramShown={diagramShown}
      setDiagramShown={setDiagramShown}
    />
    <SelectionButton
      chartName={DiagramButtons.StakingDiagram}
      diagramShown={diagramShown}
      setDiagramShown={setDiagramShown}
    />
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
          {Object.keys(DiagramButtons).map((buttonOption) => (
            <MenuItem
              justifyContent={'center'}
              py={3}
              fontSize={'lg'}
              key={buttonOption}
              onClick={() => setDiagramShown(DiagramButtons[buttonOption])}
            >
              {DiagramButtons[buttonOption]}
            </MenuItem>
          ))}
        </MenuList>
      </>
    )}
  </Menu>
)
