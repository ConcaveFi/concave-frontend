import { CNV, Currency, CurrencyAmount } from '@concave/gemswap-sdk'
import { Box, Button, Card, Flex } from '@concave/ui'
import { CurrencyInputField } from 'components/CurrencyAmountField'
import { LIQUID_STAKING_ADDRESS } from 'contracts/LiquidStaking/LiquidStakingAddress'
import { utils } from 'ethers'
import { useFetchApi } from 'hooks/cnvData'
import { useApprove } from 'hooks/useApprove'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { StakingV1Contract } from 'lib/StakingV1Proxy/Contract'
// import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { useAccount, useBalance, useNetwork, useSigner } from 'wagmi'

function StakeInput(props: { poolId: number; period: string; onClose: () => void }) {
  const cnvPrice = useFetchApi('/api/cnv')
  const [{ data: account }] = useAccount()
  const [{ data }] = useNetwork()
  const [{ data: signer }] = useSigner()
  const [stakeInput, setStakeInput] = useState<CurrencyAmount<Currency>>(toAmount(0, CNV[3]))
  useCurrentSupportedNetworkId((chainId) => setStakeInput(toAmount(0, CNV[chainId])))
  const { allowance, ...approve } = useApprove(
    stakeInput.currency.wrapped,
    LIQUID_STAKING_ADDRESS[stakeInput.currency.chainId],
  )
  const [approveButtonText, setApproveButtonText] = useState('Approve CNV')
  const [allowanceEnough, setAllowanceEnough] = useState(false)
  const [cnvBalance, getBalance] = useBalance({
    addressOrName: account?.address,
    token: LIQUID_STAKING_ADDRESS[data?.chain?.id],
  })

  const approveCNV = () => {
    approve.sendApproveTx()
    setApproveButtonText('Pending...')
  }

  const [showApproveButton, setShowApproveButton] = React.useState(
    +allowance.value?.toString() === 0 ||
      +allowance.value?.toString() < +stakeInput.numerator.toString(),
  )
  const [showStakeButton, setShowStakeButton] = React.useState(
    +allowance.value?.toString() > 0 &&
      +allowance.value?.toString() > +stakeInput.numerator.toString(),
  )

  useEffect(() => {
    setShowApproveButton(
      +allowance.value?.toString() === 0 ||
        +allowance.value?.toString() < +stakeInput.numerator.toString(),
    )
    setShowStakeButton(
      +allowance.value?.toString() > 0 &&
        +allowance.value?.toString() > +stakeInput.numerator.toString(),
    )
  }, [allowance['value'], stakeInput['numerator']])

  return (
    <Box>
      <Card shadow="down" w="350px" px={0} py={0}>
        <Flex justify="space-between" alignItems="center">
          <CurrencyInputField currencyAmountIn={stakeInput} onChangeAmount={setStakeInput} />
        </Flex>
      </Card>

      <Box mt={10} width="350px">
        {showApproveButton && (
          <Button
            onClick={approveCNV}
            fontWeight="bold"
            fontSize="md"
            variant="primary"
            bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
            w="100%"
            h="50px"
            size="large"
            mx="auto"
            disabled={+stakeInput.numerator.toString() > +cnvBalance.data?.formatted}
          >
            {approveButtonText}
          </Button>
        )}

        {!showApproveButton && showStakeButton && (
          <Button
            mt={5}
            onClick={async () => {
              const contract = new StakingV1Contract(3, signer)
              const formattedInput = utils.parseUnits('10', 18)
              console.log(stakeInput.numerator.toString())
              contract
                .lock(account?.address, stakeInput.numerator.toString(), props.poolId)
                .then((x) => {
                  console.log(x)
                })
                .catch((e) => {
                  console.log(e)
                })
            }}
            fontWeight="bold"
            fontSize="md"
            variant="primary"
            bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
            w="100%"
            h="50px"
            size="large"
            mx="auto"
            disabled={
              +stakeInput.numerator.toString() === 0 || +stakeInput > +cnvBalance.data?.formatted
            }
          >
            Stake CNV
          </Button>
        )}

        {/* <Button
          mt={5}
          onClick={() => router.push('/dashboard')}
          fontWeight="bold"
          fontSize="md"
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="100%"
          h="40px"
          size="large"
          mx="auto"
        >
          Check position
        </Button> */}
      </Box>
    </Box>
  )
}

export default StakeInput
