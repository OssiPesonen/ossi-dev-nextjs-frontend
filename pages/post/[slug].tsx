import React, { useEffect } from 'react'

// App
import Link from 'next/link'
import Prism from 'prismjs'
import { useSelector, useDispatch } from 'react-redux'
import { get } from 'lodash'

// Types
import { Article, Post as PostType } from '@/assets/types'

// Redux
import { setPosts, setArticles } from '@/store/reducers/appReducer'
import { RootState } from '@/store/rootReducer'

// components
import Layout from '@/layouts/layout'
import Posts from '@/components/index/posts'
import Contact from '@/components/index/contact'

type PostProps = {
  post: PostType,
  posts: Array<PostType>,
  articles: Array<Article>
}

const Post = ({ post, posts, articles }: PostProps) => {
  // Redux
  const app = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()
  
  /**
   * Highlight using prism
   */
  useEffect(() => {
    if (post) {
      Prism.highlightAll()
    }
  }, [post])
  
  /**
   * Fetch posts list if user visits this page first
   */
  useEffect(() => {
    if (!app.posts) {
      dispatch(setPosts(posts))
    }
    
    if(!app.articles) {
      dispatch(setArticles(articles))
    }
  }, [app.posts, app.articles])
  
  return (
    <Layout>
      <article id="post" className="container-md">
        <Link href="/#posts"><a><i className="fa fa-arrow-left mr-2" aria-hidden="true"/> Back to frontpage</a></Link>
        <header className="mt-4">
          <h1>{post.Title}</h1>
        </header>
        <section>
          <div className="cover-photo mb-4 full-bleed">
            {get(post, 'Cover.url', null) ?
              <img src={process.env.NEXT_API_URL + post.Cover.url} alt={post.Cover.alternativeText}/> : <></>}
          </div>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.Content }}/>
        </section>
        <hr/>
        <footer>
          <Link href="/#posts"><a><i className="fa fa-arrow-left mr-2" aria-hidden="true"/> Back to frontpage</a></Link>
          <Link href="/posts"><a className="ml-4"><i className="fa fa-archive mr-2" aria-hidden="true"/> To post archives</a></Link>
        </footer>
      </article>
      <Posts hideDescription={true} openPostId={post.id}/>
      <Contact/>
    </Layout>
  )
}

export async function getStaticPaths () {
  const res = await fetch(process.env.NEXT_API_URL + '/blog-posts')
  const posts = await res.json()
  const paths = posts.map((post: PostType) => `/post/${post.Slug}`)
  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  const postsResponse = await fetch(process.env.NEXT_API_URL + '/blog-posts?_limit=15&_sort=published_at:DESC')
  const posts: Array<PostType> = await postsResponse.json()
  
  const articlesResponse = await fetch(process.env.NEXT_API_URL + '/articles')
  const articles: Array<Article> = await articlesResponse.json()
  
  const postResponse = await fetch(process.env.NEXT_API_URL + `/blog-posts?Slug=${params.slug}`)
  const singlePost: PostType = await postResponse.json()
  
  return {
    props: {
      post: get(singlePost, [0], null),
      posts,
      articles
    },
  }
}

export default Post
