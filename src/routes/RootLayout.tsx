import { Outlet } from 'react-router-dom'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import Header from '../components/Header'

export default function RootLayout() {
  return (
    <NuqsAdapter>
      <Header />
      <main>
        <Outlet />
      </main>
    </NuqsAdapter>
  )
}
