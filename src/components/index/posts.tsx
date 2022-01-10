import React from 'react'

// App
import Link from 'next/link'
import { useSelector } from 'react-redux'

// Types
import { Article, Post } from '@/assets/types'
import IconCaretUp from '../../assets/icons/i-caret-up'
import IconArrowRight from '../../assets/icons/i-arrow-right'
import IconMedium from "@/assets/icons/i-medium";

type PostsProps = {
  hideDescription?: boolean
  openPostId?: number
}

const Posts = (props: PostsProps) => {
  const { hideDescription, openPostId } = props
  
  const app = useSelector(state => state.app)
  
  return !app.posts ? <></> : (
    <div id="posts" className="section-container">
      <div className="container-md" style={{ maxWidth: hideDescription ? '768px' : '1140px' }}>
        <div className="row">
          {hideDescription ? <></> : (
            <div className="col-md-5">
              <h2 className="section-title">
                <IconCaretUp/> Posts
              </h2>
              <h3>Blog Posts and Articles</h3>
              <p className="text-gray">You can find everything I've posted on my blog and links to some of my Medium articles right here.</p>
            </div>
          )}
          <div className={`${hideDescription ? 'col-md-12' : 'col-md-7'} mt-4 mt-md-0`}>
            <div id="posts-list" className="pl-md-4 mb-md-4">
              {app.posts.map((post: Post) => {
                const published = new Date(post.published_at)
                const readableDate = published.toDateString()
                
                return (
                  <Link href='/post/[slug]' as={`/post/${post.Slug}`} key={post.id}>
                    <a className={openPostId && openPostId === post.id ? 'active' : ''} aria-label={post.Title}>
                      <article className="post" key={post.id}>
                        <header className="content">
                          <h3>{post.Title}</h3>
                        </header>
                        <section className="read-more-icon">
                          <IconArrowRight/>
                        </section>
                        <footer>
                          <time>{readableDate}</time>
                        </footer>
                      </article>
                    </a>
                  </Link>
                )
              })}
            </div>
            <div className="text-right explore-more-link">
              <Link href="/posts"><a>Explore more <IconArrowRight/></a></Link>
            </div>
            <h4 className="section-title mt-4">
              <IconCaretUp/> Medium.com
            </h4>
            <div className="medium pl-md-4 mb-md-4">
              <p>I write more non-personal and in-depth articles at Medium.com The platform has put their API behind CloudFlare DDoS protection, and I'm too lazy to create some technical workaround to fetch the RSS feed,
                so instead use <a href="https://medium.com/@rcls" target="_blank" aria-label="Medium" rel="noreferrer">this link</a> to go to my Medium profile and browse my articles there :)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Posts
