import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Showcase, Tag } from '@/assets/types'
import { ParsedUrlQuery } from 'querystring'
import { get } from 'lodash';
import { fetchShowcases } from '@/store/reducers/appReducer'
import Layout from '@/layouts/layout'
import Loading from '@/components/loading'

export default function Home () {
  const router = useRouter()
  const { slug } = router.query as ParsedUrlQuery
  const [showcase, setShowcase] = useState<Showcase>(null)
  
  const app = useSelector(state => state.app)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (app.showcases) {
      // Find page data
      setShowcase(app.showcases.find((showcase: Showcase) => showcase.Slug === slug))
    } else {
      // No showcases => fetch
      dispatch(fetchShowcases());
    }
  }, [app.showcases])
  
  return (
    <Layout>
      {!showcase ? <div className="container text-center justify-content-center align-items-center d-flex" style={{ minHeight: '100vh' }}><Loading /></div> : (
        <article id="showcase" className="container-md">
          <Link href="/#showcases"><a><i className="fa fa-arrow-left mr-2"></i> To frontpage</a></Link>
          <header className="mt-4">
              <h1>{showcase.Title}</h1>
          </header>
          <section>
            <div className="cover-photo mb-4 full-bleed">
              { get (showcase, 'Cover.url', null) ? <img src={process.env.NEXT_API_URL + showcase.Cover.url} alt={ showcase.Cover.alternativeText} /> : <></> }
            </div>
            <div className="showcase-grid">
              <div className="tags">
                  {showcase.tags ? showcase.tags.map((tag: Tag) => <div className="tag" key={tag.id}>{tag.Tag}</div>) : <></>}
              </div>
              <div className="showcase-content" dangerouslySetInnerHTML={{ __html: showcase.Content}} />
            </div>
          </section>
        </article>)}
    </Layout>
  )
  
}
