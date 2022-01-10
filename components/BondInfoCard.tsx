import { Box, Center, Flex, Grid, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { ChevronRightIcon, QuestionOutlineIcon } from '@chakra-ui/icons'
import { Card } from './Card'

function BondInfoCard() {
  return (
    <Card w={484} variant="secondary" borderWidth={2} bgImage="/assets/cave.png">
      <Card shadow="down" borderRadius="2xl" h="100px" align="center" justify="center" spacing={0}>
        <Text color="text.3" fontSize="xs" fontWeight="bold">
          Your balance
        </Text>
        <Text color="text.2" fontSize="2xl" fontWeight="bold">
          0.314 gCNV
        </Text>
      </Card>

      <HStack h="150px" divider={<Box w="1px" h="100%" bg="strokeReflection" />}>
        <VStack w="100%">
          <HStack color="text.3" fontSize="xs" fontWeight="bold" spacing="5px">
            <QuestionOutlineIcon />
            <Text>Projected APY</Text>
          </HStack>
          <Text color="text.2" fontSize="2xl" fontWeight="bold">
            12321%
          </Text>
        </VStack>
        <VStack w="100%">
          <Stack alignItems="center" justifyContent="center" spacing="-2px">
            <Text color="text.3" fontSize="xs" fontWeight="bold">
              gCNV Growth
            </Text>
            <Text color="text.3" fontSize="xs" fontWeight="bold">
              30 days
            </Text>
          </Stack>

          <Text color="text.2" fontSize="2xl" fontWeight="bold">
            $2,231.88
          </Text>
        </VStack>
        <VStack w="100%">
          <Stack alignItems="center" justifyContent="center" spacing="-2px">
            <Text color="text.3" fontSize="xs" fontWeight="bold">
              gCNV Growth
            </Text>
            <Text color="text.3" fontSize="xs" fontWeight="bold">
              24 hours
            </Text>
          </Stack>
          <Text color="text.2" fontSize="2xl" fontWeight="bold">
            1.37%
          </Text>
        </VStack>
      </HStack>

      <Card shadow="down" borderRadius="2xl" h="100px" align="center" justify="center" spacing={0}>
        <HStack color="text.3" fontSize="xs" fontWeight="bold" spacing="5px">
          <QuestionOutlineIcon />
          <Text>gCNV Intrinsic Value</Text>
        </HStack>
        <Text color="text.2" fontSize="2xl" fontWeight="bold">
          1gCNV = 1.000127 CNV
        </Text>
      </Card>

      <HStack h="150px" divider={<Box w="1px" h="100%" bg="strokeReflection" />}>
        <VStack w="100%">
          <Text color="text.3" fontSize="xs" fontWeight="bold">
            Time
          </Text>
          <Text color="#79b2f4" fontSize="sm" fontWeight="bold">
            Just now
          </Text>
          <Text color="#6185B0" fontSize="sm" fontWeight="bold">
            3 mins ago
          </Text>
          <Text color="#475477" fontSize="sm" fontWeight="bold">
            3 days ago
          </Text>
        </VStack>
        <VStack w="100%">
          <Text color="text.3" fontSize="xs" fontWeight="bold">
            gCNV Growth
          </Text>
          <Text color="#79b2f4" fontSize="sm" fontWeight="bold">
            +0.00013
          </Text>
          <Text color="#6185B0" fontSize="sm" fontWeight="bold">
            +0.00723
          </Text>
          <Text color="#475477" fontSize="sm" fontWeight="bold">
            +0.00013
          </Text>
        </VStack>
        <VStack w="100%">
          <HStack color="text.3" fontSize="xs" fontWeight="bold" spacing="5px">
            <QuestionOutlineIcon />
            <Text>Treasury income</Text>
          </HStack>
          <Text color="#79b2f4" fontSize="sm" fontWeight="bold">
            + 12 324 $
          </Text>
          <Text color="#6185B0" fontSize="sm" fontWeight="bold">
            + 122 975 $
          </Text>
          <Text color="#475477" fontSize="sm" fontWeight="bold">
            + 521 $
          </Text>
        </VStack>
      </HStack>
    </Card>
  )
}

export default BondInfoCard
