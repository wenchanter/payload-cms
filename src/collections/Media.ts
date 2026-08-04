import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    imageSizes: [
      {
        name: 'content',
        width: 1200, // 只限宽，高度按原图比例；正文列宽 600-700px 下够 2x 高清屏
        height: undefined,
        formatOptions: { format: 'webp', options: { quality: 82 } },
      },
    ],
  },
}
