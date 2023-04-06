import { Card } from '@concave/ui'

export const SnapshotCard = ({ show, children }) => {
  if (!show) return <></>
  return (
    <Card
      variant={'primary'}
      w={'100%'}
      p={4}
      h={'fit-content'}
      minH={'360px'}
      maxH={'500px'}
      borderRadius={'3xl'}
      alignItems={'center'}
      flexDir={{ base: 'column', lg: 'row' }}
      justifyContent={'space-between'}
      gap={4}
    >
      {children}
    </Card>
  )
}
