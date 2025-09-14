import React, { useEffect, useMemo } from "react";

// App
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
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
import { client, postsQuery } from "@/sanity/index";
import { myPortableTextComponents } from "@/sanity/portableComponents";
import { PortableText } from "@portabletext/react";

type PostProps = {
  posts: Array<PostType>;
};

const Post = ({ posts }: PostProps) => {
  // Redux

  const app = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const router = useRouter();
  const slug = router.query.slug;

  const post = useMemo(() => posts.find((p) => p.slug.current === slug), [posts]);

  useEffect(() => {
    if (!app.posts) {
      dispatch(setPosts(posts));
    }
  }, [app.posts]);

  const title: string = `${post.title} - Blog - ossi.dev`;
  
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
              url:post.mainImage.asset.url
            },
          ],
        }}
      />
      <article id="post" className="container-md">
        <header>
          <Link href="/#posts" className="back-to-frontpage">
            <IconArrowLeft /> Back to frontpage
          </Link>
          <h1>{post.title}</h1>
        </header>
        <section>
          <div className="cover-photo mb-4 full-bleed">
            <Image
              src={post.mainImage.asset.url}
              alt={post.mainImage.asset.assetId}
              width="1100"
              height="600"
            />
          </div>
          <div className="post-content">
            <PortableText value={post.body} components={myPortableTextComponents} />
          </div>
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
      <Posts hideDescription={true} openPostId={post._id} />
    </Layout>
  );
};

export async function getStaticPaths() {
  const posts = await client.fetch(postsQuery());
  return { paths: posts ? posts.map((p: PostType) => `/post/${p.slug.current}`) : [], fallback: false };
}

export async function getStaticProps() {
 const posts = await client.fetch(postsQuery());

  return {
    props: {
      posts: posts,
    },
  };
}

export default Post;
