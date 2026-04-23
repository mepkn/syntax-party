import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Theme = 'light' | 'dark'

interface UiState {
  theme: Theme
  activeSectionId: string | null
}

// Read synchronously at module load — before any React render — so the initial
// Redux state already matches localStorage/system preference. This prevents the
// first useEffect render from momentarily writing the wrong theme back.
function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme') as Theme | null
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const initialState: UiState = {
  theme: getInitialTheme(),
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
