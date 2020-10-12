import React, { useEffect, useState } from 'react'

// App
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { get } from 'lodash'
import ReactMarkdown from 'react-markdown'

// Types
import { Showcase as ShowcaseType, Tag } from '@/assets/types'
import { setShowcases } from '@/store/reducers/appReducer'

// Components
import Layout from '@/layouts/layout'
import Loading from '@/components/loading'
import Showcases from '@/components/index/showcases'
import Contact from '@/components/index/contact'
import IconArrowLeft from '../../src/assets/icons/i-arrow-left';

type ShowcaseProps = {
  showcases: Array<ShowcaseType>
}

const Showcase = ({ showcases }: ShowcaseProps) => {
  const router = useRouter()
  const { slug } = router.query as ParsedUrlQuery
  const [showcase, setShowcase] = useState<ShowcaseType>(null)
  
  const app = useSelector(state => state.app)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (!app.showcases) {
      // Dispatch to state so they're available if not already
      dispatch(setShowcases(showcases))
    }
    
    // Find showcase data from the list. We do this because there are less than 10 showcases so we don't have to fetch
    // an individual one every time and save the cost of a network call
    const entry: ShowcaseType = showcases.find((showcase: ShowcaseType) => showcase.Slug === slug)
    let showcaseObj = entry
    
    if (entry) {
      // Replace all relative image paths with the API URL prefixed.
      let contentString = entry.Content
      contentString = contentString.replaceAll('src="/uploads', `src="${process.env.NEXT__PUBLIC_API_URL}/uploads`)
      showcaseObj = { ...entry, Content: contentString }
    }
    
    setShowcase(showcaseObj)
  }, [slug, showcases])
  
  return (
    <Layout>
      {!showcase ?
        <div className="container text-center justify-content-center align-items-center d-flex" style={{ minHeight: '100vh' }}>
          <Loading/></div> : (
          <>
            <article id="showcase" className="container-md">
              <Link href="/#showcases"><a className="back-to-frontpage"><IconArrowLeft /> Back to frontpage</a></Link>
              <header className="mt-4">
                <h1>{showcase.Title}</h1>
              </header>
              <section>
                <div className="cover-photo mb-4 full-bleed">
                  {get(showcase, 'Cover.url', null) ?
                    <img src={process.env.NEXT__PUBLIC_API_URL + showcase.Cover.url} alt={showcase.Cover.alternativeText}/> : <></>}
                </div>
                <div className="showcase-grid">
                  <div className="tags">
                    {showcase.tags ? showcase.tags.map((tag: Tag) =>
                      <div className="tag" key={tag.id}>{tag.Tag}</div>) : <></>}
                  </div>
                  <div className="showcase-content">
                    <ReactMarkdown className="content-area" source={showcase.Content}/>
                  </div>
                  
                </div>
              </section>
              <hr/>
              <footer>
                <Link href="/#showcases"><a><IconArrowLeft />  Back to frontpage</a></Link>
              </footer>
            </article>
            <Showcases hideDescription={true} openPostId={showcase.id}/>
          </>
        )}
      <Contact/>
    </Layout>
  )
}

export async function getStaticPaths () {
  const res = await fetch(process.env.NEXT__PUBLIC_API_URL + '/showcases')
  const showcases = await res.json()
  const paths = showcases.map((showcase: ShowcaseType) => `/showcase/${showcase.Slug}`)
  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  const res = await fetch(process.env.NEXT__PUBLIC_API_URL + '/showcases')
  const showcases = await res.json()
  
  return {
    props: {
      showcases
    },
  }
}

export default Showcase
