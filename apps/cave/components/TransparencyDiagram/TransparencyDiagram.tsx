import ReactFlow, { ConnectionLineType } from 'react-flow-renderer'
import { edges, edgeStyle, labelStyle } from './edges'
import { nodes, nodeTypes } from './nodes'

export function TransparencyDiagram() {
  return (
    <ReactFlow
      edges={edges}
      nodes={nodes}
      nodeTypes={nodeTypes}
      panOnDrag={false}
      zoomOnDoubleClick={false}
      zoomOnPinch={false}
      zoomOnScroll={false}
      elevateEdgesOnSelect
      onNodeClick={(e, n) => {
        console.log(e, n)
      }}
      fitView
      fitViewOptions={{ padding: 0, includeHiddenNodes: false }}
      defaultEdgeOptions={{
        type: ConnectionLineType.SimpleBezier,
        style: { ...edgeStyle },
        labelStyle: { ...labelStyle },
        labelShowBg: false,
      }}
    />
  )
}
