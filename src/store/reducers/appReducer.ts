import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Block, Employment, Link, Post, Showcase } from '@/assets/types'
import { AppThunk } from '@/store/store'

type InitialStateProps = {
  showcases: Array<Showcase>
  links: Array<Link>,
  blocks: Array<Block>,
  posts: Array<Post>,
  employments: Array<Employment>,
  error: string
}

const initialState: InitialStateProps = {
  showcases: null,
  links: null,
  blocks: null,
  posts: null,
  employments: null,
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
    setError (state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    setPosts (state, action: PayloadAction<Array<Post>>) {
      state.posts = action.payload
    },
    setEmployments (state, action: PayloadAction<Array<Employment>>) {
      state.employments = action.payload
    }
  }
})

export const {
  setLinks,
  setShowcases,
  setBlocks,
  setPosts,
  setEmployments,
  setError
} = appSlice.actions

export default appSlice.reducer

export const fetchShowcases = (): AppThunk => async dispatch => {
  try {
    const response = await fetch(process.env.NEXT_API_URL + '/showcases')
    const data: Array<Showcase> = await response.json();
    dispatch(setShowcases(data))
  } catch (err) {
    dispatch(setError(err.toString()))
  }
}
