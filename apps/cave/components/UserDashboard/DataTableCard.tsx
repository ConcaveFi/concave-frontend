import { ExpandArrowIcon } from '@concave/icons'
import { Button, Card, Collapse, Flex, Spinner, Text } from '@concave/ui'
import router from 'next/router'
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
  return (
    <Collapse in={isExpanded} startingHeight={'49%'} endingHeight={'100%'}>
      <Card
        variant={'primary'}
        w={'100%'}
        h={isExpanded ? '100%' : '390px'}
        p={4}
        borderRadius={'3xl'}
        alignItems={'center'}
        gap={4}
      >
        <Flex w={'100%'} h={isExpanded ? '4%' : '22%'} flexDir={'column'}>
          <Flex
            w={'95%'}
            alignSelf={'center'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Text
              fontWeight={'700'}
              color={'text.low'}
              w={'33%'}
              alignItems={'flex-start'}
              textAlign={'left'}
            >
              {dataTableLabel}
            </Text>
            <Flex w={'33%'} justifyContent={'center'}>
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
                  <Text>Show more</Text>
                </Button>
              )}
            </Flex>
            <Flex w={'33%'} h={'45px'} justifyContent={'flex-end'}>
              {route && buttonLabel && (
                <Button
                  onClick={() => router.push('/' + route)}
                  w={buttonWidth}
                  h={'45px'}
                  variant={'secondary'}
                  justifyContent={'space-between'}
                  px={6}
                >
                  <Text mr={2}>Go to {buttonLabel}</Text>
                  <ExpandArrowIcon transform={'rotate(270deg)'} />
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
    </Collapse>
  )
}
