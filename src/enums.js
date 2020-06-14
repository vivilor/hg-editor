export const InputName = {
  Clear: 'Clear',
  PlaceCircle: 'PlaceCircle',
  AddNode: 'AddNode',
  RemoveNode: 'RemoveNode',
  MoveNode: 'MoveNode',
  AddEdge: 'AddEdge',
  RemoveEdge: 'RemoveEdge',
  WithSubEdge: 'WithSubEdge',
  Load: 'Load',
  Save: 'Save',
  Export: 'Export',
  Import: 'Import'
}

export const STATE_BUTTONS = [
  { key: InputName.AddNode, title: '+Node' },
  { key: InputName.RemoveNode, title: '-Node' },
  { key: InputName.MoveNode, title: '<->Node' },
  { key: InputName.AddEdge, title: '+Edge' },
  { key: InputName.RemoveEdge, title: '-Edge' }
]

export const ACTION_BUTTONS = [
  { key: InputName.Clear, title: 'Clear' },
  { key: InputName.PlaceCircle, title: 'To Circle' },
  { key: InputName.Load, title: 'Load' },
  { key: InputName.Save, title: 'Save' },
  { key: InputName.Export, title: 'Export' },
]
