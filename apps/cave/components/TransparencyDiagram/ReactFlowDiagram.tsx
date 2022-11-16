import { useRef } from 'react'
import ReactFlow, { ConnectionLineType, Controls, ReactFlowInstance } from 'react-flow-renderer'
import { nodeTypes } from './nodes/nodes'
import { edgeStyle, labelStyle } from './styles'

export const ReactFlowDiagram = ({ edges, nodes, isMobile }) => {
  const reactFlow = useRef<ReactFlowInstance>()
  const onInit = (rf: ReactFlowInstance) => {
    reactFlow.current = rf
  }
  reactFlow?.current?.fitView
  return (
    <>
      <ReactFlow
        edges={edges}
        nodes={nodes}
        nodeTypes={nodeTypes}
        elevateEdgesOnSelect
        fitViewOptions={{ padding: 0.05, includeHiddenNodes: true }}
        fitView
        minZoom={0}
        zoomOnPinch
        panOnDrag
        onInit={onInit}
        attributionPosition={'bottom-right'}
        defaultEdgeOptions={{
          type: ConnectionLineType.SimpleBezier,
          animated: true,
          style: { ...edgeStyle },
          labelStyle: { ...labelStyle },
          labelShowBg: false,
        }}
      >
        {isMobile ? <></> : <Controls showInteractive={true} />}
      </ReactFlow>
    </>
  )
}
