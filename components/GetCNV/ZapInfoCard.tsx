import { Box, Center, Flex, Grid, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { ChevronRightIcon, QuestionOutlineIcon } from '@chakra-ui/icons'
import { Card } from 'components/Card'

function ZapInfoCard() {
  return (
    <Card w="100%" maxW={484} borderWidth={2} bgImage="/assets/cave.png">
      <Card shadow="down" borderRadius="2xl" h="100px" align="center" justify="center" spacing={0}>
        <Text color="text.3" fontSize="xs" fontWeight="bold">
          gCNV Price
        </Text>
        <Text color="text.2" fontSize="2xl" fontWeight="bold">
          $3,214.21
        </Text>
      </Card>

      <Center>
        <Box w="1px" h="100%" bg="strokeReflection" />
        <VStack w="160px" h="100px" spacing={0} justify="center">
          <HStack color="text.3" fontSize="xs" fontWeight="bold" spacing="5px">
            <QuestionOutlineIcon />
            <Text>Contract Mechanics</Text>
          </HStack>
          <Text color="text.2" fontSize="2xl" fontWeight="bold">
            +1.23%
          </Text>
        </VStack>
        <Box w="1px" h="100%" bg="strokeReflection" />
      </Center>

      <Card shadow="down" borderRadius="2xl" h="100px" align="center" justify="center" spacing={0}>
        <Text color="text.3" fontSize="xs" fontWeight="bold">
          CNV * Index
        </Text>
        <Text color="text.2" fontSize="2xl" fontWeight="bold">
          $3,112.03
        </Text>
      </Card>

      <Grid h="100px" alignItems="center" templateColumns="repeat(3, 1fr)">
        <VStack spacing={0}>
          <Text color="text.3" fontSize="xs" fontWeight="bold">
            CNV Price
          </Text>
          <Text color="text.2" fontSize="base" fontWeight="bold">
            $2,231.88
          </Text>
        </VStack>
        <VStack spacing={0}>
          <HStack color="text.3" fontSize="xs" fontWeight="bold" spacing="5px">
            <QuestionOutlineIcon />
            <Text>Index</Text>
          </HStack>
          <Text color="text.2" fontSize="base" fontWeight="bold">
            1.00432
          </Text>
        </VStack>
        <VStack spacing={0}>
          <HStack color="text.3" fontSize="xs" fontWeight="bold" spacing="5px">
            <QuestionOutlineIcon />
            <Text>Execution Cost</Text>
          </HStack>
          <Text color="text.2" fontSize="base" fontWeight="bold">
            ~214.12
          </Text>
        </VStack>
      </Grid>

      <Card shadow="down" borderRadius="2xl" h="100px" align="center" justify="center" spacing={0}>
        <HStack color="text.3" fontSize="xs" spacing="5px">
          <QuestionOutlineIcon />
          <Text fontWeight="bold">Contract Mechanics</Text>
        </HStack>
        <HStack fontSize="2xl" fontWeight="bold" spacing="3px">
          <Text color="text.2">gCNV</Text>
          <ChevronRightIcon color="#7f8ecf" />
          <Text color="text.2">CNV</Text>
          <ChevronRightIcon color="#7f8ecf" />
          <Text color="text.2">Your Asset</Text>
        </HStack>
      </Card>
    </Card>
  )
}

export default ZapInfoCard
