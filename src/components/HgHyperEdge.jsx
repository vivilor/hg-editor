import React from 'react'
import { nodesByIds } from '../utils'

const dAttr = nodes => nodes
  .map(({ x, y }, i, arr) => `${i ? 'L' : 'M'} ${x} ${y}${i === arr.length - 1 ? ' Z' : ''}`)
  .join(' ')

export const HgHyperEdge = ({ edge, nodes }) => {
  const edgeNodes = nodesByIds(nodes, edge.nodeIds)

  return edgeNodes.length > 2
    ? (
      <path
        data-hyper-edge-id={edge.id}
        d={dAttr(edgeNodes)}
        fill="magenta"
        stroke="magenta"
        strokeLinejoin="round"
        strokeWidth="30"
        opacity="0.2"
      />
    )
    : null
}
