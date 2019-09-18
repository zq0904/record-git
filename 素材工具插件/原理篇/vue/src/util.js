export const log = msg => {
  throw new Error(msg)
}
export const isTextNode = node => node.nodeType === 3
export const isElNode = node => node.nodeType === 1
export const toArray = linkArray => [].slice.call(linkArray)
export const isInstruction = attrName => attrName.startsWith('v-')
export const isEventInstruction = attrName => attrName.startsWith('@') || attrName.startsWith('v-on:')