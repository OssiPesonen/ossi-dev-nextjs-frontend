import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article, Block, Employment, Link, Post as PostType, Post, Showcase, Tag } from '@/assets/types'
import { AppThunk } from '@/store/store'

type InitialStateProps = {
  showcases: Array<Showcase>
  links: Array<Link>,
  blocks: Array<Block>,
  posts: Array<Post>,
  employments: Array<Employment>,
  articles: Array<Article>,
  showcase: Showcase,
  post: Post,
  tags: Array<Tag>,
  loaded: boolean;
  error: string
}

const initialState: InitialStateProps = {
  showcases: null,
  links: null,
  blocks: null,
  posts: null,
  employments: null,
  articles: null,
  showcase: null,
  post: null,
  tags: null,
  loaded: false,
  error: ''
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setShowcases (state, action: PayloadAction<Array<Showcase>>) {
      state.showcases = action.payload
    },
    setLinks (state, action: PayloadAction<Array<Link>>) {
      state.links = action.payload
    },
    setBlocks (state, action: PayloadAction<Array<Block>>) {
      state.blocks = action.payload
    },
    setPosts (state, action: PayloadAction<Array<Post>>) {
      state.posts = action.payload
    },
    setEmployments (state, action: PayloadAction<Array<Employment>>) {
      state.employments = action.payload
    },
    setPost (state, action: PayloadAction<Post>) {
      state.post = action.payload
    },
    setArticles (state, action: PayloadAction<Array<Article>>) {
      state.articles = action.payload
    },
    setShowcase (state, action: PayloadAction<Showcase>) {
      state.showcase = action.payload
    },
    setTags (state, action: PayloadAction<Array<Tag>>) {
      state.tags = action.payload
    },
    setLoaded (state, action: PayloadAction<boolean>) {
      state.loaded = action.payload
    },
    setError (state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  }
})

export const {
  setLinks,
  setShowcases,
  setBlocks,
  setPosts,
  setEmployments,
  setPost,
  setShowcase,
  setTags,
  setLoaded,
  setArticles,
  setError
} = appSlice.actions

export default appSlice.reducer

/**
 * Fetch showcases for list
 */
export const fetchShowcases = (): AppThunk => async dispatch => {
  try {
    const response = await fetch(process.env.NEXT_API_URL + '/showcases')
    const data: Array<Showcase> = await response.json()
    dispatch(setShowcases(data))
  } catch (err) {
    dispatch(setError(err.toString()))
  }
}

/**
 * Fetch posts for list
 */
export const fetchPosts = (): AppThunk => async dispatch => {
  try {
    const response = await fetch(process.env.NEXT_API_URL + `/blog-posts?_limit=15&_sort=published_at:DESC`)
    const data: Array<Post> = await response.json()
    dispatch(setPosts(data))
  } catch (err) {
    dispatch(setError(err.toString()))
  }
}
