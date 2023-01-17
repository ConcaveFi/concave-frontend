import { Card, Flex } from '@concave/ui'

export function SnapshotTextCard({ children }) {
  return (
    <Card
      w={'30%'}
      h={{ base: '150px', lg: 'full' }}
      p={{ base: 2, lg: 0 }}
      px={{ base: 0, lg: 6 }}
      m={['2.5%', null, null, null, 0]}
      flexDir={'column'}
      width={{ base: '95%', lg: 'fit-content' }}
      variant="secondary"
      shadow="up"
    >
      <Flex
        flex={1}
        justify={{ base: 'center', lg: 'center' }}
        align={{ base: 'center', lg: 'start' }}
        gap={{ base: 0, sm: 0, lg: 2 }}
        wrap="wrap"
        direction={{ base: 'row', lg: 'column' }}
      >
        {children}
      </Flex>
    </Card>
  )
}
