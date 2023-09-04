import { CNV, CNV_REDEEM_ADDRESS, Currency, CurrencyAmount, Percent, USDC } from '@concave/core'
import { RedeemABI } from '@concave/core/src/contracts/RedeemAbi'
import { ExpandArrowIcon } from '@concave/icons'
import { BoxProps, Button, Card, HStack } from '@concave/ui'
import { waitForTransaction } from '@wagmi/core'
import { CustomRecipient } from 'components/AMM'
import { useCustomRecipient } from 'components/AMM/Swap/CustomRecipient'
import { useCurrencyApprove } from 'components/CurrencyAmountButton/CurrencyAmountButton'
import { CurrencyInputField } from 'components/CurrencyAmountField'
import { BigNumber } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useTransaction } from 'hooks/useTransaction'
import { useState } from 'react'
import { compactFormat } from 'utils/bigNumberMask'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'

export const RedemCNVCard = () => {
  const chainId = useCurrentSupportedNetworkId()
  const redeemContract = { address: CNV_REDEEM_ADDRESS[chainId], abi: RedeemABI }
  const tokenIn = CNV[chainId]
  const initialAmountIn = CurrencyAmount.fromRawAmount(tokenIn, `0`)

  const rate = useContractRead({
    ...redeemContract,
    functionName: 'rate',
  })

  const [amountIn, setAmountIn] = useState<CurrencyAmount<Currency>>(initialAmountIn)
  const fraction = new Percent(`1000000000000000000`, rate.data.toString() || 100)
  const amountOut = CurrencyAmount.fromRawAmount(USDC[chainId], amountIn.divide(fraction).quotient)
  const account = useAccount()
  const approve = useCurrencyApprove(amountIn, CNV_REDEEM_ADDRESS[chainId])
  const recipient = useCustomRecipient()
  const { config } = usePrepareContractWrite({
    ...redeemContract,
    functionName: `redeem`,
    args: [
      BigNumber.from(amountIn.quotient.toString()),
      recipient.isValid ? recipient.address : account.address,
    ],
  })
  const write = useContractWrite(config)
  const redeemtx = useTransaction(write.writeAsync, {
    onError: console.error,
    meta: {
      type: 'redeem',
      amount: `${compactFormat(amountIn.quotient.toString())} CNV`,
    },
  })

  return (
    <Card
      gap={4}
      p={4}
      justify="center"
      justifyContent={'space-around'}
      w={'100%'}
      maxW={330}
      minH={'fit-content'}
      h={'full'}
      px={4}
    >
      <CurrencyInputField currencyAmountIn={amountIn} onChangeAmount={setAmountIn} />

      <HStack justifyContent={'center'} mt={-2} mb={-2}>
        <ExpandArrowIcon />
      </HStack>

      <CurrencyInputField currencyAmountIn={amountOut} onChangeAmount={console.log} />

      <CustomRecipient {...recipient}></CustomRecipient>
      {!approve.approved && (
        <Button size="large" w="full" variant={'primary'} {...approve.buttonProps} />
      )}

      {approve.approved && (
        <Button
          size="large"
          w="full"
          variant={'primary'}
          isLoading={write.isLoading}
          isDisabled={!write || amountIn.equalTo(0)}
          onClick={redeemtx.sendTx}
        >
          Redeem CNV
        </Button>
      )}
    </Card>
  )
}
