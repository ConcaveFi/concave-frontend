import { ExpandArrowIcon } from '@concave/icons'
import { Button, Card, Flex, Text } from '@concave/ui'
import router from 'next/router'

export function DataTableCard({
  route,
  buttonLabel,
  dataTableLabel,
  SortComponent,
  children,
  buttonWidth = 'auto',
}: {
  route: string
  buttonLabel: string
  dataTableLabel: string
  SortComponent?: JSX.Element
  children: JSX.Element | JSX.Element[]
  buttonWidth?: string | number
}) {
  return (
    // <Collapse in={isExpanded} startingHeight={'49%'} endingHeight={'100%'}>
    <Card
      variant={'primary'}
      shadow="down"
      borderGradient=""
      w={'100%'}
      minH={'390px'}
      p={4}
      borderRadius={'3xl'}
      alignItems={'center'}
      // gap={4}
    >
      <Flex w={'100%'} h={'120px'} flexDir={'column'}>
        <Flex w={'95%'} alignSelf={'center'} alignItems={'center'} justifyContent={'space-between'}>
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
            {/* <Button
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
            </Button> */}
          </Flex>
          <Flex w={'33%'} justifyContent={'flex-end'}>
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
          </Flex>
        </Flex>
        <Flex width={'100%'} ml={2} align={'center'} gap={2} fontWeight={'bold'}>
          {SortComponent}
        </Flex>
      </Flex>
      {children}
    </Card>
    // </Collapse>
  )
}
