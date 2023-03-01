import { Card, Flex, HStack, Spinner } from '@concave/ui'
import { NoPositions } from './Summary/NoPositions'

export function DataTableCard({
  children,
  isLoading,
  hasPositions,
  dataTableOptions,
}: {
  children: JSX.Element | JSX.Element[]
  isLoading?: boolean
  hasPositions?: boolean | number
  dataTableOptions: JSX.Element
}) {
  return (
    <Card p={4} borderRadius={'3xl'} h={'full'} gap={4}>
      <HStack>{dataTableOptions}</HStack>
      {isLoading ? <Loading /> : hasPositions ? children : <NoPositions />}
    </Card>
  )
}

const Loading = () => {
  return (
    <Flex w={'full'} justifyContent={'center'} align={'center'} h={'full'}>
      <Spinner />
    </Flex>
  )
}
