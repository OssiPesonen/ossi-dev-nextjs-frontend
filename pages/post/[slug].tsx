import React, { useEffect, useState } from 'react'

// App
import Link from 'next/link'
import Prism from 'prismjs'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { get } from 'lodash'

// Types
import { Post as PostType } from '@/assets/types'

// Redux
import { fetchPosts, setPost } from '@/store/reducers/appReducer'
import { RootState } from '@/store/rootReducer'

// components
import Layout from '@/layouts/layout'
import Posts from '@/components/index/posts'
import Loading from '@/components/loading'
import Contact from '@/components/index/contact'

const Post = () => {
  // Redux
  const app = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()
  
  // State
  const [loaded, setLoaded] = useState<boolean>(false)
  
  // Router
  const router = useRouter()
  const post = app.post
  const { slug } = router.query as ParsedUrlQuery
  
  // Fetch blog post content
  useEffect(() => {
    // Check if showcase in app already exists and use that instead of making a network request
    if (slug && (!app.post || app.post.Slug !== slug)) {
      fetch(process.env.NEXT_API_URL + `/blog-posts?Slug=${slug}`)
        .then((response) => response.json())
        .then((response: PostType) => dispatch(setPost(response[0])))
        .finally(() => setLoaded(true))
        .catch(() => router.push('/error'))
    } else {
      setLoaded(true)
    }
  }, [slug, app.post])
  
  /**
   * Highlight using prism
   */
  useEffect(() => {
    if (loaded && post) {
      Prism.highlightAll()
    }
  }, [loaded, post])
  
  /**
   * Fetch posts list if user visits this page first
   */
  useEffect(() => {
    if (!app.posts) {
      dispatch(fetchPosts());
    }
  }, [app.posts])
  
  return (
    <Layout>
      {!post || !loaded ?
        <div className="container text-center justify-content-center align-items-center d-flex" style={{ minHeight: '100vh' }}>
          <Loading/></div> : (
          <>
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
          </>
        )}
      <Contact/>
    </Layout>
  )
}

export default Post
