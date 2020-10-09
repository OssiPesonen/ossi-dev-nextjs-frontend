import React, { useEffect, useState } from 'react'

// App
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { get } from 'lodash'

import { Post as PostType } from '@/assets/types'
import Layout from '@/layouts/layout'
import { setPosts } from '@/store/reducers/appReducer'
import { RootState } from '@/store/rootReducer'
import Posts from '@/components/index/posts'
import Loading from '@/components/loading'

const Post = () => {
  const [post, setPost] = useState<PostType>(null)
  
  // Redux
  const app = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()
  
  // Router
  const router = useRouter()
  const { slug } = router.query as ParsedUrlQuery
  
  // Fetch blog post content
  useEffect(() => {
    if (slug) {
      fetch(process.env.NEXT_API_URL + `/blog-posts?Slug=${slug}`)
        .then((response) => response.json())
        .then((response: PostType) => setPost(response[0]))
        .catch((error) => router.push('/error'))
    }
  }, [slug])
  
  // Fetch posts if user visits this site first
  useEffect(() => {
    if (!app.posts) {
      fetch(process.env.NEXT_API_URL + `/blog-posts?_limit=15`)
        .then((response) => response.json())
        .then((response: Array<PostType>) => dispatch(setPosts(response)))
        .catch((error) => router.push('/error'))
    }
  }, [app.posts])
  
  return (
    <Layout>
      {!post ? <div className="container text-center justify-content-center align-items-center d-flex" style={{ minHeight: '100vh' }}><Loading /></div> : (
        <>
          <article id="post" className="container-md">
            <Link href="/#posts"><a><i className="fa fa-arrow-left mr-2"></i>To frontpage</a></Link>
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
          </article>
          <Posts hideDescription={true} openPostId={post.id}/>
        </>
      )}
    </Layout>
  )
}

export default Post
