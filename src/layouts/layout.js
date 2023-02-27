import React from 'react';
import Head from 'next/head';
import Top from '@/components/top'

const Layout = (props) => (
    <>
      <Head>
        <title>Ossi Pesonen - ossi.dev</title>
        <link rel="preconnect" href={ process.env.NEXT_PUBLIC_API_URL } />
        <link rel="preconnect" href="https://fonts.googleapis.com"  />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <link href="//fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:wght@500;600&display=swap" rel="stylesheet"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      </Head>
      <Top />
      { props.children }
    </>
);

export default Layout;
