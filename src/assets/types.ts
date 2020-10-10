type ContentType = {
  id: number,
  created_at: string,
  updated_at: string,
  published_at?: string
}

export type Tag = {
  id: number
  Tag: string
  created: string
  updated_at: string
  showcase: number
  BackgroundColor: string
  TextColor: string
}

type ImageBase = {
  id: number
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  hash: string
  ext: '.jpg' | '.png' | '.gif' | '.svg'
  mime: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/svg+xml'
  size: number
  path: null
  url: string
}

type ImageFormats = {
  thumbnail: ImageBase
  large: ImageBase
  medium: ImageBase
  small: ImageBase
}

interface Image extends ImageBase {
  formats: ImageFormats
  previewUrl: null | string
  provider: string
  provider_metadata: null | string
}

export interface Link extends ContentType {
  Title: string
  Link: string
  Icon: string
}

export interface Showcase extends ContentType {
  Title: string
  Slug: string
  Content: string
  Labels: String
  Cover: Image
  Thumbnail: Image
  tags: Tag[]
}

export interface Post extends ContentType {
  Title: string
  Slug: string
  Content: string
  Excerpt: string
  Cover: Image
}

export interface Article extends ContentType {
  title: string
  description: string
  link: string
}

export interface Employment extends ContentType {
  Employer: string
  JobTitle: string
  JobDescription: string
  StartDate: string
  EndDate: string
}

export interface Block extends ContentType {
  Area: string
  Description: string
  Content: string
}
