import { Box, Card, Flex, Text } from '@concave/ui'

function MarketplaceActivityCard(props) {
  return (
    <div>
      <Card
        p={7}
        gap={6}
        h="642px" // h="fit-content"
        shadow="Block Up"
        w="300px" // w= "100%"
        maxW="420px"
        backgroundBlendMode={'screen'}
        background={''} // glass png here
        backdropFilter="blur(15px)"
      >
        <Flex direction="row" gap={1} justify="center" mt={2}>
          <Flex
            grow={1}
            alignItems="center"
            justifyContent={'center'}
            minWidth="90px"
            minHeight="37px"
            shadow="down"
            borderRadius="16px"
            boxShadow={'up'}
          >
            <Text fontSize="14px" color="white" fontWeight="bold" textColor={'#5F7A99'}>
              All
            </Text>
          </Flex>
          <Flex
            grow={1}
            alignItems="center"
            justifyContent={'center'}
            minWidth="90px"
            minHeight="37px"
            shadow="down"
            borderRadius="16px"
            boxShadow={'up'}
          >
            <Text fontSize="14px" color="white" fontWeight="bold" textColor={'#5F7A99'}>
              Listing
            </Text>
          </Flex>
          <Flex
            grow={1}
            alignItems="center"
            justifyContent={'center'}
            minWidth="90px"
            minHeight="37px"
            shadow="down"
            borderRadius="16px"
            boxShadow={'up'}
          >
            <Text fontSize="14px" color="white" fontWeight="bold" textColor={'#5F7A99'}>
              Sale
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Box mx="auto" py={5} w="250px" h="100px" shadow="up" borderRadius="16px"></Box>
        </Flex>
      </Card>
    </div>
  )
}

export default MarketplaceActivityCard
