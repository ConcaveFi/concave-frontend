import { Card } from '@concave/ui'

export function SnapshotTextCard({ children }) {
  return (
    <Card
      w={'25%'}
      h={350}
      p={8}
      alignItems={'flex-start'}
      flexDir={'column'}
      justifyContent={'space-between'}
    >
      {children}
    </Card>
  )
}
