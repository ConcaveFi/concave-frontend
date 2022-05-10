import { GasIcon } from '@concave/icons'
import { Flex, Spinner, Text } from '@concave/ui'
import { useFeeData } from 'wagmi'

export const GasPrice = () => {
  const [{ data, error }] = useFeeData({ formatUnits: 'gwei', watch: true })
  if (error) return null
  return (
    <Flex>
      <GasIcon viewBox="0 0 16 16" mr={2} />
      {data && (
        <Text fontSize="xs" color="text.low" fontWeight="medium" whiteSpace="nowrap">
          {Number(data?.formatted.gasPrice).toFixed(2)} gwei
        </Text>
      )}
      {
        // only show spinner on the first time
        !data && <Spinner size="xs" color="text.low" />
      }
    </Flex>
  )
}
