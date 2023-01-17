import { Flex, Text } from '@concave/ui'

export const SnapshotText = ({ title, data }) => (
  <Flex
    direction="column"
    mx={{ base: 1, sm: 2, md: 4, lg: 0 }}
    align={{ base: 'center', lg: 'start' }}
    gap={1}
  >
    <Text color={'text.low'} fontSize={['xs', 'sm']}>
      {title}
    </Text>
    <Text lineHeight={'14px'} fontWeight={'bold'} fontSize={['sm', 'md', 'lg']}>
      {data}
    </Text>
  </Flex>
)
