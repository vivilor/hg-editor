// noinspection SpellCheckingInspection
export const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
  // eslint-disable-next-line no-mixed-operators
  let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
  return v.toString(16)
})

export const onlyId = ({ id }) => id
