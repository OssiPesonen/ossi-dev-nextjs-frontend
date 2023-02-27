interface Attributes {
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

interface ContentType<T> {
  id: number;
  attributes: Attributes & T;
}

interface TagAttributes {
  Tag: string;
  created: string;
  updated_at: string;
  showcase: number;
  BackgroundColor: string;
  TextColor: string;
}

export type Tag = ContentType<TagAttributes>;

type ImageBase = {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  hash: string;
  ext: ".jpg" | ".png" | ".gif" | ".svg";
  mime: "image/jpeg" | "image/png" | "image/gif" | "image/svg+xml";
  size: number;
  path: null;
  url: string;
};

type ImageFormats = {
  thumbnail: ImageBase;
  large: ImageBase;
  medium: ImageBase;
  small: ImageBase;
};

interface Image extends ImageBase {
  formats: ImageFormats;
  previewUrl: null | string;
  provider: string;
  provider_metadata: null | string;
}

interface LinkAttributes {
  Title: string;
  Link: string;
  Icon: string;
}

export type Link = ContentType<LinkAttributes>;

interface ShowcaseAttributes {
  Title: string;
  Slug: string;
  Content: string;
  Labels: String;
  Cover: {
    data: ContentType<Image>;
  };
  Thumbnail: {
    data: ContentType<Image>;
  };
  Tags: { 
    data: Tag[]
  };
}

export type Showcase = ContentType<ShowcaseAttributes>;

interface PostAttributes {
  Title: string;
  Slug: string;
  Content: string;
  Excerpt: string;
  Cover: {
    data: ContentType<Image>;
  };
}

export type Post = ContentType<PostAttributes>;

export interface ArticleAttributes {
  title: string;
  description: string;
  link: string;
}

export type Article = ContentType<ArticleAttributes>;

interface EmploymentAttributes {
  Employer: string;
  JobTitle: string;
  JobDescription: string;
  StartDate: string;
  EndDate: string;
}

export type Employment = ContentType<EmploymentAttributes>;

interface BlockAttributes {
  Area: string;
  Description: string;
  Content: string;
}

export type Block = ContentType<BlockAttributes>;
