import { Box, Flex, HStack, Image, Text, VStack } from "@concave/ui"

const NftPositionCard = () => {
    console.log("ok")
    return (
        <Box
            // border={"1px solid green"}

            pos="relative"
            // w="570px"
            h="80px"
            overflowY={'auto'}
            maxHeight={'500px'}
            borderRadius="16px"
            css={{
                background: 'rgba(113, 113, 113, 0.01)'
            }}
            shadow='up' >

            <Flex direction="row" gap={4} justify="center" mt={2}>
                <Box
                    pos="relative"
                    // border={"1px solid green"}
                    w="202px"
                    h="62px"
                    overflowY={'auto'}
                    // maxHeight={'500px'}
                    borderRadius="16px"
                    css={{
                        background: 'rgba(113, 113, 113, 0.01)'
                    }}
                    /* 1/Up (Small) */
                    shadow='down' >
                    <HStack>
                        <VStack w={"55%"} pl={2}>
                            < Text fontSize="xs" color="text.low" fontWeight="medium">
                                Stake Period
                            </Text>
                            <Text fontSize="s" color="white" fontWeight="bold">
                                6 Month
                            </Text>
                        </VStack>
                        <Box w={"45%"}>
                            <Image sizes="100%" src={'/assets/marketplace/6mposition.png'} alt='Dan Abramov' />
                        </Box>
                    </HStack>
                </Box>

                <VStack>
                    <Text color="text.low" fontSize="sm">
                        Redeem In:
                    </Text>
                    <Text fontSize="md" fontWeight="bold">
                        143 Days
                    </Text>
                </VStack>
                <VStack>
                    <Text color="text.low" fontSize="sm">
                        Price:
                    </Text>
                    <Text fontSize="md" fontWeight="bold">
                        605 CNV
                    </Text>
                </VStack>
                <VStack>
                    <Text color="text.low" fontSize="sm">
                        Discount:
                    </Text>
                    <Text fontSize="md" fontWeight="bold">
                        2.3%
                    </Text>
                </VStack>
                <Image mx="auto" src={`/assets/liquidstaking/modal-arrow-logo.svg`} alt="arrow down logo" />
            </Flex >
        </Box >
    )
}
export default NftPositionCard;