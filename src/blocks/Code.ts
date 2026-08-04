import type { Block } from 'payload'

export const CodeBlock: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  labels: {
    singular: '代码块',
    plural: '代码块',
  },
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      required: true,
      options: [
        { label: 'TypeScript', value: 'typescript' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TSX', value: 'tsx' },
        { label: 'JSX', value: 'jsx' },
        { label: 'Python', value: 'python' },
        { label: 'Go', value: 'go' },
        { label: 'Rust', value: 'rust' },
        { label: 'Java', value: 'java' },
        { label: 'SQL', value: 'sql' },
        { label: 'Shell', value: 'shell' },
        { label: 'JSON', value: 'json' },
        { label: 'YAML', value: 'yaml' },
        { label: 'HTML', value: 'html' },
        { label: 'CSS', value: 'css' },
        { label: 'Markdown', value: 'markdown' },
        { label: 'Plain Text', value: 'plaintext' },
      ],
    },
    {
      name: 'filename',
      type: 'text',
      admin: {
        description: '可选，显示在代码块顶部，例如 src/index.ts',
      },
    },
    {
      name: 'code',
      type: 'code',
      required: true,
      admin: {
        // 让 Monaco 按所选语言高亮
        language: 'typescript',
      },
    },
  ],
}
