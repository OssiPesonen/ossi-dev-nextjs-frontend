import React, { useEffect, useState } from 'react'

// App
import { useSelector } from 'react-redux'

// Types
import { Block } from '@/assets/types'
import IconCaretUp from '../../assets/icons/i-caret-up';
import IconBrowser from '../../assets/icons/i-browser';
import IconLaptopCode from '../../assets/icons/i-laptop-code';
import IconPrint from '../../assets/icons/i-print';
import IconPalette from '../../assets/icons/i-palette';

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
    'Web Development': <IconLaptopCode />,
    'UI/UX Design': <IconBrowser />,
    'Printwork': <IconPrint />,
    'Identity Design': <IconPalette />
  }
  
  return !blockDescription ? <></> : (
    <div id="services" className="section-container">
      <div className="container-md">
        <h4 className="section-title">
            <IconCaretUp /> Services
        </h4>
        <h2>What I Do</h2>
        <div dangerouslySetInnerHTML={{ __html: blockDescription.Content }} className="text-gray"/>
        <div id="service-boxes">
          <div className="row">
            {Object.keys(serviceList).map((serviceTitle: string) => (
              <div className="col-sm-6 col-md-3" key={serviceTitle}>
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
