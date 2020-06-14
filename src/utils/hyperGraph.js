import { uuid } from './common'

export const createNode = (x, y, name = null, id = uuid()) => ({
  x, y, id,
  name: name || id,
})

export const createEdge = (nodeIds, id = uuid()) => ({
  id,
  nodeIds
})

export const nodesByIds = (nodes, nodeIds) => nodes.filter(({ id }) => nodeIds.includes(id))
