import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './RootLayout'
import ComparePage from './ComparePage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: ComparePage },
    ],
  },
])
