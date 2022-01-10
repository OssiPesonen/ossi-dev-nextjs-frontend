import React, { useEffect } from 'react'

// App
import { useRouter } from 'next/router'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import {
  setBlocks,
  setLoaded as setAppLoaded,
  setEmployments,
  setTags,
  setShowcases,
  setPosts
} from '@/store/reducers/appReducer'

// Assets
import { Block, Employment, Tag, Post, Showcase } from '@/assets/types'

// Components
import Introduction from '@/components/index/introduction'
import Services from '@/components/index/services'
import Showcases from '@/components/index/showcases'
import Posts from '@/components/index/posts'
import Layout from '@/layouts/layout'
import Contact from '@/components/index/contact'
import Loading from '@/components/loading'
import Resume from '@/components/index/resume'

type HomeProps = {
  posts: Array<Post>,
  showcases: Array<Showcase>,
  blocks: Array<Block>,
  employments: Array<Employment>,
  tags: Array<Tag>
};

function Home ({ posts, showcases, blocks, employments, tags }: HomeProps) {
  const router = useRouter()
  const app = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()
  
  // Scroll to element if router contains a hash
  useEffect(() => {
    if (router.asPath.substr(0, 2) === '/#' && app.loaded) {
      const hash = router.asPath.substr(2)
      
      // setTimeout mitigates the effect where elements are not full height yet, and offsetTop gives wrong position
      setTimeout(function () {
        if (hash && document.getElementById(hash)) {
          window.scrollTo({
            top: document.getElementById(hash).offsetTop - 75,
            behavior: 'smooth'
          })
        }
      }, 250)
    }
  }, [router.asPath, app.loaded])
  
  useEffect(() => {
    if (!app.loaded) {
      dispatch(setPosts(posts))
      dispatch(setShowcases(showcases))
      dispatch(setBlocks(blocks))
      dispatch(setEmployments(employments))
      dispatch(setTags(tags))
      dispatch(setAppLoaded(true))
    }
  }, [app.loaded])
  
  return !app.loaded ?
    <div className="container text-center justify-content-center align-items-center d-flex" style={{ minHeight: '100vh' }}>
      <Loading/></div> : (
      <Layout>
        <Introduction/>
        <Services/>
        <Showcases/>
        <Posts/>
        <Contact/>
        <Resume/>
      </Layout>
    )
}

export async function getStaticProps () {
  // Fetch frontpage data
  const urls = [
    '/blog-posts?_limit=15&_sort=published_at:DESC',
    '/showcases',
    '/blocks',
    '/employments',
    '/tags'
  ]
  
  const contentCalls: Response[] = await Promise.all(urls.map(url => fetch(process.env.NEXT_PUBLIC_API_URL + url)))
  const contentResponses = await Promise.all(contentCalls.map(jsonResponse => jsonResponse.json()))
  const [posts, showcases, blocks, employments, tags] = contentResponses
  
  return {
    props: {
      posts,
      showcases,
      blocks,
      employments,
      tags
    },
  }
}

export default Home
