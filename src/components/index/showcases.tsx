import React from "react";

// App
import Link from "next/link";
import { useSelector } from "react-redux";
import { get } from "lodash";

// Types
import { Showcase, Tag } from "@/assets/types";

// Redux
import IconCaretUp from "../../assets/icons/i-caret-up";
import { RootState } from "@/store/rootReducer";

type ShowcasesProps = {
  hideDescription?: boolean;
  openPostId?: number;
};

const Showcases = (props: ShowcasesProps) => {
  const { hideDescription, openPostId } = props;
  const app = useSelector((state: RootState) => state.app);

  return !app.showcases ? (
    <></>
  ) : (
    <div
      id="showcases"
      className={`section-container${hideDescription ? " on-single-page" : ""}`}
    >
      <div className="container-md">
        {hideDescription ? (
          <></>
        ) : (
          <>
            <h2 className="section-title">
              <IconCaretUp /> Showcases
            </h2>
            <h3>Selected Projects</h3>
            <p className="text-gray">
              You can click on each project to read about the story behind them.
            </p>
          </>
        )}
        <div id="showcases-grid">
          {hideDescription ? <h2>Other showcases</h2> : <></>}
          <div className="row">
            {app.showcases.map((showcase: Showcase) => {
              if (openPostId && showcase.id === openPostId) return false;

              return (
                <Link
                  href="/showcase/[slug]"
                  as={`/showcase/${showcase.attributes.Slug}`}
                  key={showcase.id}
                  className="col-12 col-sm-6 col-md-4 showcase-container"
                  aria-label={`Showcase ${showcase.attributes.Title}`}
                >
                  <article className="showcase" key={showcase.id}>
                    <header>
                      {get(showcase, "Thumbnail.url", false) ? (
                        <img
                          className="showcase-thumbnail"
                          src={
                            process.env.NEXT_PUBLIC_API_URL +
                            showcase.attributes.Thumbnail.url
                          }
                          alt={showcase.attributes.Thumbnail.alternativeText}
                          loading="lazy"
                          width="350"
                          height="350"
                        />
                      ) : (
                        <></>
                      )}
                    </header>
                    <section className="content">
                      <h4>{showcase.attributes.Title}</h4>
                      {showcase.attributes.tags ? (
                        showcase.attributes.tags.map((tag: Tag) => (
                          <div className="tag" key={tag.id}>
                            {tag.attributes.Tag}
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </section>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcases;
