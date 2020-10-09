import React from 'react'
import { useSelector } from 'react-redux'
import { Employment } from '@/assets/types'
import { RootState } from '@/store/rootReducer'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Todo: Implement contact form
const Contact = () => {
  const app = useSelector((state: RootState) => state.app)
  
  return (
    <div id="contact-resume" className="section-container">
      <div className="container-md">
        <div className="row">
          <div className="col-12 col-md-8">
            <div id="contact">
              <h4 className="section-title">
                <i className="fa fa-caret-up text-secondary mr-2" aria-hidden="true"/> Contact
              </h4>
              <h2>Contact me for any type of query or discussion!</h2>
              <p>
                <i className="fa fa-envelope-open-text mr-2 text-muted" aria-hidden="true"/>
                <a href="mailto:ossi@ossipesonen.fi">ossi@ossipesonen.fi</a>
              </p>
              <p>
                <i className="fab fa-twitter mr-2 text-muted" aria-hidden="true"/>
                <a href="https://twitter.com/OssiDev">@OssiDev</a>
              </p>
            </div>
            <hr/>
            <div id="resume">
              <h4 className="section-title">
                <i className="fa fa-caret-up text-secondary mr-2" aria-hidden="true"/> Resume
              </h4>
              <h2>Where I've worked</h2>
              <p className="text-muted">A list of my most recent employers and job descriptions. </p>
              <div id="employers">
                {!app.employments ? <></> : app.employments.map((employment: Employment) => {
                  const startDate = new Date(employment.StartDate)
                  const startDateString = months[startDate.getMonth()] + ' ' + startDate.getFullYear()
                  let endDateString
                  
                  if (employment.EndDate !== null) {
                    const endDate = new Date(employment.EndDate)
                    endDateString = months[endDate.getMonth()] + ' ' + endDate.getFullYear()
                  } else {
                    endDateString = 'Present'
                  }
                  
                  return (
                    <article className="employer" key={employment.id}>
                      <h4>
                        <span className="job-title">{employment.JobTitle}</span> - <span className="employer">{employment.Employer}</span>
                      </h4>
                      <p className="job-timespan">
                        <time>{startDateString} - {endDateString}</time>
                      </p>
                      <div className="job-description" dangerouslySetInnerHTML={{ __html: employment.JobDescription }}/>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
          <div id="resume" className="col-12 col-md-4 mt-xs-4 mt-md-0">
            <h4 className="section-title"><i className="fa fa-caret-up text-secondary mr-2" aria-hidden="true"/> What I've worked with</h4>
            <p className="text-gray">Below I'll list of some of the frameworks, tools, applications, platforms, concepts, notable designs, libraries and languages I've worked with over the years.</p>
            <ul className="tags">
              <li className="tag">React</li>
              <li className="tag">Vue.js</li>
              <li className="tag">Amazon Web Services</li>
              <li className="tag">Microsoft Azure</li>
              <li className="tag">Nuxt.js</li>
              <li className="tag">Next.js</li>
              <li className="tag">Slim Framework</li>
              <li className="tag">Laravel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
