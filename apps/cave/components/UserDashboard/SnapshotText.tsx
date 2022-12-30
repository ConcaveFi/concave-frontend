import { Flex, Text } from '@concave/ui'

export const SnapshotText = ({ title, data }) => (
  <Flex direction="column" align={{ base: 'center', lg: 'start' }} gap={1}>
    <Text color={'text.low'} fontSize={['xs', 'sm']}>
      {title}
    </Text>
    <Text lineHeight={'14px'} mb={2} fontWeight={'bold'} fontSize={['sm', 'md', 'lg']}>
      {data}
    </Text>
  </Flex>
)
