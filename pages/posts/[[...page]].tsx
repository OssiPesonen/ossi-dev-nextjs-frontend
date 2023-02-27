import React, { useEffect, useState } from "react";

// App
import Head from "next/head";
import { get } from "lodash";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

// Assets
import { Post as PostType, Post } from "@/assets/types";

// Components
import Loading from "@/components/loading";
import Layout from "@/layouts/layout";
import Link from "next/link";
import IconArrowLeft from "../../src/assets/icons/i-arrow-left";
import IconArrowRight from "../../src/assets/icons/i-arrow-right";

const postLimitPerPage = 25;

type PostsArchiveProps = {
  posts: Array<PostType>;
  count: number;
  pageNumber: number;
};

const PostsArchive = ({ count, pageNumber, posts }: PostsArchiveProps) => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (count) {
      setHasPrevPage(pageNumber > 0);
      setHasNextPage(posts.length >= postLimitPerPage);
    }
  }, [count, pageNumber]);

  const PrevButton = () => {
    if (hasPrevPage) {
      return (
        <li className="prev">
          <Link href={`/posts/${pageNumber - 1 > 0 ? pageNumber - 1 : ""}`}>
            <IconArrowLeft /> Previous
          </Link>
        </li>
      );
    } else {
      return (
        <li className="prev text-muted">
          <span>
            <IconArrowLeft /> Previous
          </span>
        </li>
      );
    }
  };

  const NextButton = () => {
    if (hasNextPage) {
      return (
        <li className="next">
          <Link href={`/posts/${pageNumber + 1}`}>
              Next <IconArrowRight />
          </Link>
        </li>
      );
    } else {
      return (
        <li className="next text-muted">
          <span>
            Next <IconArrowRight />
          </span>
        </li>
      );
    }
  };

  return (
    <Layout>
      <div className="container mt-4 mb-4">
        <Head>
          <title>Blog Posts - ossi.dev</title>
        </Head>
        <NextSeo
          title={"Blog Posts - ossi.dev"}
          description={"My blog post archives"}
          canonical={process.env.NEXT_PUBLIC_APP_URL + router.asPath}
          openGraph={{
            url: process.env.NEXT_PUBLIC_APP_URL + router.asPath,
            title: "Blog Posts - ossi.dev",
            description: "My blog post archives",
          }}
        />
        <h1>Blog Posts</h1>
        {!posts ? (
          <Loading />
        ) : (
          <div id="posts" className="archive">
            <div id="posts-list">
              {posts.map((post: Post) => {
                const published = new Date(post.attributes.publishedAt);
                const readableDate = published.toDateString();

                return (
                  <Link
                    href="/post/[slug]"
                    as={`/post/${post.attributes.Slug}`}
                    key={post.id}
                  >
                    <article className="post" key={post.id}>
                      <header>
                        <h3>{post.attributes.Title}</h3>
                      </header>
                      <footer>
                        <time>{readableDate}</time>
                      </footer>
                    </article>
                  </Link>
                );
              })}
            </div>
            <ul className="pagination">
              {hasPrevPage && <PrevButton />}
              {hasNextPage && <NextButton />}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Fetch blog post count
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/blog-posts");
  const posts = await res.json();
  const pages = posts.meta.pagination.total;

  // Might arrive with no param which means it's page zero
  const paths = ["/posts"];

  // Get each possible route
  for (let i = 0; i < pages; i++) {
    paths.push(`/posts/${i}`);
  }

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // I might not be defined (page zero)
  const pageNumber = get(params, "page[0]", 0);

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/api/blog-posts?pagination[page]=${pageNumber}`
  );

  const posts = await res.json();
  const count = posts.meta.pagination.pageCount;

  return {
    props: {
      posts: posts.data,
      pageNumber,
      count,
    },
  };
}

export default PostsArchive;
