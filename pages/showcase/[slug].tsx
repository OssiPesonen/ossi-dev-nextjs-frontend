import React, { useEffect, useState } from "react";

// App
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {useRouter} from "next/router";
import { ParsedUrlQuery } from "querystring";
import { get } from "lodash";
import { NextSeo } from "next-seo";

// Types
import { Showcase as ShowcaseType } from "@/assets/types";
import { setShowcases } from "@/store/reducers/appReducer";

// Components
import Layout from "@/layouts/layout";
import Loading from "@/components/loading";
import Showcases from "@/components/index/showcases";
import IconArrowLeft from "@/assets/icons/i-arrow-left";
import { RootState } from "@/store/rootReducer";
import { client, showcasesQuery } from "@/sanity/index";
import { PortableText } from "@portabletext/react";
import { myPortableTextComponents } from "@/sanity/portableComponents";

type ShowcaseProps = {
  showcases: Array<ShowcaseType>;
};

const Showcase = ({ showcases }: ShowcaseProps) => {
  const router = useRouter();
  const { slug } = router.query as ParsedUrlQuery;
  const [showcase, setShowcase] = useState<ShowcaseType>(null);
  const [title, setTitle] = useState<string>("");

  const app = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!app.showcases) {
      // Dispatch to state so they're available if not already
      dispatch(setShowcases(showcases));
    }

    // Find showcase data from the list. We do this because there are less than 10 showcases so we don't have to fetch
    // an individual one every time and save the cost of a network call
    const entry: ShowcaseType = showcases.find(
      (showcase: ShowcaseType) => showcase.slug.current === slug
    );

    if (entry) {
      setShowcase(entry);
      setTitle(`${entry.title} - Showcases - ossi.dev`);
    }
  }, [slug, showcases]);

  return (
    <Layout>
      {!showcase ? (
        <div
          className="container text-center justify-content-center align-items-center d-flex"
          style={{ minHeight: "100vh" }}
        >
          <Loading />
        </div>
      ) : (
        <>
          <Head>
            <title>{showcase.title} - Showcases - ossi.dev</title>
          </Head>
          <NextSeo
            title={title}
            description={get(showcase, "SEO.Description", "")}
            canonical={process.env.NEXT_PUBLIC_APP_URL + router.asPath}
            openGraph={{
              url: process.env.NEXT_PUBLIC_APP_URL + router.asPath,
              title: title,
              description: get(showcase, "SEO.Description", ""),
              images: [
                {
                  url: showcase.cover.asset.url
                },
              ],
            }}
          />
          <article id="showcase" className="container-md">
            <header className="mt-4">
              <Link href="/#showcases" className="back-to-frontpage">
                <IconArrowLeft /> Back to frontpage
              </Link>
              <h1>{showcase.title}</h1>
            </header>
            <section>
              <div className="cover-photo mb-4 full-bleed">
                <Image
                  src={ showcase.cover.asset.url }
                  alt={  showcase.cover.asset._id }
                  width="1100"
                  height="600"
                />
              </div>
              <div className="showcase-grid">
                <div className="tags">
                  {showcase.tags ? (
                    showcase.tags.map((tag) => (
                      <div className="tag" key={tag.title}>
                        {tag.title}
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
                <div className="showcase-content">
                  <PortableText value={showcase.content} components={myPortableTextComponents} />
                </div>
              </div>
            </section>
            <hr />
            <footer>
              <Link href="/#showcases" className="back-to-frontpage">
                <IconArrowLeft /> Back to frontpage
              </Link>
            </footer>
          </article>
          <Showcases hideDescription={true} openPostId={showcase._id} />
        </>
      )}
    </Layout>
  );
};

export async function getStaticPaths() {
  const showcases = await client.fetch(showcasesQuery());
  return { paths: showcases ? showcases.map((showcase: ShowcaseType) => `/showcase/${showcase.slug.current}`) : [], fallback: false };
}

export async function getStaticProps() {
  return {
    props: {
      showcases: await client.fetch(showcasesQuery()),
    },
  };
}

export default Showcase;
