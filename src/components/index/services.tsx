import React, { useEffect, useState } from 'react'

// App
import { useSelector } from 'react-redux'

// Types
import { Block } from '@/assets/types'
import IconCaretUp from '../../assets/icons/i-caret-up'
import IconBrowser from '../../assets/icons/i-browser'
import IconLaptopCode from '../../assets/icons/i-laptop-code'
import IconPrint from '../../assets/icons/i-print'
import IconPalette from '../../assets/icons/i-palette'
import ReactMarkdown from 'react-markdown'

const Services = () => {
  const [blockDescription, setBlockDescription] = useState<Block>(null)
  
  const app = useSelector(state => state.app)
  
  // Grab blocks
  useEffect(() => {
    if (app.blocks) {
      setBlockDescription(app.blocks.find((block: Block) => block.Area === 'services'))
    }
  }, [app.blocks])
  
  const serviceList: Record<string, React.ReactElement> = {
    'Web Development': <IconLaptopCode/>,
    'UI/UX Design': <IconBrowser/>,
  }
  
  return !blockDescription ? <></> : (
    <div id="services" className="section-container">
      <div className="container-md">
        <h2 className="section-title">
          <IconCaretUp/> Services
        </h2>
        <h3>What I Do</h3>
        <ReactMarkdown source={blockDescription.Content} className="text-gray"/>
        <div id="service-boxes">
          <div className="row">
            {Object.keys(serviceList).map((serviceTitle: string) => (
              <div className="col-sm-6" key={serviceTitle}>
                <div className="inner">
                  {serviceList[serviceTitle]}
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
