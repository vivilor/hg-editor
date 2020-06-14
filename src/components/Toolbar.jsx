import React from 'react'

import { ACTION_BUTTONS, STATE_BUTTONS } from '../enums'

import './Toolbar.css'

export const ToolbarStateButton = ({ mode, name, title, cb }) => (
  <button className={['Toolbar__Button', mode === name ? 'Toolbar__Button--Current' : ''].join(' ')} onClick={() => cb.onInputClick(name)}>
    {title}
  </button>
)

export const ToolbarActionButton = ({ title, name, cb }) => (
  <button className="Toolbar__Button" onClick={() => cb.onInputClick(name)}>
    {title}
  </button>
)

export const Toolbar = ({ mode, withSubEdge, cb }) => (
  <header className="Toolbar">
    {STATE_BUTTONS.map(({ key, title }) =>
      <ToolbarStateButton mode={mode} key={key} name={key} title={title} cb={cb}/>
    )}
    {/*<label htmlFor="CreateSubEdgeCheckbox">Create sub edges</label>*/}
    {/*<input id="CreateSubEdgeCheckbox" type="checkbox" checked={withSubEdge} onChange={() => cb.onInputClick(InputName.WithSubEdge)} />*/}
    {ACTION_BUTTONS.map(({ key, title }) =>
      <ToolbarActionButton title={title} key={key} name={key} cb={cb} />
    )}
  </header>
)
