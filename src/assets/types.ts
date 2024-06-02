export interface Tag {
  _id: number;
  title: string;
}

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

interface SanityTag {
  title: string;
}

export interface Showcase {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  content: [];
  cover: SanityImageAsset;
  thumbnail: SanityImageAsset;
  tags: SanityTag[];
}

interface SanityImageAsset {
  _type: "image";
  asset: {
    _createdAt: string;
    _updatedAt: string;
    url: string;
    extension: string;
    mimeType: string;
    assetId: string;
    originalFilename: string;
    path: string;
    _id: string;
  };
}

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  body: [];
  mainImage: SanityImageAsset;
  publishedAt: string;
}

export interface Employment {
  _id: string;
  employer: string;
  jobTitle: string;
  jobDescription: [];
  startDate: string;
  endDate: string;
}

export interface Block {
  area: string;
  description: string;
  content: [];
}
