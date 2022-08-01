import ReactFlow, { ConnectionLineType } from 'react-flow-renderer'
import { edges, edgeStyle, labelStyle } from './edges'
import { nodes } from './nodes'

import { CylinderNode } from './CustomNodes/Cylinder'
import { DiamondNode } from './CustomNodes/Diamond'
import { FolderNode } from './CustomNodes/Folder'
import { RectangleNode } from './CustomNodes/Rectangle'
import { TriangleNode } from './CustomNodes/Triangle'

export const nodeTypes = {
  CylinderNode: CylinderNode,
  DiamondNode: DiamondNode,
  FolderNode: FolderNode,
  RectangleNode: RectangleNode,
  TriangleNode: TriangleNode,
}

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
      defaultEdgeOptions={{
        type: ConnectionLineType.SimpleBezier,
        style: { ...edgeStyle },
        labelStyle: { ...labelStyle },
        labelShowBg: false,
      }}
    />
  )
}
