import { CurrencyAmount, WETH9 } from '@concave/core'
import { GasIcon } from '@concave/icons'
import { Flex, Spinner, Text, Tooltip } from '@concave/ui'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { toAmount } from 'utils/toAmount'
import { useFeeData } from 'wagmi'
import { useFiatPrice } from './hooks/useFiatPrice'

const gasLimit = {
  swap: 111_000,
  bond: 210_000,
}

// plz refator this estimate limit thing
export const GasPrice = ({ estimate }) => {
  const { data, isError } = useFeeData({
    formatUnits: 'gwei',
    staleTime: 1000,
    cacheTime: Infinity,
    watch: true,
  })
  const networkId = useCurrentSupportedNetworkId()
  const { price: etherPrice, stablecoin } = useFiatPrice(WETH9[networkId])

  if (isError) return null

  const formatedGasPrice = (+data?.formatted.gasPrice).toFixed(2)
  const gasFiatPrice = etherPrice?.quote(
    CurrencyAmount.fromRawAmount(
      WETH9[networkId],
      data?.gasPrice.mul(gasLimit[estimate] || 1).toString(),
    ),
  )
  return (
    <Tooltip
      label={`Estimated gas fee at current base fee of ${formatedGasPrice} gwei
    `}
    >
      <Flex
        cursor="default"
        rounded="lg"
        px={2}
        py={1}
        mx={-2}
        my={-1}
        _hover={{ bg: 'whiteAlpha.100' }}
      >
        <GasIcon viewBox="0 0 16 16" mr={2} />
        {data && (
          <Text fontSize="xs" color="text.low" fontWeight="medium" whiteSpace="nowrap">
            {gasFiatPrice?.greaterThan(toAmount(0.01, stablecoin))
              ? `$${gasFiatPrice.toFixed(2, { groupSeparator: ',' })}`
              : `${formatedGasPrice} gwei`}
          </Text>
        )}
        {
          // only show spinner on the first time
          !data && <Spinner size="xs" color="text.low" />
        }
      </Flex>
    </Tooltip>
  )
}
