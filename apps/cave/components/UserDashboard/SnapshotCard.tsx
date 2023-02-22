import { Card, Collapse, useBreakpointValue } from '@concave/ui'

export const SnapshotCard = ({ isExpanded, children }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false })
  return (
    <Collapse in={isExpanded} endingHeight={isMobile ? '400px' : '360px'}>
      <Card
        variant={'primary'}
        w={'100%'}
        p={4}
        h={'100%'}
        borderRadius={'3xl'}
        alignItems={'center'}
        flexDir={{ base: 'column', lg: 'row' }}
        justifyContent={'space-between'}
        gap={4}
      >
        {children}
      </Card>
    </Collapse>
  )
}
