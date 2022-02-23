import { Box, Center, Grid, HStack, Text, VStack, Card } from '@concave/ui'
import { ChevronRightIcon, QuestionOutlineIcon } from '@concave/icons'
import { InfoCard } from './Info'

function ZapInfoCard() {
  return (
    <InfoCard>
      <Card shadow="down" borderRadius="2xl" h="100px" align="center" justify="center" spacing={0}>
        <Text color="text.low" fontSize="xs" fontWeight="bold">
          gCNV Price
        </Text>
        <Text color="text.medium" fontSize="2xl" fontWeight="bold">
          $3,214.21
        </Text>
      </Card>

      <Center>
        <Box w="1px" h="100%" bg="strokeReflection" />
        <VStack w="160px" h="100px" spacing={0} justify="center">
          <HStack color="text.low" fontSize="xs" fontWeight="bold" spacing="5px">
            <QuestionOutlineIcon />
            <Text>Contract Mechanics</Text>
          </HStack>
          <Text color="text.medium" fontSize="2xl" fontWeight="bold">
            +1.23%
          </Text>
        </VStack>
        <Box w="1px" h="100%" bg="strokeReflection" />
      </Center>

      <Card shadow="down" borderRadius="2xl" h="100px" align="center" justify="center" spacing={0}>
        <Text color="text.low" fontSize="xs" fontWeight="bold">
          CNV * Index
        </Text>
        <Text color="text.medium" fontSize="2xl" fontWeight="bold">
          $3,112.03
        </Text>
      </Card>

      <Grid h="100px" alignItems="center" templateColumns="repeat(3, 1fr)">
        <VStack spacing={0}>
          <Text color="text.low" fontSize="xs" fontWeight="bold">
            CNV Price
          </Text>
          <Text color="text.medium" fontSize="base" fontWeight="bold">
            $2,231.88
          </Text>
        </VStack>
        <VStack spacing={0}>
          <HStack color="text.low" fontSize="xs" fontWeight="bold" spacing="5px">
            <QuestionOutlineIcon />
            <Text>Index</Text>
          </HStack>
          <Text color="text.medium" fontSize="base" fontWeight="bold">
            1.00432
          </Text>
        </VStack>
        <VStack spacing={0}>
          <HStack color="text.low" fontSize="xs" fontWeight="bold" spacing="5px">
            <QuestionOutlineIcon />
            <Text>Execution Cost</Text>
          </HStack>
          <Text color="text.medium" fontSize="base" fontWeight="bold">
            ~214.12
          </Text>
        </VStack>
      </Grid>

      <Card shadow="down" borderRadius="2xl" h="100px" align="center" justify="center" spacing={0}>
        <HStack color="text.low" fontSize="xs" spacing="5px">
          <QuestionOutlineIcon />
          <Text fontWeight="bold">Contract Mechanics</Text>
        </HStack>
        <HStack fontSize="2xl" fontWeight="bold" spacing="3px">
          <Text color="text.medium">gCNV</Text>
          <ChevronRightIcon color="#7f8ecf" />
          <Text color="text.medium">CNV</Text>
          <ChevronRightIcon color="#7f8ecf" />
          <Text color="text.medium">Your Asset</Text>
        </HStack>
      </Card>
    </InfoCard>
  )
}

export default ZapInfoCard
