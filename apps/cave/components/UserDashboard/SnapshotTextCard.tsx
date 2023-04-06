import { Card, Flex } from '@concave/ui'

export function SnapshotTextCard({ children }) {
  return (
    <Card
      w={'30%'}
      minW={'200px'}
      h={{ base: '150px', lg: 'full' }}
      p={{ base: 2, lg: 4 }}
      flexDir={'column'}
      width={{ base: 'full', lg: 'fit-content' }}
      variant="secondary"
      shadow="up"
    >
      <Flex
        flex={1}
        justify={{ base: 'center', lg: 'center' }}
        justifyContent={'space-around'}
        align={{ base: 'center', lg: 'start' }}
        gap={{ base: 0, sm: 0, lg: 2 }}
        wrap={'wrap'}
        direction={{ base: 'row', lg: 'column' }}
      >
        {children}
      </Flex>
    </Card>
  )
}
