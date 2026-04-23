import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Theme = 'light' | 'dark'

interface UiState {
  theme: Theme
  activeSectionId: string | null
}

const initialState: UiState = {
  theme: 'light',
  activeSectionId: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload
    },
    setActiveSectionId(state, action: PayloadAction<string | null>) {
      state.activeSectionId = action.payload
    },
  },
})

export const { setTheme, setActiveSectionId } = uiSlice.actions
export default uiSlice.reducer
