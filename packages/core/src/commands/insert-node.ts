import type { Attrs, ProseMirrorNode } from '@prosekit/pm/model'
import { TextSelection, type Command } from '@prosekit/pm/state'
import { insertPoint } from '@prosekit/pm/transform'

import { ProseKitError } from '../error'
import { getNodeType } from '../utils/get-node-type'

function insertNode(
  options:
    | {
        node: ProseMirrorNode
        pos?: number
        type?: undefined
        attrs?: undefined
      }
    | {
        node?: undefined
        pos?: number
        type: string
        attrs?: Attrs
      },
): Command {
  return (state, dispatch) => {
    const node = options.node
      ? options.node
      : options.type
        ? getNodeType(state.schema, options.type).createChecked(options.attrs)
        : null

    if (!node) {
      throw new ProseKitError('You must provide either a node or a type')
    }

    const insertPos = insertPoint(
      state.doc,
      options.pos ?? state.selection.to,
      node.type,
    )
    if (insertPos == null) return false

    if (dispatch) {
      const tr = state.tr.insert(insertPos, node)
      tr.setSelection(TextSelection.near(tr.doc.resolve(insertPos)))
      dispatch(tr)
    }
    return true
  }
}

export { insertNode }
