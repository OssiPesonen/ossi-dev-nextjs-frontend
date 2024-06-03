import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Block, Employment, Post, Showcase, Tag } from '@/assets/types'

type InitialStateProps = {
  showcases: Showcase[],
  blocks: Block[],
  posts: Post[],
  employments:Employment[],
  tags: Tag[],
  loaded: boolean;
  error: string
}

const initialState: InitialStateProps = {
  showcases: null,
  blocks: null,
  posts: null,
  employments: null,
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
    setBlocks (state, action: PayloadAction<Array<Block>>) {
      state.blocks = action.payload
    },
    setPosts (state, action: PayloadAction<Array<Post>>) {
      state.posts = action.payload
    },
    setEmployments (state, action: PayloadAction<Array<Employment>>) {
      state.employments = action.payload
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
  setShowcases,
  setBlocks,
  setPosts,
  setEmployments,
  setTags,
  setLoaded,
  setError
} = appSlice.actions

export default appSlice.reducer
