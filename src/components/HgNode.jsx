import React from 'react'

import './HgNode.css'

export const HgNode = ({ node, idx, selected }) => (
  <g className="HgNode">
    <circle
      className="HgNode__Point"
      data-node-id={node.id}
      cx={node.x}
      cy={node.y}
      r="7"
      fill={(selected || []).includes(node) ? 'cyan' : 'salmon'}
      stroke="black"
      strokeWidth="1"
    />
    <text className="Node__Caption" x={node.x} y={node.y} dy="-11" fill="black">{idx + 1}</text>
  </g>
)
