import { Card } from '@concave/ui'
import { FromInput, ToInput } from 'components/Lending/SuppliedAssetsInfo'

export function SuppliedAssetsCard({ buttonLabel }) {
  console.log('who are you ?', buttonLabel)
  return (
    <Card shadow="up">
      <Card px={10} py={8} gap={4}>
        <FromInput />
        <ToInput />
      </Card>
    </Card>
  )
}

export default SuppliedAssetsCard
