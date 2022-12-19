import { Flex } from '@concave/ui'

export const SnapshotCard = ({ isExpanded, children }) => (
  <Flex
    flex={1}
    p={4}
    borderRadius={'3xl'}
    alignItems={'center'}
    justifyContent={'space-between'}
    shadow={'down'}
  >
    {children}
  </Flex>
)
