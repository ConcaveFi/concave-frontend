import { Card } from '@concave/ui'

export function SnapshotTextCard({ children }) {
  return (
    <Card
      w={'30%'}
      h={350}
      p={8}
      alignItems={'flex-start'}
      flexDir={'column'}
      justifyContent={'space-between'}
      // borderGradient={''}
      shadow="up"
      variant="secondary.transparent"
    >
      {children}
    </Card>
  )
}
