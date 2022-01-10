import { Box, Center, Flex, Grid, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { ChevronRightIcon, QuestionOutlineIcon } from '@chakra-ui/icons'
import { Card } from './Card'

function BondInfoCard() {
  return (
    <Card w={484} variant="secondary" borderWidth={2} bgImage="/assets/cave.png">
      <Card shadow="down" borderRadius="2xl" h="100px" align="center" justify="center" spacing={0}>
        <HStack color="text.3" fontSize="xs" fontWeight="bold" spacing="5px">
          <QuestionOutlineIcon />
          <Text>Vesting term</Text>
        </HStack>
        <Text color="text.2" fontSize="2xl" fontWeight="bold">5 days</Text>
      </Card>

      <HStack h="120px" divider={<Box w="1px" h="100%" bg="strokeReflection" />}>
        <VStack w="100%" spacing="2px">
          <Text color="text.3" fontSize="s" fontWeight="bold">Current Price</Text>
          <Text color="text.2" fontSize="xl" fontWeight="bold">$3,312.31</Text>
        </VStack>
        <VStack w="100%" spacing="2px">
          <Text color="text.3" fontSize="s" fontWeight="bold" spacing="5px">Discount</Text>
          <Text color="text.2" fontSize="3xl" fontWeight="bold">9.31%</Text>
        </VStack>
        <VStack w="100%" spacing="2px">
          <Text color="text.3" fontSize="s" fontWeight="bold" spacing="5px">Discounted Price</Text>
          <Text color="text.2" fontSize="xl" fontWeight="bold">$3,091.11</Text>
        </VStack>
      </HStack>

      <Card shadow="down" borderRadius="2xl" h="100px" align="center" justify="center" spacing={0}>
        <Text color="text.3" fontSize="s" fontWeight="bold">Max you can buy</Text>
        <Text color="text.2" fontSize="3xl" fontWeight="bold">362.21 gCNV</Text>
      </Card>

      <HStack h="120px" divider={<Box w="1px" h="100%" bg="strokeReflection" />}>
        <VStack w="100%" spacing="2px">
          <Text color="text.3" fontSize="s" fontWeight="bold">Pending</Text>
          <Text color="text.2" fontSize="xl" fontWeight="bold">6.736 gCNV</Text>
        </VStack>
        <VStack w="100%" spacing="2px">
          <Text color="text.3" fontSize="s" fontWeight="bold">Time to Fully Vest</Text>
          <Text color="text.2" fontSize="xl" fontWeight="bold">4 days 6 hours</Text>
        </VStack>
        <VStack w="100%" spacing="2px">
          <Text color="text.3" fontSize="s" fontWeight="bold">Claimable</Text>
          <Text color="text.2" fontSize="xl" fontWeight="bold">51.221 gCNV</Text>
        </VStack>
      </HStack>

      <Card shadow="down" borderRadius="2xl" h="60px" align="center" justify="center" spacing={0}>
        <Text color="text.2" fontSize="3xl" fontWeight="bold">Nothing to redeem</Text>
      </Card>

    </Card>
  )
}

export default BondInfoCard
