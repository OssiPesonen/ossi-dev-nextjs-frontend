import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'employment',
  title: 'Employment',
  type: 'document',
  fields: [
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
    }),
    defineField({
      name: 'employer',
      title: 'Employer',
      type: 'string',
    }),
    defineField({
      name: 'jobDescription',
      title: 'Job Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
})
