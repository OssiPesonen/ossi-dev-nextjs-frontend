import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "imfphgq6",
  dataset: "production",
  apiVersion: "2024-03-11",
  // Set to `true` for production environments
  useCdn: false,
});

// Fetch content with GROQ
export function postsQuery() {
  return `*[_type == "post"] | order(publishedAt desc) {
    _id,
    publishedAt,
    title,
    slug,
    mainImage {
      ...,
      asset->
    },
    tags[],
    body
  }
  `;
}

export function showcasesQuery() {
  return `*[_type == "showcase"] {
    _id,
    title,
    slug,
    cover {
      ...,
      asset->
    },
    thumbnail {
      ...,
      asset->
    },
    tags[] -> {title},
    content
  }
  `;
}

export function employmentsQuery() {
  return `*[_type == "employment"] | order(order desc) {
    _id,
    jobTitle,
    employer,
    jobDescription,
    startDate,
    endDate,
    content
  }
  `;
}

export function widgetsQuery() {
  return `*[_type == "widget"] {
    _id,
    description,
    content,
    area
  }
  `;
}


export function tagsQuery() {
  return `*[_type == "tag"] | order(title asc) {
    _id,
    title
  }
  `;
}
