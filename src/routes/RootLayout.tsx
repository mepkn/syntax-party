import { Outlet } from 'react-router-dom'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'

export default function RootLayout() {
  return (
    <NuqsAdapter>
      <header className="border-b px-6 py-4">
        <span className="font-semibold text-lg">syntax-party</span>
      </header>
      <main>
        <Outlet />
      </main>
    </NuqsAdapter>
  )
}
