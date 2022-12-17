import { Card } from '@concave/ui'

export const SnapshotCard = ({ isExpanded, children }) => (
  <Card
    // variant={'primary'}
    flex={1}
    p={4}
    h={'100%'}
    borderRadius={'3xl'}
    alignItems={'center'}
    flexDir={'row'}
    justifyContent={'space-between'}
    borderGradient=""
    shadow={'down'}
    gap={0}
  >
    {children}
  </Card>
)
