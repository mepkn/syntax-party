import { useSelectedLanguages } from '../hooks/useSelectedLanguages'
import { useActiveSection } from '../hooks/useActiveSection'
import ComparisonView from '../components/ComparisonView'
import SectionNav from '../components/SectionNav'

export default function ComparePage() {
  const [selected] = useSelectedLanguages()
  useActiveSection()

  return (
    <div className="flex">
      <SectionNav />
      <main className="flex-1 min-w-0">
        <ComparisonView languages={selected} />
      </main>
    </div>
  )
}
