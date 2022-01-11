import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import { Card } from 'components/Card'
import { Info } from './Info'

function SwapInfoCard() {
  return (
    <Card w={484} borderWidth={2} bgImage="/assets/cave.png">
      <Card shadow="down" borderRadius="2xl" h="100px" align="center" justify="center">
        <Info label="Your balance">0.314 gCNV</Info>
      </Card>

      <HStack h="150px" divider={<Box w="1px" h="100%" bg="strokeReflection" />}>
        <Info label="Projected APY" tooltip="how much number go up auto compounding the whole year">
          12321%
        </Info>
        <Info label={`gCNV Growth \n 30 days`}>$2,231.88</Info>
        <Info label={`gCNV Growth \n 24 hours`}>1.37%</Info>
      </HStack>

      <Card shadow="down" borderRadius="2xl" h="100px" align="center" justify="center" spacing={0}>
        <Info label="gCNV Intrinsic Value" tooltip="how much CNV each gCNV is worth">
          1gCNV = 1.000127 CNV
        </Info>
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

export default SwapInfoCard
