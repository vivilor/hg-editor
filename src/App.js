import React from 'react'
import './App.css'
import { Toolbar } from './components/Toolbar'
import { InputName } from './enums'
import { HgPlayground } from './components/HgPlayground'
import { createEdge, createNode, onlyId } from './utils'
import { exportHgToJson, restoreHgFromLocalStorage, storeHgToLocalStorage } from './utils/localStorage'

const isNull = a => a === null

const pgX = pgPos => x => x ? x - pgPos.x : null
const pgY = pgPos => y => y ? y - pgPos.y : null

const mousePosToStr = ({ x, y }) => !isNull(x) && !isNull(y)
  ? `${x}; ${y}`
  : `N/A`

const compareSign = ({ length: x }, { length: r }) => x > r + 1
  ? '>'
  : x < r + 1
    ? '<'
    : '='

const createCoordsReplacerFn = nodes => {
  const pg = document.getElementById('HgPlayground').getBoundingClientRect()

  const n = nodes.length
  const w = pg.width
  const h = pg.height

  const { cos, sin, PI } = Math

  const dPhi = 2 * PI / n

  const cx = w / 2
  const cy = h / 2
  const r = cy - 25

  return (node, i) => ({
    ...node,
    x: cx + r * cos(i * dPhi),
    y: cy + r * sin(i * dPhi)
  })
}

class App extends React.Component {
  constructor(props = {}) {
    super(props)

    this.pgX = v => v
    this.pgY = v => v

    this.state = {
      mode: null,
      withSubEdge: false,
      mousePos: { x: null, y: null },
      pgPos: { x: null, y: null },
      movingNodeIdx: -1,
      selectedNodesForEdge: [],
      nodes: [],
      edges: []
    }

    this.onInputClick = this.onInputClick.bind(this)
    this.onGlobalKeyDown = this.onGlobalKeyDown.bind(this)
    this.onPlaygroundMouseUp = this.onPlaygroundMouseUp.bind(this)
    this.onPlaygroundMouseDown = this.onPlaygroundMouseDown.bind(this)
    this.onPlaygroundMouseMove = this.onPlaygroundMouseMove.bind(this)
    this.onPlaygroundMouseEnter = this.onPlaygroundMouseEnter.bind(this)
    this.onPlaygroundMouseLeave = this.onPlaygroundMouseLeave.bind(this)
  }

  onGlobalKeyDown (ev) {
    const { mode, selectedNodesForEdge, nodes, edges } = this.state

    console.log(ev.keyCode, mode)

    switch (ev.keyCode) {
      case 13: // Enter
        switch (mode) {
          case InputName.AddEdge:
            if (!selectedNodesForEdge.length) break

            const newEdges = [createEdge(selectedNodesForEdge.map(onlyId))]

            this.setState({
              edges: [...edges, ...newEdges],
              selectedNodesForEdge: []
            })
            break
          default:
            break
        }
        break
      case 86:
        storeHgToLocalStorage(nodes, edges)
        break
      default:
        break
    }
  }

  componentDidMount() {
    const pg = document.getElementById('HgPlayground').getBoundingClientRect()

    document.addEventListener('keydown', this.onGlobalKeyDown)

    const pgPos = { x: pg.left, y: pg.top }

    this.pgX = pgX(pgPos)
    this.pgY = pgY(pgPos)

    this.setState({ pgPos })
  }

  onInputClick(actionKey) {
    const { nodes, edges } = this.state

    switch (actionKey) {
      case InputName.AddNode:
        this.setState({ mode: this.state.mode === actionKey ? null : actionKey })
        break
      case InputName.RemoveNode:
        this.setState({ mode: this.state.mode === actionKey ? null : actionKey })
        break
      case InputName.MoveNode:
        this.setState({ mode: this.state.mode === actionKey ? null : actionKey })
        break
      case InputName.AddEdge:
        this.setState({
          mode: this.state.mode === actionKey ? null : actionKey,
          selectedNodesForEdge: []
        })
        break
      case InputName.RemoveEdge:
        this.setState({ mode: this.state.mode === actionKey ? null : actionKey })
        break
      case InputName.WithSubEdge:
        this.setState({ withSubEdge: !this.state.withSubEdge })
        break
      case InputName.Clear:
        this.setState({ nodes: [], edges: [], mode: null, selectedNodesForEdge: [] })
        break
      case InputName.Load:
        this.setState({ ...restoreHgFromLocalStorage() })
        break
      case InputName.PlaceCircle:
        this.setState({ nodes: nodes.map(createCoordsReplacerFn(nodes)) })
        break
      case InputName.Save:
        storeHgToLocalStorage(nodes, edges)
        break
      case InputName.Export:
        exportHgToJson(nodes, edges)
        break
      default:
        break
    }
  }

