import React, { useState } from 'react'

// App
import Link from 'next/link'
import { useRouter } from 'next/router'

// Components
import IconBehance from '../assets/icons/i-behance';
import IconEnvelope from '../assets/icons/i-envelope';
import IconTwitter from '../assets/icons/i-twitter';
import IconGithub from '../assets/icons/i-github';
import IconMedium from '../assets/icons/i-medium';

const Top = () => {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  /**
   * Scroll to section
   */
  const scrollTo = (event: React.MouseEvent) => {
    const target = event.currentTarget as HTMLAnchorElement

    if (router.pathname === '/') {
      event.preventDefault()
      // Grab the clicked link

      if (typeof target.hash !== 'undefined') {
        const hash = target.hash.substr(1)
        const section = document.getElementById(hash)

        // Scroll to section
        if (hash && section) {
          window.scrollTo({
            top: section.offsetTop - 75,
            behavior: 'smooth'
          })
        }

        // Shut down menu
        setMenuOpen(false)

        // Add hash to navigation bar
        window.history.pushState('', target.hash, target.hash)
      }
    } else {
      // @ts-ignore
      // Not sure what happens
      router.push(target.attributes.href.value)
    }
  }

  /**
   * Toggle menu (mobile)
   */
  const toggleMenu = () => {
    setMenuOpen(state => !state)
  }

  return (
    <div id="top-bar">
      <div className="container-lg">
        <div className="row">
          <div className="col-xs-12 col-md" id="logo">
            <Link href="/#introduction">
              <a aria-label="To introduction">
                <svg version="1.1" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 94.6 94.6" style={{ overflow: 'visible' }}>
                  <g>
                    <g>
                      <circle fill="#FFC661" cx="47.3" cy="47.3" r="47.3"/>
                      <path fill="#222831" d="M23.4,48.1c0-7.1,1.5-13.4,3.7-17.2c0.1-0.1,0-0.3-0.1-0.4c-0.1,0-0.1,0-0.2,0c-9.4,2.9-14.6,12.8-11.8,22.1
    c1.6,5.3,5.7,9.6,10.9,11.5c0.1,0,0.3,0,0.3-0.2c0-0.1,0-0.1,0-0.2C24.5,59.9,23.4,54.3,23.4,48.1z"/>
                      <path fill="#222831" d="M37.1,30.5c-0.1,0-0.3,0-0.3,0.2c0,0.1,0,0.2,0,0.2c2.2,3.8,3.7,10.1,3.7,17.2c0,6.2-1.1,11.8-2.8,15.7
    c-0.1,0.1,0,0.3,0.1,0.4c0.1,0,0.1,0,0.2,0c9.2-3.3,14-13.5,10.7-22.7C46.7,36.2,42.5,32.1,37.1,30.5z"/>
                      <path fill="#222831" d="M55.2,31h7.9c0.1,0,0.3,0.1,0.3,0.3v32.3c0,0.1-0.1,0.3-0.3,0.3h-7.9c-0.1,0-0.3-0.1-0.3-0.3V31.3
    C54.9,31.1,55,31,55.2,31z"/>
                      <path fill="#222831" d="M71.5,31.3c-0.1,0-0.3,0.1-0.3,0.2c0,0.1,0,0.1,0,0.2c1.4,2.2,2.4,6.1,2.4,10.5s-1,8.3-2.4,10.5
    c-0.1,0.1-0.1,0.3,0.1,0.4c0.1,0,0.1,0.1,0.2,0c6-1.2,9.9-7.1,8.7-13.2C79.3,35.6,75.9,32.1,71.5,31.3z"/>
                    </g>
                  </g>
                </svg>
              </a>
            </Link>
          </div>
          <button id="toggle-menu" className={`hamburger hamburger--elastic js-hamburger${menuOpen ? ' is-active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu" type="button">
            <div className="hamburger-box">
              <div className="hamburger-inner"/>
            </div>
          </button>
          <div id="menu-wrapper" className={`col-xs-12 col-lg row${menuOpen ? ' is-open' : ''}`}>
            <nav className="col-xs-12 col-lg-8">
              <ul>
                <li><Link href="/#services"><a onClick={scrollTo}>Services</a></Link></li>
                <li><Link href="/#showcases"><a onClick={scrollTo}>Showcases</a></Link></li>
                <li><Link href="/#posts"><a onClick={scrollTo}>Posts</a></Link></li>
                <li><Link href="/#contact"><a onClick={scrollTo}>Contact</a></Link></li>
                <li><Link href="/#resume"><a onClick={scrollTo}>Resume</a></Link></li>
              </ul>
            </nav>
            <nav className="col-xs-12 col-lg-4 text-right" id="social-media-menu">
              <ul>
                <li><a href="mailto:ossi@ossipesonen.fi" aria-label="Email"><IconEnvelope /></a></li>
                <li><a href="https://twitter.com/OssiDev" aria-label="Twitter" rel="noreferrer" target="_blank"><IconTwitter /></a></li>
                <li><a href="https://github.com/OssiPesonen/" aria-label="Github" rel="noreferrer" target="_blank"><IconGithub /></a></li>
                <li><a href="https://medium.com/@rcls" target="_blank" aria-label="Medium" rel="noreferrer"><IconMedium /></a></li>
                <li><a href="https://www.behance.net/ossipesonen" aria-label="Behance" rel="noreferrer" target="_blank"><IconBehance /></a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Top
