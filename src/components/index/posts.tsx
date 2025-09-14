import React from "react";

// App
import Link from "next/link";
import { useSelector } from "react-redux";

// Types
import { Post } from "@/assets/types";
import IconCaretUp from "../../assets/icons/i-caret-up";
import IconArrowRight from "../../assets/icons/i-arrow-right";
import { RootState } from "@/store/rootReducer";

type PostsProps = {
  hideDescription?: boolean;
  openPostId?: string;
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
              <p>
                I have written more non-personal and in-depth articles at{" "}
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
          )}
          <div
            className={`${
              hideDescription ? "col-md-12" : "col-md-7"
            } mt-4 mt-md-0`}
          >
            <h4 className="section-title mt-4">
              <IconCaretUp /> Blog posts
            </h4>
            <div id="posts-list" className="pl-md-4 mb-md-4">
              {app.posts.map((post: Post) => {
                const published = new Date(post.publishedAt);
                const readableDate = published.toDateString();

                return (
                  <Link
                    href="/post/[slug]"
                    as={`/post/${post.slug.current}`}
                    key={post._id}
                    className={
                      openPostId && openPostId === post._id ? "active" : ""
                    }
                    aria-label={post.title}
                  >
                    <article className="post" key={post._id}>
                      <header className="content">
                        <h3>{post.title}</h3>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
