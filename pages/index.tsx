import React, { useEffect, useState } from 'react'

// App
import { useDispatch } from 'react-redux'

// Redux
import { setPosts, setBlocks, setShowcases, setEmployments } from '@/store/reducers/appReducer'

// Assets
import { Block, Showcase, Post, Employment } from '@/assets/types'

// Components
import Introduction from '@/components/index/introduction'
import Services from '@/components/index/services'
import Showcases from '@/components/index/showcases'
import Posts from '@/components/index/posts'
import Layout from '@/layouts/layout'
import Contact from '@/components/index/contact'
import { useRouter } from 'next/router'
import Loading from '@/components/loading'

export default function Home () {
  const router = useRouter()
  const [loaded, setLoaded] = useState<boolean>(false)
  const dispatch = useDispatch()
  
  // Scroll to element if
  useEffect(() => {
    if (router.asPath.substr(0, 2) === '/#' && loaded) {
      const hash = router.asPath.substr(2);
      
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
  }, [router.asPath, loaded])
  
  useEffect(() => {
    const urls = ['/blocks', '/showcases', '/blog-posts?_limit=15', '/employments']
    
    Promise.all(urls.map(url => fetch(process.env.NEXT_API_URL + url)))
      .then(response => Promise.all(response.map(jsonResponse => jsonResponse.json())))
      .then((response: [Array<Block>, Array<Showcase>, Array<Post>, Array<Employment>]) => {
        const [blocks, showcases, posts, employments] = response
        
        dispatch(setBlocks(blocks))
        dispatch(setShowcases(showcases))
        dispatch(setPosts(posts))
        dispatch(setEmployments(employments))
      })
      .catch(() => router.push('/error'))
      .finally(() => setLoaded(true))
  }, [])
  
  return !loaded ? <div className="container text-center justify-content-center align-items-center d-flex" style={{ minHeight: '100vh' }}><Loading /></div> : (
    <Layout>
      <Introduction/>
      <Services/>
      <Showcases/>
      <Posts/>
      <Contact/>
    </Layout>
  )
}
