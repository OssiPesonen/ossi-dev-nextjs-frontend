import React from "react";

// App
import Head from "next/head";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

// Assets
import { Post as PostType, Post } from "@/assets/types";

// Components
import Loading from "@/components/loading";
import Layout from "@/layouts/layout";
import Link from "next/link";
import { postsQuery, client } from "@/sanity/index";


type PostsArchiveProps = {
  posts: Array<PostType>;
};

const PostsArchive = ({ posts }: PostsArchiveProps) => {
  const router = useRouter();

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
                const published = new Date(post.publishedAt);
                const readableDate = published.toDateString();

                return (
                  <Link
                    href="/post/[slug]"
                    as={`/post/${post.slug.current}`}
                    key={post._id}
                  >
                    <article className="post" key={post._id}>
                      <header>
                        <h3>{post.title}</h3>
                      </header>
                      <footer>
                        <time>{readableDate}</time>
                      </footer>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      posts: await client.fetch(postsQuery())
    },
  };
}

export default PostsArchive;
