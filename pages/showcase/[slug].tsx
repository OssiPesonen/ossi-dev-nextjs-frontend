import React, { useEffect, useRef, useState } from 'react'

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
import IconArrowLeft from '../../src/assets/icons/i-arrow-left'
import { ParagraphComponent, ImageComponent } from '../../src/assets/react-markdown-renderers'

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

    setShowcase(entry)
  }, [slug, showcases])

  return (
    <Layout>
      { !showcase ?
        <div className="container text-center justify-content-center align-items-center d-flex" style={ { minHeight: '100vh' } }>
          <Loading/>
        </div> : (
          <>
            <article id="showcase" className="container-md">
              <header className="mt-4">
                <Link href="/#showcases"><a className="back-to-frontpage"><IconArrowLeft/> Back to frontpage</a></Link>
                <h1>{ showcase.Title }</h1>
              </header>
              <section>
                <div className="cover-photo mb-4 full-bleed">
                  { get(showcase, 'Cover.url', null) ?
                    <img src={ process.env.NEXT_PUBLIC_API_URL + showcase.Cover.url } alt={ showcase.Cover.alternativeText }/> : <></> }
                </div>
                <div className="showcase-grid">
                  <div className="tags">
                    { showcase.tags ? showcase.tags.map((tag: Tag) =>
                      <div className="tag" key={ tag.id }>{ tag.Tag }</div>) : <></> }
                  </div>
                  <ReactMarkdown source={ showcase.Content }
                                 transformImageUri={ (uri) => process.env.NEXT_PUBLIC_API_URL + uri }
                                 renderers={ { image: ImageComponent, paragraph: ParagraphComponent } }
                                 className="showcase-content"/>
                </div>
              </section>
              <hr/>
              <footer>
                <Link href="/#showcases"><a><IconArrowLeft/> Back to frontpage</a></Link>
              </footer>
            </article>
            <Showcases hideDescription={ true } openPostId={ showcase.id }/>
          </>
        ) }
      <Contact/>
    </Layout>
  )
}

export async function getStaticPaths () {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/showcases')
  const showcases = await res.json()
  const paths = showcases.map((showcase: ShowcaseType) => `/showcase/${ showcase.Slug }`)
  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/showcases')
  const showcases = await res.json()

  return {
    props: {
      showcases
    },
  }
}

export default Showcase
