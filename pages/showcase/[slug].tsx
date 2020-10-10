import React, { useEffect, useState } from 'react'

// App
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { get } from 'lodash'

// Types
import { Showcase as ShowcaseType, Tag } from '@/assets/types'

// Redux
import { fetchShowcases } from '@/store/reducers/appReducer'

// Components
import Layout from '@/layouts/layout'
import Loading from '@/components/loading'
import Showcases from '@/components/index/showcases'
import Contact from '@/components/index/contact'

const Showcase = () => {
  const router = useRouter()
  const { slug } = router.query as ParsedUrlQuery
  const [showcase, setShowcase] = useState<ShowcaseType>(null)
  
  const app = useSelector(state => state.app)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (app.showcases) {
      // Find showcase data from the list. We do this because there are less than 10 showcases so we don't have to fetch
      // an individual one every time and save the cost of a network call
      setShowcase(app.showcases.find((showcase: ShowcaseType) => showcase.Slug === slug))
    } else {
      // No showcases => fetch
      dispatch(fetchShowcases())
    }
  }, [app.showcases, slug])
  
  return (
    <Layout>
      {!showcase ?
        <div className="container text-center justify-content-center align-items-center d-flex" style={{ minHeight: '100vh' }}>
          <Loading/></div> : (
          <>
            <article id="showcase" className="container-md">
              <Link href="/#showcases"><a><i className="fa fa-arrow-left mr-2" aria-hidden="true"/> Back to frontpage</a></Link>
              <header className="mt-4">
                <h1>{showcase.Title}</h1>
              </header>
              <section>
                <div className="cover-photo mb-4 full-bleed">
                  {get(showcase, 'Cover.url', null) ?
                    <img src={process.env.NEXT_API_URL + showcase.Cover.url} alt={showcase.Cover.alternativeText}/> : <></>}
                </div>
                <div className="showcase-grid">
                  <div className="tags">
                    {showcase.tags ? showcase.tags.map((tag: Tag) =>
                      <div className="tag" key={tag.id}>{tag.Tag}</div>) : <></>}
                  </div>
                  <div className="showcase-content" dangerouslySetInnerHTML={{ __html: showcase.Content }}/>
                </div>
              </section>
              <hr/>
              <footer>
                <Link href="/#showcases"><a><i className="fa fa-arrow-left mr-2" aria-hidden="true"/> Back to frontpage</a></Link>
              </footer>
            </article>
            <Showcases hideDescription={true} openPostId={showcase.id}/>
          </>
        )}
      <Contact/>
    </Layout>
  )
}

export default Showcase
