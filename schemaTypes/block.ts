import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'widget',
  title: 'Widget',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'area',
      title: 'Area',
      type: 'string',
      initialValue: 'introduction',
      options: {
        list: [
          {title: 'Introduction', value: 'introduction'},
          {title: 'Current Interest', value: 'current_interest'},
          {title: 'Services', value: 'services'},
          {title: 'Posts', value: 'posts'},
          {title: 'Contact', value: 'contact'},
        ],
      },
    }),
  ],
})
