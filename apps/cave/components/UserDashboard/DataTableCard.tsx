import { ExpandArrowIcon } from '@concave/icons'
import { Button, Card, Collapse, Flex, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'

export function DataTableCard({
  setExpand,
  isExpanded,
  route,
  buttonLabel,
  dataTableLabel,
  SortComponent,
  children,
}: {
  route: string
  buttonLabel: string
  dataTableLabel: string
  setExpand: Function
  isExpanded: boolean
  SortComponent: JSX.Element
  children: JSX.Element | JSX.Element[]
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
        <Flex w={'100%'} h={'25%'} flexDir={'column'}>
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
            </Flex>
            <Flex w={'33%'} justifyContent={'flex-end'}>
              <ButtonLink
                href={route}
                w={'auto'}
                h={'45px'}
                variant={'secondary'}
                justifyContent={'space-between'}
                px={6}
              >
                <Text>Go to {buttonLabel}</Text>
                <ExpandArrowIcon transform={'rotate(270deg)'} />
              </ButtonLink>
            </Flex>
          </Flex>
          <Flex width={'100%'} ml={2} align={'center'} gap={2} fontWeight={'bold'}>
            {SortComponent}
          </Flex>
        </Flex>
        {children}
      </Card>
    </Collapse>
  )
}
