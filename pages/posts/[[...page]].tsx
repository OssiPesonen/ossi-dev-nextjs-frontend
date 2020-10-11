import React, { useEffect, useState } from 'react'

// App
import { useRouter } from 'next/router'
import { get } from 'lodash'
import { ParsedUrlQuery } from 'querystring'

// Assets
import { Article, Post as PostType, Post } from '@/assets/types'

// Components
import Loading from '@/components/loading'
import Layout from '@/layouts/layout'
import Link from 'next/link'
import IconArrowLeft from '../../src/assets/icons/i-arrow-left';
import IconArrowRight from '../../src/assets/icons/i-arrow-right';

const postLimitPerPage = 2

type PostsArchiveProps = {
  posts: Array<PostType>,
  count: number,
  pageNumber: number
}

const PostsArchive = ({ count, pageNumber, posts }: PostsArchiveProps) => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [hasPrevPage, setHasPrevPage] = useState<boolean>(false)
  
  useEffect(() => {
    if (count) {
      setHasPrevPage(pageNumber > 0)
      setHasNextPage(posts.length >= postLimitPerPage)
    }
  }, [count, pageNumber])
  
  const PrevButton = () => {
    if (hasPrevPage) {
      return (
        <li className="prev">
          <Link href={`/posts/${pageNumber - 1 > 0 ? pageNumber - 1 : ''}`}>
            <a>
              <IconArrowLeft /> Previous
            </a>
          </Link>
        </li>
      )
    } else {
      return (
        <li className="prev text-muted">
          <span><IconArrowLeft /> Previous</span>
        </li>)
    }
  }
  
  const NextButton = () => {
    if (hasNextPage) {
      return (
        <li className="next">
          <Link href={`/posts/${pageNumber + 1}`}>
            <a>
              Next <IconArrowRight />
            </a>
          </Link>
        </li>
      )
    } else {
      return (
        <li className="next text-muted">
          <span>Next <IconArrowRight /></span>
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

export async function getStaticPaths () {
  // Fetch blog post count
  const res = await fetch(process.env.NEXT_API_URL + '/blog-posts/count')
  const count = await res.json()
  
  // Count max number of pages
  const pages = Math.ceil(count / postLimitPerPage)
  
  // Might arrive with no param which means it's page zero
  const paths = ['/posts']
  
  // Get each possible route
  for (let i = 0; i < pages; i++) {
    paths.push(`/posts/${i}`)
  }
  
  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  // I might not be defined (page zero)
  const pageNumber = get(params, 'page[0]', 0)
  
  // Build how many we are skipping
  let skip: string = ''
  
  if (!Number.isNaN(Number(pageNumber))) {
    skip = '&_start=' + (Number(pageNumber) * postLimitPerPage)
  }
  
  const res = await fetch(process.env.NEXT_API_URL + `/blog-posts?_limit=${postLimitPerPage}${skip}`)
  const posts = await res.json()
  
  const countResponse = await fetch(process.env.NEXT_API_URL + '/blog-posts/count')
  const count = await countResponse.json()
  
  return {
    props: {
      posts,
      pageNumber,
      count
    },
  }
}

export default PostsArchive
