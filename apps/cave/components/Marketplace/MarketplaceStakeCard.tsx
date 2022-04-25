import { Box, Card, Flex, HStack, Image, Text, VStack } from '@concave/ui'

function MarketplaceStakeCard(props) {
  const vaprText = props.icon === '12m' ? 'Non-Dilutive vAPR' : 'vAPR'

  return (
    <Card
      p={7}
      gap={2}
      // variant=""
      shadow="Block Up"
      w="300px"
      h="283px"
    >
      <Box pos="relative" border={'1px solid green'}>
        <Flex direction="row" gap={6} mt={2}>
          <VStack>
            <Text color="text.low" fontSize="sm">
              Stake period
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              {props.period} 12 month
            </Text>
          </VStack>
          <Box w={'45%'}>
            <Image sizes="100px" src={`/assets/marketplace/12mposition.png`} alt="stake period" />
          </Box>
          {/* <Image src={`/assets/marketplace/${props.icon}position.png`} alt="stake period" /> */}
          <VStack>
            <Text color="text.low" fontSize="sm">
              {props.vaprText} vAPR
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              {props.vapr} 6,342%
            </Text>
          </VStack>
        </Flex>
      </Box>
    </Card>
  )
}

export default MarketplaceStakeCard
