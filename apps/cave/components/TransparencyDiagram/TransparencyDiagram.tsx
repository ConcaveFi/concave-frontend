import { Box, Button, Flex, VStack } from '@concave/ui'
import { useState } from 'react'
import ReactFlow, { ConnectionLineType, Controls } from 'react-flow-renderer'
import { bondingEdges } from './edges/bondingEdges'
import { edgeStyle, labelStyle } from './edges/edgeStyles'
import { generalEdges } from './edges/generalEdges'
import { stakingEdges } from './edges/stakingEdges'
import { bondingNodes, generalNodes, nodeTypes, stakingNodes } from './nodes/nodes'

const SelectionButton = ({ diagramShown, setDiagramShown, chartId, chartName }) => (
  <Button
    variant={diagramShown === chartId ? 'primary.outline' : 'secondary'}
    size={'lg'}
    disabled={diagramShown === chartId}
    onClick={() => setDiagramShown(chartId)}
  >
    {chartName} Diagram
  </Button>
)

export function TransparencyDiagram() {
  const [diagramShown, setDiagramShown] = useState<0 | 1 | 2>(0)

  return (
    <>
      <VStack
        width={'80%'}
        h="100%"
        maxHeight="1080px"
        rounded={'2xl'}
        apply="background.metalBrighter"
        shadow={'up'}
        p={5}
        gap={5}
      >
        <Box display={'flex'} flexDirection={'row'} gap={'1rem'}>
          <SelectionButton
            chartId={0}
            chartName={'General'}
            diagramShown={diagramShown}
            setDiagramShown={setDiagramShown}
          />
          <SelectionButton
            chartId={1}
            chartName={'Bonding'}
            diagramShown={diagramShown}
            setDiagramShown={setDiagramShown}
          />
          <SelectionButton
            chartId={2}
            chartName={'Staking'}
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
            <ReactFlow
              edges={generalEdges}
              nodes={generalNodes}
              nodeTypes={nodeTypes}
              elevateEdgesOnSelect
              onNodeClick={(e, n) => {
                console.log(e, n)
              }}
              fitView
              fitViewOptions={{ padding: 0.05, includeHiddenNodes: false }}
              defaultEdgeOptions={{
                type: ConnectionLineType.SimpleBezier,
                style: { ...edgeStyle },
                labelStyle: { ...labelStyle },
                labelShowBg: false,
              }}
            >
              <Controls showInteractive={false} />
            </ReactFlow>
          )}
          {diagramShown === 1 && (
            <ReactFlow
              edges={bondingEdges}
              nodes={bondingNodes}
              nodeTypes={nodeTypes}
              elevateEdgesOnSelect
              onNodeClick={(e, n) => {
                console.log(e, n)
              }}
              fitView
              fitViewOptions={{ padding: 0.05, includeHiddenNodes: false }}
              defaultEdgeOptions={{
                type: ConnectionLineType.SimpleBezier,
                style: { ...edgeStyle },
                labelStyle: { ...labelStyle },
                labelShowBg: false,
              }}
            >
              <Controls showInteractive={false} />
            </ReactFlow>
          )}
          {diagramShown === 2 && (
            <ReactFlow
              edges={stakingEdges}
              nodes={stakingNodes}
              nodeTypes={nodeTypes}
              elevateEdgesOnSelect
              onNodeClick={(e, n) => {
                console.log(e, n)
              }}
              fitView
              fitViewOptions={{ padding: 0.05, includeHiddenNodes: false }}
              defaultEdgeOptions={{
                type: ConnectionLineType.SimpleBezier,
                style: { ...edgeStyle },
                labelStyle: { ...labelStyle },
                labelShowBg: false,
              }}
            >
              <Controls showInteractive={false} />
            </ReactFlow>
          )}
        </Flex>
      </VStack>
    </>
  )
}
