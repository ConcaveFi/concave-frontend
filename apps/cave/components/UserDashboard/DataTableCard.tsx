import { ExpandArrowIcon } from '@concave/icons'
import { Button, Card, Flex, Spinner, Text, useBreakpointValue } from '@concave/ui'
import { useRouter } from 'next/router'
import { NoPositions } from './Summary/NoPositions'

export function DataTableCard({
  setExpand,
  isExpanded,
  route,
  buttonLabel,
  dataTableLabel,
  SortComponent,
  children,
  buttonWidth = 'auto',
  isLoading,
  hasPositions,
}: {
  route?: string
  buttonLabel?: string
  dataTableLabel: string
  setExpand?: Function
  isExpanded: boolean
  SortComponent?: JSX.Element
  children: JSX.Element | JSX.Element[]
  buttonWidth?: string | number
  isLoading?: boolean
  hasPositions?: boolean | number
}) {
  const isMobile = useBreakpointValue({ base: true, lg: false })
  const router = useRouter()
  return (
    <Card
      variant={'primary'}
      shadow="down"
      borderGradient=""
      w={'100%'}
      flex={1}
      p={4}
      borderRadius={'3xl'}
      alignItems={'center'}
      h={{ base: '', lg: '420px' }}
    >
      <Flex w={'100%'} h={'fit-content'} align="center" flexDir={'column'}>
        <Flex w={'95%'} alignSelf={'center'} alignItems={'center'} justifyContent={'space-between'}>
          <Text
            fontWeight={'700'}
            color={'text.low'}
            flex={1}
            alignItems={'flex-start'}
            textAlign={'left'}
            fontSize={['sm', 'sm', 'sm', 'lg']}
          >
            {dataTableLabel}
          </Text>
          <Flex hidden={isMobile} w={'33%'} justifyContent={'center'}>
            {setExpand && (
              <Button
                w={'150px'}
                h={'45px'}
                variant={'secondary'}
                onClick={() => setExpand(!isExpanded)}
                justifyContent={'space-between'}
                px={6}
              >
                <ExpandArrowIcon
                  transition="all 0.7s"
                  transform={isExpanded ? 'rotate(0deg)' : 'rotate(180deg)'}
                />
                <Text
                  fontWeight={'700'}
                  color={'text.low'}
                  flex={1}
                  alignItems={'flex-start'}
                  textAlign={'left'}
                  fontSize={['sm', 'lg']}
                >
                  Show more
                </Text>
              </Button>
            )}
          </Flex>
          <Flex flex={1} justifyContent={'flex-end'}>
            {route && buttonLabel && (
              <Button
                onClick={() => router.push('/' + route)}
                w={buttonWidth}
                h={'45px'}
                variant={'secondary'}
                justifyContent={'space-between'}
                px={[2, 6]}
              >
                <Text fontSize={['xs', 'lg']} mr={2}>
                  Go to {buttonLabel}
                </Text>
              </Button>
            )}
          </Flex>
        </Flex>
        <Flex width={'100%'} ml={2} align={'center'} gap={2} fontWeight={'bold'}>
          {SortComponent}
        </Flex>
      </Flex>
      {isLoading ? <Spinner /> : hasPositions ? children : <NoPositions />}
    </Card>
  )
}