  onPlaygroundMouseEnter () {

  }

  onPlaygroundMouseLeave () {
    this.setState({ mousePos: { x: null, y: null }})
  }

  onPlaygroundMouseMove (ev) {
    const { mode, nodes, movingNodeIdx } = this.state
    const { clientX, clientY } = ev

    // console.log(clientX, clientY)

    const newState = {}

    switch (mode) {
      case InputName.MoveNode:
        if (movingNodeIdx < 0) break

        const movingNode = nodes[movingNodeIdx]

        movingNode.x = this.pgX(clientX)
        movingNode.y = this.pgY(clientY)

        nodes.splice(movingNodeIdx, 1, movingNode)

        Object.assign(newState, { nodes })
        break
      default:
        break
    }

    Object.assign(newState, { mousePos: { x: ev.clientX, y: ev.clientY } })

    this.setState(newState)
  }

  onPlaygroundMouseUp (ev) {
    const { mode, nodes, edges, selectedNodesForEdge } = this.state
    const { clientX, clientY, target } = ev

    let newState = {}

    switch (mode) {
      case InputName.AddNode:
        if (target.nodeName === 'svg') {
          const newNode = createNode(this.pgX(clientX), this.pgY(clientY))

          Object.assign(newState, { nodes: [...nodes, newNode] })
        }
        break
      case InputName.MoveNode:
        Object.assign(newState, { movingNodeIdx: -1 })
        break
      case InputName.AddEdge:
        if (target.nodeName === 'circle') {
          const selectedNodeId = target.dataset.nodeId
          const selectedNode = nodes.find(node => node.id === selectedNodeId)

          Object.assign(newState, {
            selectedNodesForEdge: [...selectedNodesForEdge, selectedNode]
          })
        }
        break
      case InputName.RemoveNode:
        if (target.nodeName === 'circle') {
          const removingNodeId = target.dataset.nodeId

          Object.assign(newState, {
            nodes: nodes.filter(node => node.id !== removingNodeId),
          })
        }
        break
      case InputName.RemoveEdge:
        let removingEdgeId = null

        if (target.nodeName === 'path') {
          removingEdgeId = target.dataset.hyperEdgeId
        } else if (target.nodeName === 'line') {
          removingEdgeId = target.dataset.edgeId
        }

        if (!removingEdgeId) break

        Object.assign(newState, {
          edges: edges.filter(edge => edge.id !== removingEdgeId)
        })
        break
      default:
        break
    }

    this.setState(newState)
  }
  onPlaygroundMouseDown (ev) {
    console.log({ t: ev.target })

    const { mode, nodes } = this.state
    const { target } = ev

    const newState = {}

    switch (mode) {
      case InputName.MoveNode:
        if (target.nodeName === 'circle') {
          const movingNodeId = target.dataset.nodeId
          const movingNodeIdx = nodes.findIndex(node => node.id === movingNodeId)

          Object.assign(newState, { movingNodeIdx })
        }
        break
      default:
        break
    }

    this.setState(newState)
  }


  render () {
    const { mode, nodes, edges, withSubEdge, mousePos, selectedNodesForEdge } = this.state

    return (
      <div className="App">
        <Toolbar
          mode={mode}
          withSubEdge={withSubEdge}
          cb={{ onInputClick: this.onInputClick }}
        />
        <div>|X={nodes.length}| {compareSign(nodes, edges)} |R={edges.length}| + 1</div>
        <HgPlayground
          nodes={nodes}
          edges={edges}
          selectedNodes={selectedNodesForEdge}
          cb={{
            onMouseUp: this.onPlaygroundMouseUp,
            onMouseDown: this.onPlaygroundMouseDown,
            onMouseMove: this.onPlaygroundMouseMove,
            onMouseEnter: this.onPlaygroundMouseEnter,
            onMouseLeave: this.onPlaygroundMouseLeave,
          }}
        />
        <div>
          {mousePosToStr({ x: this.pgX(mousePos.x), y: this.pgY(mousePos.y) })}
        </div>
      </div>
    );
  }
}

export default App;
