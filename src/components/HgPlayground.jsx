import React from 'react'

import './HgPlayground.css'
import { HgNode } from './HgNode'
import { HgEdge } from './HgEdge'
import { HgHyperEdge } from './HgHyperEdge'

export const HgPlayground = ({ nodes, edges, cb, selectedNodes }) => (
  <svg
    id="HgPlayground"
    className="HgPlayground"
    width="100%"
    height="400px"
    onMouseUp={cb.onMouseUp}
    onMouseDown={cb.onMouseDown}
    onMouseMove={cb.onMouseMove}
    onMouseEnter={cb.onMouseEnter}
    onMouseLeave={cb.onMouseLeave}
  >
    <g className="HgPlayground__HyperEdgeLayer">
      {edges.filter(edge => edge.nodeIds.length > 2).map(hyperEdge =>
        <HgHyperEdge key={hyperEdge.id} edge={hyperEdge} nodes={nodes} />
      )}
    </g>
    <g className="HgPlayground__EdgeLayer">
      {edges.filter(edge => edge.nodeIds.length < 3).map(edge =>
        <HgEdge key={edge.id} edge={edge} nodes={nodes} />
      )}
    </g>
    <g className="HgPlayground__NodeLayer">
      {nodes.map((node, idx) =>
        <HgNode key={node.id} node={node} idx={idx} selected={selectedNodes}/>
      )}
    </g>
  </svg>
)
