import React, { useEffect, useState } from "react";

// App
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { get } from "lodash";
import { NextSeo } from "next-seo";

// Types
import { Showcase as ShowcaseType, Tag } from "@/assets/types";
import { setShowcases } from "@/store/reducers/appReducer";

// Components
import Layout from "@/layouts/layout";
import Loading from "@/components/loading";
import Showcases from "@/components/index/showcases";
import Contact from "@/components/index/contact";
import IconArrowLeft from "@/assets/icons/i-arrow-left";
import { RootState } from "@/store/rootReducer";
import { ImageComponent, ParagraphComponent } from "@/assets/react-markdown-renderers";

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
      (showcase: ShowcaseType) => showcase.attributes.Slug === slug
    );

    if (entry) {
      setShowcase(entry);
      setTitle(`${entry.attributes.Title} - Showcases - ossi.dev`);
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
            <title>{showcase.attributes.Title} - Showcases - ossi.dev</title>
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
                  url: get(showcase, "attributes.Cover.data.attributes.url", null)
                    ? process.env.NEXT_PUBLIC_API_URL +
                      showcase.attributes.Cover.data.attributes.url
                    : "",
                },
              ],
            }}
          />
          <article id="showcase" className="container-md">
            <header className="mt-4">
              <Link href="/#showcases" className="back-to-frontpage">
                <IconArrowLeft /> Back to frontpage
              </Link>
              <h1>{showcase.attributes.Title}</h1>
            </header>
            <section>
              <div className="cover-photo mb-4 full-bleed">
                {get(showcase, "attributes.Cover.data.attributes.url", null) ? (
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_API_URL +
                      showcase.attributes.Cover.data.attributes.url
                    }
                    alt={
                      showcase.attributes.Cover.data.attributes.alternativeText
                    }
                    width="1100"
                    height="600"
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="showcase-grid">
                <div className="tags">
                  {showcase.attributes.Tags.data ? (
                    showcase.attributes.Tags.data.map((tag) => (
                      <div className="tag" key={tag.id}>
                        {tag.attributes.Tag}
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
                <ReactMarkdown
                  className="showcase-content"
                  components={{
                    img: ImageComponent,
                    p: ParagraphComponent
                  }}
                >
                  {showcase.attributes.Content}
                </ReactMarkdown>
              </div>
            </section>
            <hr />
            <footer>
              <Link href="/#showcases" className="back-to-frontpage">
                <IconArrowLeft /> Back to frontpage
              </Link>
            </footer>
          </article>
          <Showcases hideDescription={true} openPostId={showcase.id} />
        </>
      )}
      <Contact />
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/showcases?populate=*");
  const showcases = await res.json();

  const paths = showcases.data.map(
    (showcase: ShowcaseType) => `/showcase/${showcase.attributes.Slug}`
  );
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/showcases?populate=*&Slug=${params.slug}`);
  const showcases = await res.json();

  return {
    props: {
      showcases: showcases.data,
    },
  };
}

export default Showcase;
