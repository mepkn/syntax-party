import { useSelectedLanguages } from '../hooks/useSelectedLanguages'
import ComparisonView from '../components/ComparisonView'

export default function ComparePage() {
  const [selected] = useSelectedLanguages()
  return <ComparisonView languages={selected} />
}
