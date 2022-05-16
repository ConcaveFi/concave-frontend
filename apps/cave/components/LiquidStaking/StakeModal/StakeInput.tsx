import { CNV, Currency, CurrencyAmount } from '@concave/gemswap-sdk'
import { Box, Button, Card, Flex } from '@concave/ui'
import { CurrencyInputField } from 'components/CurrencyAmountField'
import { ApproveButton, useApproval } from 'hooks/useAllowance'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { StakingV1ProxyAddress } from 'lib/StakingV1Proxy/Address'
import { StakingV1Contract } from 'lib/StakingV1Proxy/StakingV1Contract'
import React, { useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { useAccount, useSigner } from 'wagmi'

function StakeInput(props: { poolId: number; period: string; onClose: () => void }) {
  const [{ data: account }] = useAccount()
  const netWorkdId = useCurrentSupportedNetworkId()
  const [{ data: signer }] = useSigner()
  const [stakeInput, setStakeInput] = useState<CurrencyAmount<Currency>>(
    toAmount(0, CNV[netWorkdId]),
  )
  const approveStatus = useApproval(
    stakeInput.wrapped,
    StakingV1ProxyAddress[stakeInput.currency.chainId],
  )
  const [approvedCNV] = approveStatus
  const cnvBalance = useCurrencyBalance(stakeInput?.currency, { watch: true })

  return (
    <Box>
      <Card shadow="down" w="350px" px={0} py={0}>
        <Flex justify="space-between" alignItems="center">
          <CurrencyInputField currencyAmountIn={stakeInput} onChangeAmount={setStakeInput} />
        </Flex>
      </Card>

      <Box mt={10} width="350px">
        {approvedCNV && (
          <ApproveButton
            fontWeight="bold"
            fontSize="md"
            variant="primary"
            bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
            w="100%"
            h="50px"
            size="large"
            mx="auto"
            useApproveInfo={approveStatus}
          />
        )}
        {!approvedCNV && (
          <Button
            mt={5}
            onClick={async () => {
              const contract = new StakingV1Contract(netWorkdId, signer)
              contract
                .lock(account?.address, stakeInput.numerator.toString(), props.poolId)
                .then((x) => {
                  console.log(x)
                  props.onClose()
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
              !cnvBalance.data ||
              +cnvBalance.data?.numerator.toString() === 0 ||
              +stakeInput.numerator.toString() === 0 ||
              stakeInput.greaterThan(cnvBalance.data?.numerator)
            }
          >
            {+stakeInput.numerator?.toString() > +cnvBalance.data?.numerator.toString() ||
            +cnvBalance.data?.numerator.toString() === 0
              ? 'Insufficient CNV'
              : 'Stake CNV'}
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
