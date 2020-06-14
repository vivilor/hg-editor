import React from 'react'
import { nodesByIds } from '../utils'

const posAttrs = ([p1, p2]) => ({
  x1: p1.x,
  y1: p1.y,
  x2: p2.x,
  y2: p2.y
})

export const HgEdge = ({ edge, nodes }) => {
  const edgeNodes = nodesByIds(nodes, edge.nodeIds)

  return edgeNodes.length === 2
    ? (
      <line
        { ...posAttrs(edgeNodes)}
        data-edge-id={edge.id}
        stroke="blue"
        strokeWidth="8"
      />
    )
    : null
}
