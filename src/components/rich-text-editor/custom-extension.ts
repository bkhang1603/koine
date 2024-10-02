/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import { Node, mergeAttributes, RawCommands } from '@tiptap/core'

// export enum ColumnLayout {
//   SidebarLeft = 'sidebar-left',
//   SidebarRight = 'sidebar-right',
//   TwoColumn = 'two-column'
// }

// const CustomColumn = Node.create({
//   name: 'customColumn',
//   group: 'block',
//   content: 'block+',
//   defining: true,
//   isolating: true,

//   addAttributes() {
//     return {
//       layout: {
//         default: ColumnLayout.TwoColumn
//       }
//     }
//   },

//   parseHTML() {
//     return [
//       {
//         tag: 'div[data-type="custom-column"]'
//       }
//     ]
//   },

//   renderHTML({ HTMLAttributes }) {
//     return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'custom-column' }), 0]
//   },

//   addCommands() {
//     return {
//       setCustomColumn:
//         (layout = ColumnLayout.TwoColumn) =>
//         ({ chain }: { chain: any }) => {
//           return chain()
//             .insertContent({
//               type: this.name,
//               attrs: { layout },
//               content: [{ type: 'paragraph' }, { type: 'paragraph' }]
//             })
//             .run()
//         }
//     } as Partial<RawCommands>
//   }
// })

// export default CustomColumn

import { Node, RawCommands } from '@tiptap/core'

export enum ColumnLayout {
  SidebarLeft = 'sidebar-left',
  SidebarRight = 'sidebar-right',
  TwoColumn = 'two-column'
}

export const Columns = Node.create({
  name: 'columns',
  group: 'block',
  content: 'column{2}',
  defining: true,
  isolating: true,

  addAttributes() {
    return {
      layout: {
        default: ColumnLayout.TwoColumn
      }
    }
  },

  addCommands() {
    return {
      setColumns:
        () =>
        ({ commands }: { commands: any }) =>
          commands.insertContent(
            `<div data-type="columns"><div data-type="column"><p></p></div><div data-type="column"><p></p></div></div>`
          ),
      setLayout:
        (layout: ColumnLayout) =>
        ({ commands }: { commands: any }) =>
          commands.updateAttributes('columns', { layout }),
      deleteColumns:
        () =>
        ({ commands }: { commands: any }) =>
          commands.deleteParent()
    } as Partial<RawCommands>
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'columns', layout: `layout-${HTMLAttributes.layout}` }, 0]
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="columns"]'
      }
    ]
  }
})

export const Column = Node.create({
  name: 'column',
  content: 'block+',
  isolating: true,

  renderHTML() {
    return ['div', { 'data-type': 'column' }, 0]
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column"]'
      }
    ]
  }
})
