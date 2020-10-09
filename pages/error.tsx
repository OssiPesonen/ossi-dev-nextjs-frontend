import React from 'react'

// Components
import Layout from '@/layouts/layout'
import Top from '@/components/index/top'

export default function Error () {
  return (
    <Layout>
      <Top/>
      <div className="container-md text-center">
        <h1 className="pt-4">404 - Error</h1>
        <p>Something has gone wrong.</p>
      </div>
    </Layout>
  )
}
