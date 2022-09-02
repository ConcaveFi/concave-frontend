import { Box, Button, Flex, useBreakpointValue, VStack } from '@concave/ui'
import { useState } from 'react'
import ReactFlow, { ConnectionLineType, Controls } from 'react-flow-renderer'
import { bondingEdges } from './edges/bondingEdges'
import { generalEdges } from './edges/generalEdges'
import { stakingEdges } from './edges/stakingEdges'
import { bondingNodes, generalNodes, nodeTypes, stakingNodes } from './nodes/nodes'
import { edgeStyle, labelStyle } from './styles'

const SelectionButton = ({ diagramShown, setDiagramShown, chartId, chartName }) => (
  <Button
    variant={diagramShown === chartId ? 'primary.outline' : 'secondary'}
    size={'lg'}
    onClick={() => setDiagramShown(chartId)}
  >
    {chartName}
  </Button>
)

const ReactFlowDiagram = ({ edges, nodes }) => (
  <ReactFlow
    edges={edges}
    nodes={nodes}
    nodeTypes={nodeTypes}
    attributionPosition="top-left"
    elevateEdgesOnSelect
    fitView
    fitViewOptions={{ padding: 0.15 }}
    defaultEdgeOptions={{
      type: ConnectionLineType.SimpleBezier,
      style: { ...edgeStyle },
      labelStyle: { ...labelStyle },
      labelShowBg: false,
    }}
  >
    <Controls showInteractive={false} />
  </ReactFlow>
)

export function TransparencyDiagram() {
  const [diagramShown, setDiagramShown] = useState<0 | 1 | 2 | 3>(0)
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <>
      <VStack
        minWidth={isMobile ? '300px' : '700px'}
        width={'100%'}
        height={'850px'}
        rounded={'2xl'}
        apply="background.metalBrighter"
        shadow={'up'}
        p={5}
        gap={5}
      >
        <Box display={'flex'} flexDirection={isMobile ? 'column' : 'row'} gap={'1rem'}>
          <SelectionButton
            chartId={0}
            chartName={'Treasury'}
            diagramShown={diagramShown}
            setDiagramShown={setDiagramShown}
          />
          <SelectionButton
            chartId={1}
            chartName={'General Diagram'}
            diagramShown={diagramShown}
            setDiagramShown={setDiagramShown}
          />
          <SelectionButton
            chartId={2}
            chartName={'Bonding Diagram'}
            diagramShown={diagramShown}
            setDiagramShown={setDiagramShown}
          />
          <SelectionButton
            chartId={3}
            chartName={'Staking Diagram'}
            diagramShown={diagramShown}
            setDiagramShown={setDiagramShown}
          />
        </Box>
        <Flex
          rounded={'inherit'}
          shadow="down"
          w="100%"
          h="full"
          p={4}
          py={6}
          justify="start"
          overflowY={'auto'}
          direction="column"
          apply="scrollbar.big"
          bg={'linear-gradient(238.35deg, #19394C 9.11%, #0A161F 92.45%)'}
          gap={2}
        >
          {diagramShown === 0 && (
            <Flex
              src={
                isMobile
                  ? 'https://datastudio.google.com/embed/reporting/8f3baa69-b193-41be-9d4f-ffcbc08d691a/page/p_0h786h6otc'
                  : 'https://datastudio.google.com/embed/reporting/f0ba2360-88f4-468a-8306-1923dd49f8a8/page/p_0h786h6otc'
              }
              as={'iframe'}
              w={'full'}
              h={'full'}
              overflow={'hidden'}
              rounded={'2xl'}
            />
          )}
          {diagramShown === 1 && <ReactFlowDiagram edges={generalEdges} nodes={generalNodes} />}
          {diagramShown === 2 && <ReactFlowDiagram edges={bondingEdges} nodes={bondingNodes} />}
          {diagramShown === 3 && <ReactFlowDiagram edges={stakingEdges} nodes={stakingNodes} />}
        </Flex>
      </VStack>
    </>
  )
}
