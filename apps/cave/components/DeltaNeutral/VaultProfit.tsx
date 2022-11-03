import { CNV } from '@concave/core'
import { Button, Flex, gradientBorder, Image, Text } from '@concave/ui'
import { CurrencyInputField } from 'components/CurrencyAmountField'
import { FC, useState } from 'react'
import { toAmount } from 'utils/toAmount'

type VaultProfitProps = { vaultPosition: JSX.Element }
export const VaultProfit: FC<VaultProfitProps> = ({ vaultPosition }) => {
  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit')
  const [currencyAmount, setCurrencyAmount] = useState(toAmount(10, CNV[1]))
  return (
    <Flex
      w={'640px'}
      apply="background.metal"
      sx={{ ...gradientBorder({ borderWidth: 2, variant: 'secondary' }) }}
      rounded={'2xl'}
      zIndex={1}
    >
      {vaultPosition}
      <Flex direction={'column'} align="center" flex={1} px={10} justify="space-around" py={4}>
        <ProfitCalculator />
        <TypeChooser currentType={type} onChangeType={setType} />
        <CurrencyInputField currencyAmountIn={currencyAmount} onChangeAmount={() => {}} />
        <Button variant={'primary'} w="full" height={'60px'}>
          <Text fontWeight={'bold'} fontSize="xl">
            {`${{ deposit: 'Deposit', withdraw: 'Withdraw' }[type]} ${
              currencyAmount.currency.symbol
            }`}
          </Text>
        </Button>
      </Flex>
    </Flex>
  )
}
type TypeChooserProps = {
  onChangeType: (type: 'deposit' | 'withdraw') => void
  currentType: 'deposit' | 'withdraw'
}
const TypeChooser: FC<TypeChooserProps> = ({ currentType, onChangeType }) => {
  const isDeposit = currentType === 'deposit'
  const border = gradientBorder({ borderWidth: 2, variant: 'secondary' })
  return (
    <Flex
      h={'60px'}
      w="full"
      shadow={'up'}
      rounded="2xl"
      sx={{ ...gradientBorder({ borderWidth: 2, variant: 'secondary' }) }}
      p={2}
      color={'text.small'}
      fontWeight="bold"
      fontSize={'lg'}
    >
      <Flex
        color={isDeposit && 'white'}
        shadow={isDeposit && 'up'}
        w={'full'}
        h="full"
        rounded={'2xl'}
        sx={isDeposit && { ...border }}
      >
        <Text onClick={() => onChangeType('deposit')} cursor="pointer" m={'auto'}>
          Deposit
        </Text>
      </Flex>
      <Flex
        color={currentType === 'withdraw' && 'white'}
        shadow={!isDeposit && 'up'}
        w={'full'}
        h="full"
        rounded={'2xl'}
        sx={!isDeposit && { ...border }}
      >
        <Text onClick={() => onChangeType('withdraw')} cursor="pointer" m={'auto'}>
          Withdraw
        </Text>
      </Flex>
    </Flex>
  )
}
const ProfitCalculator = () => (
  <Flex
    width={'full'}
    rounded="2xl"
    shadow={'up'}
    height="55px"
    align={'center'}
    gap={2}
    justify={'center'}
  >
    <Image boxSize={'20px'} src="./assets/icons/calculator.svg" alt="calculator" />
    <Text fontWeight={'bold'} fontSize={'xl'} color={'text.small'}>
      Profit calculator
    </Text>
  </Flex>
)
