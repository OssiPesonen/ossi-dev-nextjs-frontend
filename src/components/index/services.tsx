import React, { useEffect, useState } from 'react'

// App
import { useSelector } from 'react-redux'

// Types
import { Block } from '@/assets/types'

const Services = () => {
  const [blockDescription, setBlockDescription] = useState<Block>(null)
  
  const app = useSelector(state => state.app)
  
  // Grab blocks
  useEffect(() => {
    if (app.blocks) {
      setBlockDescription(app.blocks.find((block: Block) => block.Area === 'services'))
    }
  }, [app.blocks])
  
  const serviceList = {
    'Web Development': 'fa fa-laptop-code',
    'UI/UX Design': 'fa fa-browser',
    'Printwork': 'fa fa-print',
    'Identity Design': 'fa fa-palette'
  }
  
  return !blockDescription ? <></> : (
    <div id="services" className="section-container">
      <div className="container-md">
        <h4 className="section-title">
          <i className="fa fa-caret-up text-secondary mr-2" aria-hidden="true"/> Services
        </h4>
        <h2>What I Do</h2>
        <div dangerouslySetInnerHTML={{ __html: blockDescription.Content }} className="text-gray"/>
        <div id="service-boxes">
          <div className="row">
            {Object.keys(serviceList).map((serviceTitle: string) => (
              <div className="col-sm-6 col-md-3" key={serviceTitle}>
                <div className="inner">
                  <i className={`${serviceList[serviceTitle]} text-secondary`} aria-hidden="true"/>
                  <h4>{serviceTitle}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
