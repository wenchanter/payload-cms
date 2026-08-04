import type { CollectionConfig } from 'payload'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { CodeBlock } from '../blocks/Code'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'createdAt'], // 后台列表默认显示的列
  },
  access: {
    read: () => true, // 允许前端公开读取文章
  },
  fields: [
    {
        name: 'title',
        type: 'text',
        required: true,
    },
    {
        name: 'slug',
        type: 'text',
        required: true,
        unique: true,
    },
    {
        name: 'subtitle',
        type: 'text',
        required: true,
    },
    {
        name: 'description',
        type: 'text',
        required: true,
    },
    {
        name: 'author',
        type: 'relationship',
        relationTo: 'users',
        required: true,
        admin: {
            sortOptions: 'name',
        },
    },
    {
        name: 'tags',
        type: 'relationship',
        relationTo: 'tags',
        hasMany: true,
    },
    {
        name: 'content',
        type: 'richText',
        required: true,
        editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
                ...defaultFeatures,
                BlocksFeature({
                    blocks: [CodeBlock],
                }),
            ],
        }),
    },
    {
        name: 'status',
        type: 'select',
        defaultValue: 'draft',
        options: [
            {
                label: 'Draft',
                value: 'draft',
            },
            {
                label: 'Published',
                value: 'published',
            },
            {
                label: 'Trashed',
                value: 'trashed',
            },
        ],
        required: true,
    },
    {
        name: 'createdAt',
        type: 'date',
        defaultValue: () => new Date(),
        required: true,
    },
    {
        name: 'updatedAt',
        type: 'date',
        defaultValue: () => new Date(),
        required: true,
    },
    {
        name: 'publishedAt',
        type: 'date',
        defaultValue: () => new Date(),
    },
    {
        name: 'trashedAt',
        type: 'date',
        defaultValue: () => new Date(),
    },
    // Title added by default
    // Add more fields as needed
  ],
  hooks: {
    beforeChange: [
      async ({ data, originalDoc }) => {
        // 检查当前状态是否变更为 'trashed'
        // 同时防止重复更新（如果之前已经是 trashed 状态则不重置时间）
        if (data.status === 'trashed' && originalDoc?.status !== 'trashed') {
          return {
            ...data,
            trashedAt: new Date().toISOString(), // 自动更新为当前时间
          }
        }
        
        // 如果状态从 'trashed' 恢复为其他，也可以选择清空 trashedTime
        if (data.status && data.status !== 'trashed' && originalDoc?.status === 'trashed') {
          return {
            ...data,
            trashedAt: null,
          }
        }

        return data
      },
      async ({ data }) => {
        return {
          ...data,
          updatedAt: new Date().toISOString(), // 自动更新为当前时间
        }
      },
      async ({ data, originalDoc }) => {
        if (data.status === 'published' && originalDoc?.status !== 'published') {
          return {
            ...data,
            publishedAt: new Date().toISOString(), // 自动更新为当前时间
          }
        }

        if (data.status && data.status !== 'published' && originalDoc?.status === 'published') {
          return {
            ...data,
            publishedAt: null,
          }
        }
      },
    ],
  },
}
