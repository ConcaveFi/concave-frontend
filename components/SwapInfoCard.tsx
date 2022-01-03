import { Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { Card } from './Card';

function SwapInfoCard() {
    return (
        <Card w={484} variant="secondary" borderWidth={2} bgImage="/assets/cave.png">
            <Card variant="secondary" borderWidth={2} bgImage="/assets/cave.png">
                <Flex borderBottomWidth={2} borderBottomRadius={9} w={478} h="100px" flexDir="column" alignItems="center" justifyContent="center">
                    <Text color="#5f7a99" fontSize="xs" fontWeight="bold">Your balance</Text>
                    <Text color="#d7e9ff" fontSize="2xl" fontWeight="bold">0.314 gCNV</Text>
                </Flex>

                <Flex w={478} h="150px" flexDir="row" alignItems="center" justifyContent="center">
                    <Stack borderRightWidth={2} w='160px' h='150px' alignItems="center" justifyContent="center" spacing="3px">
                        <HStack color="#5f7a99" fontSize="xs" fontWeight="bold" spacing="5px">
                            <QuestionOutlineIcon />
                            <Text>Projected APY</Text>
                        </HStack>
                        <Text color="#d7e9ff" fontSize="2xl" fontWeight="bold">12321%</Text>
                    </Stack>
                    <Stack w='160px' h='150px' alignItems="center" justifyContent="center" spacing="3px">
                        <Stack alignItems="center" justifyContent="center" spacing="-2px">
                            <Text color="#5f7a99" fontSize="xs" fontWeight="bold">gCNV Growth</Text>
                            <Text color="#5f7a99" fontSize="xs" fontWeight="bold">30 days</Text>
                        </Stack>

                        <Text color="#d7e9ff" fontSize="2xl" fontWeight="bold">$2,231.88</Text>
                    </Stack>
                    <Stack borderLeftWidth={2} w='160px' h='150px' alignItems="center" justifyContent="center" spacing="3px">
                        <Stack alignItems="center" justifyContent="center" spacing="-2px">
                            <Text color="#5f7a99" fontSize="xs" fontWeight="bold">gCNV Growth</Text>
                            <Text color="#5f7a99" fontSize="xs" fontWeight="bold">24 hours</Text>
                        </Stack>
                        <Text color="#d7e9ff" fontSize="2xl" fontWeight="bold">1.37%</Text>
                    </Stack>
                </Flex>

                <Flex borderTopWidth={2} borderTopRadius={9} borderBottomWidth={2} borderBottomRadius={9} w={478} h="100px" flexDir="column" alignItems="center" justifyContent="center">
                    <HStack color="#5f7a99" fontSize="xs" fontWeight="bold" spacing="5px">
                        <QuestionOutlineIcon />
                        <Text>gCNV Intrinsic Value</Text>
                    </HStack>
                    <Text color="#d7e9ff" fontSize="2xl" fontWeight="bold">1gCNV = 1.000127 CNV</Text>
                </Flex>

                <Flex w={478} h="150px" flexDir="row" alignItems="center" justifyContent="center">
                    <Stack borderRightWidth={2} w='160px' h='150px' alignItems="center" justifyContent="center" spacing="3px">
                        <Text color="#5f7a99" fontSize="xs" fontWeight="bold">Time</Text>
                        <Text color="#79b2f4" fontSize="sm" fontWeight="bold">Just now</Text>
                        <Text color="#6185B0" fontSize="sm" fontWeight="bold">3 mins ago</Text>
                        <Text color="#475477" fontSize="sm" fontWeight="bold">3 days ago</Text>
                    </Stack>
                    <Stack borderRightWidth={2} w='160px' h='150px' alignItems="center" justifyContent="center" spacing="3px">
                        <Text color="#5f7a99" fontSize="xs" fontWeight="bold">gCNV Growth</Text>
                        <Text color="#79b2f4" fontSize="sm" fontWeight="bold">+0.00013</Text>
                        <Text color="#6185B0" fontSize="sm" fontWeight="bold">+0.00723</Text>
                        <Text color="#475477" fontSize="sm" fontWeight="bold">+0.00013</Text>
                    </Stack>
                    <Stack borderRightWidth={2} w='160px' h='150px' alignItems="center" justifyContent="center" spacing="3px">
                        <HStack color="#5f7a99" fontSize="xs" fontWeight="bold" spacing="5px">
                            <QuestionOutlineIcon />
                            <Text>Treasury income</Text>
                        </HStack>
                        <Text color="#79b2f4" fontSize="sm" fontWeight="bold">+ 12 324 $</Text>
                        <Text color="#6185B0" fontSize="sm" fontWeight="bold">+ 122 975 $</Text>
                        <Text color="#475477" fontSize="sm" fontWeight="bold">+ 521 $</Text>
                    </Stack>
                </Flex>
            </Card>
        </Card>
    )
}

export default SwapInfoCard
