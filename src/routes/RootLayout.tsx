import { Outlet } from 'react-router-dom'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import Header from '../components/Header'
import { useTheme } from '../hooks/useTheme'

function Layout() {
  useTheme()
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default function RootLayout() {
  return (
    <NuqsAdapter>
      <Layout />
    </NuqsAdapter>
  )
}
