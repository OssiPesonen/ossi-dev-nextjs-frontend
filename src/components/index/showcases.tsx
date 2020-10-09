import React, { useEffect } from 'react'

// App
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { get } from 'lodash'

// Types
import { Showcase, Tag } from '@/assets/types'
import Layout from '@/layouts/layout'

const Showcases = () => {
  const app = useSelector(state => state.app)
  
  return !app.showcases ? <></> : (
    <div id="showcases" className="section-container">
      <div className="container-md">
        <h4 className="section-title">
          <i className="fa fa-caret-up text-secondary mr-2" aria-hidden="true"/> Showcases
        </h4>
        <h2>Selected Projects</h2>
        <p className="text-gray">You can click on each project to read about the story behind them.</p>
        <div id="showcases-grid">
          <div className="row">
            {app.showcases.map((showcase: Showcase) => (
              <Link href='/showcase/[slug]' as={`/showcase/${showcase.Slug}`} key={showcase.id}>
                <a className="col-12 col-sm-6 col-md-4 showcase-container">
                  <article className="showcase" key={showcase.id}>
                    <header>
                      {get(showcase, 'Cover.formats.medium', false) ? (
                        <img className="showcase-thumbnail" src={process.env.NEXT_API_URL + showcase.Thumbnail.formats.small.url} alt={showcase.Thumbnail.formats.small.alternativeText}/>
                      ) : <></>}
                    </header>
                    <section className="content">
                      <h4>{showcase.Title}</h4>
                      {showcase.tags ? showcase.tags.map((tag: Tag) => <div className="tag" key={tag.id}>{tag.Tag}</div>) : <></>}
                    </section>
                  </article>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Showcases
