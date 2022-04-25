import { Box, Card, Flex, Text } from '@concave/ui'

function MarketplaceActivityCard(props) {
  return (
    <div>
      <Card
        p={7}
        gap={2}
        //   variant=""
        //   h="fit-content"
        h="642px"
        shadow="Block Up"
        //   w="100%"
        w="300px"
        maxW="420px"
      >
        <Flex direction="row" gap={6} justify="center" mt={2}>
          <Box mx="auto" py={5} w="90px" h="37px" shadow="down" borderRadius="16px">
            <Text fontSize="s" color="white" fontWeight="bold">
              All
            </Text>
          </Box>
          <Box mx="auto" py={5} w="90px" h="37px" shadow="down" borderRadius="16px">
            <Text fontSize="s" color="white" fontWeight="bold">
              Listing
            </Text>
          </Box>
          <Box mx="auto" py={5} w="90px" h="37px" shadow="down" borderRadius="16px">
            <Text fontSize="s" color="white" fontWeight="bold">
              Sale
            </Text>
          </Box>
        </Flex>
        <Flex>
          <Box mx="auto" py={5} w="250px" h="100px" shadow="up" borderRadius="16px"></Box>
        </Flex>
      </Card>
    </div>
  )
}

export default MarketplaceActivityCard
