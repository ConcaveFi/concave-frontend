import { GasIcon } from '@concave/icons'
import { Flex, Spinner, Text } from '@concave/ui'
import { useIsMounted } from 'hooks/useIsMounted'
import { useFeeData } from 'wagmi'

export const GasPrice = () => {
  const { data, isSuccess, isError, isLoading } = useFeeData({ formatUnits: 'gwei', watch: true })
  const isMounted = useIsMounted()
  if (isError || !isMounted) return null
  return (
    <Flex>
      <GasIcon viewBox="0 0 16 16" mr={2} />
      {isSuccess && (
        <Text fontSize="xs" color="text.low" fontWeight="medium" whiteSpace="nowrap">
          {(+data?.formatted.gasPrice).toFixed(2)} gwei
        </Text>
      )}
      {isLoading && <Spinner size="xs" color="text.low" />}
    </Flex>
  )
}
