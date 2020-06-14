export const storeHgToLocalStorage = (nodes, edges, name = 'hg') => {
  if (!localStorage) return

  localStorage.setItem(name, JSON.stringify({ nodes, edges }))
}

export const restoreHgFromLocalStorage = (name = 'hg') => {
  const emptyHg = { nodes: [], edges: [] }

  if (!localStorage) return emptyHg

  const hg = localStorage.getItem(name)

  if (!hg) return emptyHg

  return JSON.parse(hg)
}

export const exportHgToJson = (nodes, edges, name = 'hg') => {
  const exporterElId = 'HiddenExporter'
  const exporterElTag = 'a'
  const fileName = `${name}.json`
  const fileStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify({ nodes, edges }))}`

  let exporterEl = document.getElementById(exporterElId)

  if (!exporterEl) {
    exporterEl = document.createElement(exporterElTag)
    exporterEl.setAttribute('id', exporterElId)
    exporterEl.setAttribute('style', 'display: none')
    document.body.appendChild(exporterEl)
  }

  exporterEl.setAttribute('href', fileStr)
  exporterEl.setAttribute('download', fileName)
  exporterEl.click()
}

export const importHgFromJson = () => {
  const elId = 'HiddenImporter'
  const elTag = 'input'

  let el = document.getElementById(elId)

  if (!el) {
    el = document.createElement(elTag)
    el.setAttribute('id', elId)
    el.setAttribute('type', 'file')
    el.setAttribute('accept', 'text/json, .json')
    el.setAttribute('style', 'display: none')
    document.body.appendChild(el)
  }

  el.click()
}
