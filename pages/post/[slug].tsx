import React, { useEffect } from 'react'

// App
import Link from 'next/link'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import { useSelector, useDispatch } from 'react-redux'
import { get } from 'lodash'
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router'

// Assets
import { Article, Post as PostType } from '@/assets/types'
import IconArrowLeft from '@/assets/icons/i-arrow-left'
import IconArchive from '@/assets/icons/i-archive'
import { ParagraphComponent, ImageComponent, LinkComponent, CodeComponent } from '@/assets/react-markdown-renderers'

// Redux
import { setPosts } from '@/store/reducers/appReducer'
import { RootState } from '@/store/rootReducer'

// components
import Layout from '@/layouts/layout'
import Posts from '@/components/index/posts'
import Contact from '@/components/index/contact'

type PostProps = {
  post: PostType,
  posts: Array<PostType>,
}

const Post = ({ post, posts }: PostProps) => {
  // Redux

  const app = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()
  const router = useRouter()

  /**
   * Fetch posts list if user visits this page first
   */
  useEffect(() => {
    if (!app.posts) {
      dispatch(setPosts(posts))
    }
  }, [app.posts])

  const title: string = `${ post.attributes.Title } - Blog - ossi.dev`;

  return (
    <Layout>
      <Head>
        <title>{ title }</title>
      </Head>
      <NextSeo
        title={title}
        description={get(post, 'SEO.Description', '')}
        canonical={ process.env.NEXT_PUBLIC_APP_URL + router.asPath }
        openGraph={{
          url: process.env.NEXT_PUBLIC_APP_URL + router.asPath,
          title: title,
          description: get(post, 'SEO.Description', ''),
          images: [
            { url: get(post, 'Cover.url', null) ? process.env.NEXT_PUBLIC_API_URL + post.attributes.Cover.url : ''  },
          ]
        }}
      />
      <article id="post" className="container-md">
        <header>
          <Link href="/#posts"><a className="back-to-frontpage"><IconArrowLeft/> Back to frontpage</a></Link>
          <h1>{ post.attributes.Title }</h1>
        </header>
        <section>
          <div className="cover-photo mb-4 full-bleed">
            { get(post, 'Cover.url', null) ?
              <img src={ process.env.NEXT_PUBLIC_API_URL + post.attributes.Cover.url } alt={ post.attributes.Cover.alternativeText } width="1100" height="600" /> : <></> }
          </div>
          <ReactMarkdown source={ post.attributes.Content }
                         transformImageUri={ (uri) => process.env.NEXT_PUBLIC_API_URL + uri }
                         renderers={ {
                           image: ImageComponent,
                           paragraph: ParagraphComponent,
                           link: LinkComponent,
                           code: CodeComponent
                         } }
                         escapeHtml={false}
                         className="post-content"/>
        </section>
        <hr/>
        <footer>
          <Link href="/#posts"><a className="back-to-frontpage"><IconArrowLeft/> Back to frontpage</a></Link>
          <Link href="/posts"><a className="ml-4"><IconArchive/> To archives</a></Link>
        </footer>
      </article>
      <Posts hideDescription={ true } openPostId={ post.id }/>
      <Contact/>
    </Layout>
  )
}

export async function getStaticPaths () {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/blog-posts')
  const posts = await res.json()
  const paths = posts.map((post: PostType) => `/post/${ post.attributes.Slug }`)
  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  const postsResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/blog-posts?_limit=15&_sort=published_at:DESC')
  const posts: Array<PostType> = await postsResponse.json()

  const postResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + `/blog-posts?Slug=${ params.slug }`)
  const singlePost: PostType = await postResponse.json()

  return {
    props: {
      post: get(singlePost, [0], null),
      posts,
    },
  }
}

export default Post
