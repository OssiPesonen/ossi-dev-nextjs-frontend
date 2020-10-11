import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article, Block, Employment, Link, Post, Showcase, Tag } from '@/assets/types'

type InitialStateProps = {
  showcases: Array<Showcase>
  links: Array<Link>,
  blocks: Array<Block>,
  posts: Array<Post>,
  employments: Array<Employment>,
  articles: Array<Article>,
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
    setArticles (state, action: PayloadAction<Array<Article>>) {
      state.articles = action.payload
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
  setTags,
  setLoaded,
  setArticles,
  setError
} = appSlice.actions

export default appSlice.reducer
