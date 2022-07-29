import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import { NumericInput } from '@concave/ui'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'

type VestedTokenInputProps = {
  onChangeValue: (value: string) => void
  value: string
  balance: BigNumber
  redeemMax: boolean
  redeemable: BigNumber
}
export const VestedTokenInput = ({
  balance,
  value,
  redeemMax,
  redeemable,
  onChangeValue,
}: VestedTokenInputProps) => {
  return (
    <Flex height={'85px'} direction="column">
      <Flex height={'85px'} shadow={'down'} rounded="2xl" px={4} py={2} direction="column">
        <Flex alignSelf="start" align={'center'} w="full">
          <NumericInput
            py={2}
            fontSize={'18px'}
            value={!redeemMax && value}
            disabled={redeemMax}
            placeholder={redeemMax ? formatEther(redeemable || '0') : '0.0'}
            onValueChange={({ value }) => {
              if (!redeemMax) {
                if (value === '.') {
                  onChangeValue('0.')
                  return
                }
                onChangeValue(value)
              }
            }}
          />
        </Flex>
        <Flex width={'full'} justify="space-between" align={'center'}>
          <BalanceButton
            redeemMax={redeemMax}
            amount={formatEther(balance || 0)}
            onClick={() => onChangeValue(formatEther(balance))}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
type BalanceButton = { onClick: VoidFunction; amount: string; redeemMax: boolean }
const BalanceButton = ({ onClick, amount, redeemMax }: BalanceButton) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <Flex
      transition="all .3s"
      fontSize={isOpen ? '15px' : '14px'}
      gap={2}
      fontWeight={'bold'}
      onMouseEnter={() => !redeemMax && onOpen()}
      onMouseLeave={() => !redeemMax && onClose()}
      cursor={!redeemMax && 'pointer'}
      onClick={onClick}
    >
      <Text textColor={isOpen ? 'text.accent' : 'text.low'}>Balance:</Text>
      <Text textColor={isOpen ? 'white' : 'text.low'}>{amount}</Text>
    </Flex>
  )
}
