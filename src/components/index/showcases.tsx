import React, { useEffect } from 'react'

// App
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { get } from 'lodash'
import { useRouter } from 'next/router'

// Types
import { Showcase, Tag } from '@/assets/types'

// Redux
import { setShowcases } from '@/store/reducers/appReducer'

type ShowcasesProps = {
  hideDescription?: boolean
  openPostId?: number
}

const Showcases = (props: ShowcasesProps) => {
  const { hideDescription, openPostId } = props
  const app = useSelector(state => state.app)
  const dispatch = useDispatch()
  const router = useRouter()
  
  // Fetch posts if user visits this site first
  useEffect(() => {
    if (!app.showcases) {
      // Todo: This is a duplicate, might want to create a thunk
      fetch(process.env.NEXT_API_URL + `/showcases`)
        .then((response) => response.json())
        .then((response: Array<Showcase>) => dispatch(setShowcases(response)))
        .catch(() => router.push('/error'))
    }
  }, [app.posts])
  
  return !app.showcases ? <></> : (
    <div id="showcases" className={`section-container${hideDescription ? ' on-single-page' : ''}`}>
      <div className="container-md">
        {hideDescription ? <></> : (
          <>
            <h4 className="section-title">
              <i className="fa fa-caret-up text-secondary mr-2" aria-hidden="true"/> Showcases
            </h4>
            <h2>Selected Projects</h2>
            <p className="text-gray">You can click on each project to read about the story behind them.</p>
          </>
        )}
        <div id="showcases-grid">
          {hideDescription ? <h2>Other showcases</h2> : <></>}
          <div className="row">
            {app.showcases.map((showcase: Showcase) => {
              if (openPostId && showcase.id === openPostId) return false
              
              return (
                <Link href='/showcase/[slug]' as={`/showcase/${showcase.Slug}`} key={showcase.id}>
                  <a className="col-12 col-sm-6 col-md-4 showcase-container">
                    <article className="showcase" key={showcase.id}>
                      <header>
                        {get(showcase, 'Thumbnail.url', false) ? (
                          <img className="showcase-thumbnail" src={process.env.NEXT_API_URL + showcase.Thumbnail.url} alt={showcase.Thumbnail.alternativeText}/>
                        ) : <></>}
                      </header>
                      <section className="content">
                        <h4>{showcase.Title}</h4>
                        {showcase.tags ? showcase.tags.map((tag: Tag) =>
                          <div className="tag" key={tag.id}>{tag.Tag}</div>) : <></>}
                      </section>
                    </article>
                  </a>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Showcases
