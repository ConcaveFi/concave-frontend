import { Flex, Spinner, Text } from '@concave/ui'

export const Loading = ({ message = '' }: { message?: string }) => {
  return (
    <Flex w={'full'} p={2} flexDir={'column'} justifyContent={'center'} align={'center'} h={'full'}>
      <Spinner />
      <Text>{message}</Text>
    </Flex>
  )
}
