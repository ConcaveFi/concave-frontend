import { ExpandArrowIcon } from '@concave/icons'
import { Box, Button, Card, Flex, HStack, Spinner, Text, useBreakpointValue } from '@concave/ui'
import { useRouter } from 'next/router'
import { NoPositions } from './Summary/NoPositions'

export function DataTableCard({
  dataTableLabel,
  SortComponent,
  children,
  isLoading,
  hasPositions,
  dataTableOptions,
}: {
  dataTableLabel: string
  SortComponent?: JSX.Element
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
