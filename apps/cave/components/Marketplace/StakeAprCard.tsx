import { Text, VStack, HStack, Flex, Image } from '@concave/ui'

const StakeAprCard = (props: any) => {
  const { title, length, text, image, diluted } = props
  return (
    <Flex>
      <VStack>
        <HStack>
          <VStack>
            <Text fontSize="xs" color="text.low" fontWeight="medium">
              Stake Period
            </Text>
            <Text fontSize="s" color="white" fontWeight="bold">
              {title}
            </Text>
          </VStack>
          <>
            <Image h="70px" w="70px" src={image} alt={`stake-period-${length}`} />
          </>
          <VStack>
            <Text fontSize="xs" color="text.low" fontWeight="medium">
              {!diluted && 'v'}APR
            </Text>
            <Text fontSize="s" color="white" fontWeight="bold">
              {text}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Flex>
  )
}
export default StakeAprCard
