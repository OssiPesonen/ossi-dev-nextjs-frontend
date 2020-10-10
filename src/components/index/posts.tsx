import React from 'react'

// App
import Link from 'next/link'
import { useSelector } from 'react-redux'

// Types
import { Article, Post, Showcase, Tag } from '@/assets/types'

type PostsProps = {
  hideDescription?: boolean
  openPostId?: number
}

const Posts = (props: PostsProps) => {
  const { hideDescription, openPostId } = props
  
  const app = useSelector(state => state.app)
  
  return !app.posts ? <></> : (
    <div id="posts" className="section-container">
      <div className="container" style={{ maxWidth: hideDescription ? '768px' : '1140px' }}>
        <div className="row">
          {hideDescription ? <></> : (
            <div className="col-md-5">
              <h4 className="section-title">
                <i className="fa fa-caret-up text-secondary mr-2" aria-hidden="true"/> Posts
              </h4>
              <h2>Blog posts and articles</h2>
              <p className="text-gray">You can find everything I've posted on my blog or Medium accounts right here.</p>
            </div>
          )}
          <div className={hideDescription ? 'col-md-12' : 'col-md-7'}>
            <h4 className="section-title mt-4 mt-md-0s">
              <i className="fa fa-caret-up text-secondary mr-2" aria-hidden="true"/> Blog
            </h4>
            <div id="posts-list" className="pl-md-4 mb-md-4">
              {app.posts.map((post: Post) => {
                const published = new Date(post.published_at)
                const readableDate = published.toDateString()
                
                return (
                  <Link href='/post/[slug]' as={`/post/${post.Slug}`} key={post.id}>
                    <a className={openPostId && openPostId === post.id ? 'active' : ''}>
                      <article className="post" key={post.id}>
                        <header className="content">
                          <h3>{post.Title}</h3>
                        </header>
                        <footer>
                          <time>{readableDate}</time>
                        </footer>
                      </article>
                    </a>
                  </Link>
                )
              })}
            </div>
            <div className="text-right">
              <Link href="/posts"><a>Explore more <i className="ml-2 fa fa-arrow-right" aria-hidden="true"/></a></Link>
            </div>
            <h4 className="section-title mt-4">
              <i className="fa fa-caret-up text-secondary mr-2" aria-hidden="true"/> Medium.com
            </h4>
            <div id="posts-list" className="medium pl-md-4 mb-md-4">
              {!app.articles ? <>No articles</> : app.articles.map((article: Article) => {
                const published = new Date(article.published_at)
                const readableDate = published.toDateString()
                
                return (
                  <a href={article.link} target="_blank" key={article.id}>
                    <article className="post">
                      <header className="content">
                        <h3>{article.title}</h3>
                      </header>
                      <footer>
                        <time>{readableDate}</time>
                        <span className="ml-4 text-secondary">Medium.com</span>
                      </footer>
                    </article>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Posts
