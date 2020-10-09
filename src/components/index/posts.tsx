import React, { useEffect } from 'react'

// App
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { get } from 'lodash'

// Types
import { Post, Showcase, Tag } from '@/assets/types'
import Layout from '@/layouts/layout'

type PostsProps = {
  hideDescription?: boolean
  openPostId?: number
}

const Posts = (props: PostsProps) => {
  const { hideDescription, openPostId } = props
  
  const app = useSelector(state => state.app)
  
  // Todo: Fetch medium and twitter posts. Might need to create a custom endpoint in Strapi for this one.
  
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
            <div id="posts-list" className="pl-md-4">
              {app.posts.map((post: Post) => {
                const published = new Date(post.published_at)
                const readableDate = published.toDateString() + ' '
                  + ('0' + published.getHours()).slice(-2) + ':'
                  + ('0' + published.getMinutes()).slice(-2)
                
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
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default Posts
