import { Card, Collapse } from '@concave/ui'

export const SnapshotCard = ({ isExpanded, children }) => (
  <Collapse in={isExpanded} endingHeight={'49%'}>
    <Card
      variant={'primary'}
      w={'100%'}
      p={4}
      h={'100%'}
      borderRadius={'3xl'}
      alignItems={'center'}
      flexDir={'row'}
      justifyContent={'space-between'}
      gap={4}
    >
      {children}
    </Card>
  </Collapse>
)
