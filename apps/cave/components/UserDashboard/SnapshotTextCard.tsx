import { Card, Flex } from '@concave/ui'

export function SnapshotTextCard({ children }) {
  return (
    <Card
      w={'30%'}
      h={{ base: 'fit-content', lg: 'full' }}
      p={{ base: 6, lg: 8 }}
      m={['2.5%', null, null, null, 0]}
      flexDir={'column'}
      width={{ base: '95%', lg: 'fit-content' }}
      justifyContent={'space-between'}
      variant="secondary.transparent"
      shadow="up"
    >
      <Flex
        flex={1}
        justify={{ base: 'center', lg: 'center' }}
        align={'start'}
        gap={{ base: 8, lg: 3 }}
        wrap="wrap"
        direction={{ base: 'row', lg: 'column' }}
      >
        {children}
      </Flex>
    </Card>
  )
}
