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
    <Card
      variant={'primary'}
      shadow="down"
      borderGradient=""
      w={'100%'}
      minH={'390px'}
      p={4}
      borderRadius={'3xl'}
      alignItems={'center'}
    >
      <Flex w={'100%'} h={'fit-content'} flexDir={'column'}>
        <Flex w={'95%'} alignSelf={'center'} alignItems={'center'} justifyContent={'space-between'}>
          <Text
            fontWeight={'700'}
            color={'text.low'}
            flex={1}
            alignItems={'flex-start'}
            textAlign={'left'}
            fontSize={['sm', 'lg']}
          >
            {dataTableLabel}
          </Text>
          <Flex flex={1} justifyContent={'flex-end'}>
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
  )
}
