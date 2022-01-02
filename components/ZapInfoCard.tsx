import { Box, color, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { ChevronRightIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { Card } from './Card';
import colors from 'theme/colors';

function ZapInfoCard() {
    return (
        <Card w={484} variant="secondary" borderWidth={2} bgImage="/assets/cave.png">
            <Card variant="secondary" borderWidth={2} bgImage="/assets/cave.png">
                <Flex borderColor={colors.strokeReflection} borderBottomWidth={2} borderBottomRadius={9} w={478} h="100px" flexDir="column" alignItems="center" justifyContent="center">
                    <Text color="#5f7a99" fontSize="xs" fontWeight="bold">gCNV Price</Text>
                    <Text color="#d7e9ff" fontSize="2xl" fontWeight="bold">$3,214.21</Text>
                </Flex>

                <Flex w={478} h="100px" flexDir="row" alignItems="center" justifyContent="center">
                    <Box w='160px' h='100px' borderRightWidth={2} />
                    <Stack w='160px' h='100px' alignItems="center" justifyContent="center">
                        <HStack color="#5f7a99" fontSize="xs" fontWeight="bold" spacing="5px">
                            <QuestionOutlineIcon />
                            <Text>Contract Mechanics</Text>
                        </HStack>
                        <Text color="#d7e9ff" fontSize="2xl" fontWeight="bold">+1.23%</Text>
                    </Stack>
                    <Box w='160px' h='100px' borderLeftWidth={2} />
                </Flex>

                <Flex borderTopWidth={2} borderTopRadius={9} borderBottomWidth={2} borderBottomRadius={9} w={478} h="100px" flexDir="column" alignItems="center" justifyContent="center">
                    <Text color="#5f7a99" fontSize="xs" fontWeight="bold">CNV * Index</Text>
                    <Text color="#d7e9ff" fontSize="2xl" fontWeight="bold">$3,112.03</Text>
                </Flex>

                <Flex w={478} h="100px" flexDir="column" alignItems="center" justifyContent="center">
                    <Flex w={478} h="100px" flexDir="row" alignItems="center" justifyContent="center">
                        <Stack w='160px' h='100px' alignItems="center" justifyContent="center">
                            <Text color="#5f7a99" fontSize="xs" fontWeight="bold">CNV Price</Text>
                            <Text color="#d7e9ff" fontSize="base" fontWeight="bold">$2,231.88</Text>
                        </Stack>
                        <Stack w='160px' h='100px' alignItems="center" justifyContent="center">
                            <HStack color="#5f7a99" fontSize="xs" fontWeight="bold" spacing="5px">
                                <QuestionOutlineIcon />
                                <Text>Index</Text>
                            </HStack>
                            <Text color="#d7e9ff" fontSize="base" fontWeight="bold">1.00432</Text>
                        </Stack>
                        <Stack w='160px' h='100px' alignItems="center" justifyContent="center">
                            <HStack color="#5f7a99" fontSize="xs" fontWeight="bold" spacing="5px">
                                <QuestionOutlineIcon />
                                <Text>Execution Cost</Text>
                            </HStack>
                            <Text color="#d7e9ff" fontSize="base" fontWeight="bold">~214.12</Text>
                        </Stack>
                    </Flex>
                </Flex>

                <Flex borderTopWidth={2} borderTopRadius={9} w={478} h="100px" flexDir="column" alignItems="center" justifyContent="center">
                    <HStack color="#5f7a99" fontSize="xs" spacing="5px">
                        <QuestionOutlineIcon />
                        <Text>Contract Mechanics</Text>
                    </HStack>
                    <HStack fontSize="2xl" fontWeight="bold" spacing="3px">
                        <Text color="#d7e9ff">gCNV</Text>
                        <ChevronRightIcon color="#7f8ecf" />
                        <Text color="#d7e9ff">CNV</Text>
                        <ChevronRightIcon color="#7f8ecf" />
                        <Text color="#d7e9ff">Your Asset</Text>
                    </HStack>
                </Flex>
            </Card>
        </Card>
    )
}

export default ZapInfoCard
