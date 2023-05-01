import React from "react";

// App
import Link from "next/link";
import { useSelector } from "react-redux";

// Types
import { Article, Post } from "@/assets/types";
import IconCaretUp from "../../assets/icons/i-caret-up";
import IconArrowRight from "../../assets/icons/i-arrow-right";
import IconMedium from "@/assets/icons/i-medium";
import { RootState } from "@/store/rootReducer";

type PostsProps = {
  hideDescription?: boolean;
  openPostId?: number;
};

const Posts = (props: PostsProps) => {
  const { hideDescription, openPostId } = props;

  const app = useSelector((state: RootState) => state.app);

  return !app.posts ? (
    <></>
  ) : (
    <div id="posts" className="section-container">
      <div
        className="container-md"
        style={{ maxWidth: hideDescription ? "768px" : "1140px" }}
      >
        <div className="row">
          {hideDescription ? (
            <></>
          ) : (
            <div className="col-md-5">
              <h2 className="section-title">
                <IconCaretUp /> Posts
              </h2>
              <h3>Blog Posts, Articles and Tweets</h3>
              <p className="text-gray">
                You can find everything I&apos;ve posted on my blog and links to
                some of my Medium articles right here. Below I&apos;ve embedded
                my Twitter feed, which is where I&apos;ll sometimes post random
                stuff that I&apos;m too lazy to write a blog post about.
              </p>
              <h3 style={{ marginTop: "2rem" }}>Twitter</h3>
              <a
                className="twitter-timeline"
                data-width="500"
                data-height="540"
                data-theme="dark"
                href="https://twitter.com/OssiDev?ref_src=twsrc%5Etfw"
              >
                Tweets by OssiDev
              </a>
            </div>
          )}
          <div
            className={`${
              hideDescription ? "col-md-12" : "col-md-7"
            } mt-4 mt-md-0`}
          >
            
            <h4 className="section-title mt-4">
              <IconCaretUp /> Medium.com & Dev.to
            </h4>
            <div className="medium pl-md-4 mb-md-4">
              <p>
                I write more non-personal and in-depth articles at{" "}
                <a
                  href="https://medium.com/@rcls"
                  target="_blank"
                  rel="noreferrer"
                >
                  Medium.com
                </a>{" "}
                and{" "}
                <a href="https://dev.to/rcls" target="_blank" rel="noreferrer">
                  Dev.to
                </a>
              </p>
            </div>
            <h4 className="section-title mt-4">
              <IconCaretUp /> Blog posts
            </h4>
            <div id="posts-list" className="pl-md-4 mb-md-4">
              {app.posts.map((post: Post) => {
                const published = new Date(post.attributes.publishedAt);
                const readableDate = published.toDateString();

                return (
                  <Link
                    href="/post/[slug]"
                    as={`/post/${post.attributes.Slug}`}
                    key={post.id}
                    className={
                      openPostId && openPostId === post.id ? "active" : ""
                    }
                    aria-label={post.attributes.Title}
                  >
                    <article className="post" key={post.id}>
                      <header className="content">
                        <h3>{post.attributes.Title}</h3>
                      </header>
                      <section className="read-more-icon">
                        <IconArrowRight />
                      </section>
                      <footer>
                        <time>{readableDate}</time>
                      </footer>
                    </article>
                  </Link>
                );
              })}
            </div>
            <div className="text-right explore-more-link">
              <Link href="/posts">
                Explore more <IconArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
