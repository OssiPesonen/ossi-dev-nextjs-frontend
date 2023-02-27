import React, { useEffect } from "react";

// App
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { get } from "lodash";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

// Assets
import { Post as PostType } from "@/assets/types";
import IconArrowLeft from "@/assets/icons/i-arrow-left";
import IconArchive from "@/assets/icons/i-archive";

// Redux
import { setPosts } from "@/store/reducers/appReducer";
import { RootState } from "@/store/rootReducer";

// components
import Layout from "@/layouts/layout";
import Posts from "@/components/index/posts";
import Contact from "@/components/index/contact";

type PostProps = {
  post: PostType;
  posts: Array<PostType>;
};

const Post = ({ post, posts }: PostProps) => {
  // Redux

  const app = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const router = useRouter();

  /**
   * Fetch posts list if user visits this page first
   */
  useEffect(() => {
    if (!app.posts) {
      dispatch(setPosts(posts));
    }
  }, [app.posts]);

  const title: string = `${post.attributes.Title} - Blog - ossi.dev`;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <NextSeo
        title={title}
        description={get(post, "SEO.Description", "")}
        canonical={process.env.NEXT_PUBLIC_APP_URL + router.asPath}
        openGraph={{
          url: process.env.NEXT_PUBLIC_APP_URL + router.asPath,
          title: title,
          description: get(post, "SEO.Description", ""),
          images: [
            {
              url: get(post, "Cover.data.attributes.url", null)
                ? process.env.NEXT_PUBLIC_API_URL +
                  post.attributes.Cover.data.attributes.url
                : "",
            },
          ],
        }}
      />
      <article id="post" className="container-md">
        <header>
          <Link href="/#posts" className="back-to-frontpage">
            <IconArrowLeft /> Back to frontpage
          </Link>
          <h1>{post.attributes.Title}</h1>
        </header>
        <section>
          <div className="cover-photo mb-4 full-bleed">
            {get(post, "attributes.Cover.data.attributes.url", null) ? (
              <Image
                src={
                  process.env.NEXT_PUBLIC_API_URL +
                  post.attributes.Cover.data.attributes.url
                }
                alt={post.attributes.Cover.data.attributes.alternativeText}
                width="1100"
                height="600"
              />
            ) : (
              <></>
            )}
          </div>
          <ReactMarkdown className="post-content">
            {post.attributes.Content}
          </ReactMarkdown>
        </section>
        <hr />
        <footer>
          <Link href="/#posts" className="back-to-frontpage">
            <IconArrowLeft /> Back to frontpage
          </Link>
          <Link href="/posts" className="ml-4">
            <IconArchive /> To archives
          </Link>
        </footer>
      </article>
      <Posts hideDescription={true} openPostId={post.id} />
      <Contact />
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/blog-posts?populate=*"
  );
  const posts = await res.json();
  let paths = [];

  if (posts) {
    paths = posts.data.map((post: PostType) => `/post/${post.attributes.Slug}`);
  }

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postsResponse = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      "/api/blog-posts?_limit=15&_sort=published_at:DESC&populate=*"
  );

  const posts: { data: Array<PostType> } = await postsResponse.json();

  const postResponse = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/api/blog-posts?populate=*&Slug=${params.slug}`
  );

  const singlePost: { data: PostType } = await postResponse.json();

  return {
    props: {
      post: get(singlePost.data, [0], null),
      posts: posts.data,
    },
  };
}

export default Post;
