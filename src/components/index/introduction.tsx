import React, { useEffect, useState } from 'react'

// App
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'

// Types
import { Block } from '@/assets/types'

const Introduction = () => {
  const [intro, setIntro] = useState<Block>(null)
  const [currentInterest, setCurrentInterest] = useState<Block>(null)
  
  const app = useSelector(state => state.app)
  
  // Grab blocks
  useEffect(() => {
    if (app.blocks) {
      setIntro(app.blocks.find((block: Block) => block.Area === 'introduction'))
      setCurrentInterest(app.blocks.find((block: Block) => block.Area === 'current_interest'))
    }
  }, [app.blocks])
  
  return !intro || !currentInterest ? <></> : (
    <div id="introduction" className="container-md">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 personal text-center mb-4">
          <img className="mb-4" src="/img/avatar.png" alt=""/>
          <h2>Ossi Pesonen</h2>
          <p className="text-muted">Currently interested in, and learning:</p>
          <ul className="interest-list mt-4 mb-4">
            {currentInterest.Content.split(', ').map((interest: string) => <li key={interest}>{interest}</li>)}
          </ul>
          <div className="row text-center">
            <div className="col-6">
              <h3 className="text-secondary">
                10+
              </h3>
              <p>Years of experience</p>
            </div>
            <div className="col-6">
              <h3 className="text-secondary">
                100+
              </h3>
              <p>Completed projects</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 introduction-content">
          <ReactMarkdown className="text-center text-md-left" source={intro.Content}/>
        </div>
      </div>
    </div>
  )
}

export default Introduction
