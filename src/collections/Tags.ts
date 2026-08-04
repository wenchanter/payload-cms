import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
        name: 'name',
        type: 'text',
        required: true,
        unique: true,
    },
    {
        name: 'description',
        type: 'text',
        required: true,
    },
    // Name added by default
    // Add more fields as needed
  ],
}