import React, { useEffect, useState } from 'react'

// App
import { useRouter } from 'next/router'
import { get } from 'lodash'
import { ParsedUrlQuery } from 'querystring'

// Assets
import { Post } from '@/assets/types'

// Components
import Loading from '@/components/loading'
import Layout from '@/layouts/layout'
import Link from 'next/link'

const limit = 10

const PostsArchive = () => {
  const [posts, setPosts] = useState<Array<Post>>(null)
  const [count, setCount] = useState<number>(0)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [hasPrevPage, setHasPrevPage] = useState<boolean>(false)
  
  const router = useRouter()
  let { page } = router.query as ParsedUrlQuery
  const pageNumber = get(page, '[0]', 0)
  
  // Scroll to element if
  useEffect(() => {
    if (!count) {
      fetch(process.env.NEXT_API_URL + '/blog-posts/count')
        .then((response) => response.json())
        .then((response: number) => setCount(response))
    }
  }, [count])
  
  // Scroll to element if
  useEffect(() => {
    let skip: string = ''
    
    if (!Number.isNaN(Number(pageNumber))) {
      skip = '&_start=' + (Number(pageNumber) * limit)
    }
    
    fetch(process.env.NEXT_API_URL + `/blog-posts?_limit=${limit}${skip}`)
      .then((response) => response.json())
      .then((response: Array<Post>) => setPosts(response))
  }, [pageNumber])
  
  useEffect(() => {
    if (count && posts) {
      setHasPrevPage(pageNumber > 0)
      setHasNextPage(posts.length >= limit)
    }
  }, [count, posts])
  
  const PrevButton = () => {
    if (hasPrevPage) {
      return (
        <li className="prev">
          <Link href={`/posts/${pageNumber - 1 > 0 ? pageNumber - 1 : ''}`}>
            <a>
              <i className="fa fa-arrow-left mr-2" aria-hidden="true"/> Previous
            </a>
          </Link>
        </li>
      )
    } else {
      return (
        <li className="prev text-muted">
          <span><i className="fa fa-arrow-left mr-2" aria-hidden="true"/> Previous</span>
        </li>)
    }
  }
  
  const NextButton = () => {
    if (hasNextPage) {
      return (
        <li className="next">
          <Link href={`/posts/${pageNumber + 1}`}>
            <a>
              Next <i className="fa fa-arrow-right ml-4" aria-hidden="true"/>
            </a>
          </Link>
        </li>
      )
    } else {
      return (
        <li className="next text-muted">
          <span>Next <i className="fa fa-arrow-right ml-2" aria-hidden="true"/></span>
        </li>)
    }
  }
  
  return (
    <Layout>
      <div className="container mt-4 mb-4">
        <h1>Blog posts</h1>
        {!posts ? <Loading/> : (
          <div id="posts" className="archive">
            <div id="posts-list">
              {posts.map((post: Post) => {
                const published = new Date(post.published_at)
                const readableDate = published.toDateString()
                
                return (
                  <Link href='/post/[slug]' as={`/post/${post.Slug}`} key={post.id}>
                    <a>
                      <article className="post" key={post.id}>
                        <header>
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
            <ul className="pagination">
              <PrevButton/>
              <NextButton/>
            </ul>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default PostsArchive
