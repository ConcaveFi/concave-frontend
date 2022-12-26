import { Flex } from '@concave/ui'

export const SnapshotCard = ({ children }) => (
  <Flex
    flex={1}
    p={{ base: 0, lg: 4 }}
    w={{ xl: '60%' }}
    borderRadius={'3xl'}
    maxH="700px"
    alignItems={'center'}
    direction={{ base: 'column', lg: 'row' }}
    justifyContent={'space-between'}
    shadow={'down'}
  >
    {children}
  </Flex>
)
