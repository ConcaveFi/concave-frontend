import { Text } from '@concave/ui'

export const SnapshotText = ({ title, data }) => (
  <>
    <Text color={'text.low'} mb={-2} fontSize={'sm'}>
      {title}
    </Text>
    <Text mb={2} fontWeight={'bold'} fontSize={'lg'}>
      {data}
    </Text>
  </>
)
