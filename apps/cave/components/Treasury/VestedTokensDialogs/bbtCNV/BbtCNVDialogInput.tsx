import { Button, Flex, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { NumericInput } from '@concave/ui'

type BBT_CNVDialogInput = {
  onChangeValue: (value: number) => void
  value: number
  redeemable: number
  balance: number
}
export const BBT_CNVDialogInput = ({
  redeemable,
  balance,
  value,
  onChangeValue,
}: BBT_CNVDialogInput) => {
  return (
    <Flex height={'85px'} direction="column">
      <Flex height={'85px'} shadow={'down'} rounded="2xl" px={4} py={2} direction="column">
        <Flex alignSelf="start" align={'center'}>
          <NumericInput
            py={2}
            fontSize={'18px'}
            value={value}
            onValueChange={({ value }) => onChangeValue(+value)}
          />
          {/* <MaxButton onClick={() => onChangeValue(redeemable)} /> */}
        </Flex>
        <Flex width={'full'} justify="space-between" align={'center'}>
          <BalanceButton amount={balance} onClick={() => onChangeValue(balance)} />
        </Flex>
      </Flex>
    </Flex>
  )
}

const MaxButton = ({ onClick }: { onClick: VoidFunction }) => {
  return (
    <Tooltip
      openDelay={200}
      label="Change the input to the max amount you can redeem "
      textColor={'white'}
      fontWeight="bold"
      bg="text.low"
    >
      <Button width={'90px'} height="30px" variant={'primary.outline'} onClick={onClick}>
        <Text fontWeight={'bold'}>Max</Text>
      </Button>
    </Tooltip>
  )
}

const BalanceButton = ({ onClick, amount }: { onClick: VoidFunction; amount: number }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <Flex
      transition="all .3s"
      fontSize={isOpen ? '15px' : '14px'}
      gap={2}
      fontWeight={'bold'}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      cursor="pointer"
      onClick={onClick}
    >
      <Text textColor={isOpen ? 'text.accent' : 'text.low'}>Balance:</Text>
      <Text textColor={isOpen ? 'white' : 'text.low'}>{amount}</Text>
    </Flex>
  )
}
