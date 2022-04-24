import { GasIcon } from "@concave/icons"
import { Box, Card, Flex, HStack, Image, Text, VStack } from "@concave/ui"


function MarketplaceSearchCard(props) {



    return (

<Card
          
          p={3}
          gap={2}
          variant="primary"
          h="945px"
          shadow="down"
          w="640px"
        >
            <Flex justify="center">
          <Box
            pos="relative"
            h="fit-content"
            overflowY={'auto'}
            maxHeight={'500px'}

          >
                        <Box          
                        pos="relative"
                        w="380px"
                        h="30px"
                        shadow="down"
                        py={2}
                        borderRadius="2xl"
                        filter="drop-shadow(0px 0px 27px #81b3ff4f)">
                            
                        <Text fontSize="xs" color="text.low" fontWeight="medium">Search</Text>

              </Box>
                    <Flex direction="row" gap={4} position="relative" mt={2} >
                        <Box
                        pos="relative"
                        w="80px"
                        h="53px"
                        background="gray.400"
                        overflowY={'auto'}
                        maxHeight={'500px'}
                        borderRadius="16px"
                        css={{
                            background: 'rgba(113, 113, 113, 0.01)'}}
                            /* 1/Up (Small) */
                        shadow='down'    
                          
                        >
                                <GasIcon viewBox="0 0 16 16" mr={2} />
                        <Text fontSize="xs" color="text.low" fontWeight="medium">Stake Period</Text>
                        </Box>
                        <Box
                        pos="relative"
                        w="80px"
                        h="53px"
                        background="gray.400"
                        overflowY={'auto'}
                        maxHeight={'500px'}
                        borderRadius="16px"
                        css={{
                            background: 'rgba(113, 113, 113, 0.01)'}}
                            /* 1/Up (Small) */
                        shadow='down'    
                        >
                                <GasIcon viewBox="0 0 16 16" mr={2} />
                        <Text fontSize="xs" color="text.low" fontWeight="medium">Redeem In</Text>    
                        </Box>
                        <Box
                        pos="relative"
                        w="80px"
                        h="53px"
                        background="gray.400"
                        overflowY={'auto'}
                        maxHeight={'500px'}
                        borderRadius="16px"
                        css={{
                            background: 'rgba(113, 113, 113, 0.01)'}}
                            /* 1/Up (Small) */
                        shadow='down'    
                        >
                            <GasIcon viewBox="0 0 16 16" mr={2} />
                            <Text fontSize="xs" color="text.low" fontWeight="medium">Price</Text>
                        </Box>
                        <Box
                        pos="relative"
                        w="80px"
                        h="53px"
                        background="gray.400"
                        overflowY={'auto'}
                        maxHeight={'500px'}
                        borderRadius="16px"
                        css={{
                            background: 'rgba(113, 113, 113, 0.01)'}}
                            /* 1/Up (Small) */
                        shadow='down'    
                        >
                                <GasIcon viewBox="0 0 16 16" mr={2} />
                        <Text fontSize="xs" color="text.low" fontWeight="medium">Discount</Text>  
                        </Box>
                    </Flex>
   
-

</Box>
</Flex>

<Box
                        pos="relative"
                        w="610px"
                        h="812px"
                        overflowY={'auto'}
                        maxHeight={'500px'}
                        borderRadius="16px"
                        css={{
                            background: 'rgba(113, 113, 113, 0.01)'}}
                            /* 1/Up (Small) */
                        shadow='down' 
>

        <Box
                        pos="relative"
                        w="570px"
                        h="80px"
                        overflowY={'auto'}
                        maxHeight={'500px'}
                        borderRadius="16px"
                        css={{
                            background: 'rgba(113, 113, 113, 0.01)'}}
                            /* 1/Up (Small) */
                        shadow='up' >
            <Flex direction="row" gap={6} justify="center" mt={2}>          
            <Box
                 pos="relative"
                w="177px"
                h="68px"
                overflowY={'auto'}
                maxHeight={'500px'}
                borderRadius="16px"
                css={{
                background: 'rgba(113, 113, 113, 0.01)'}}
                /* 1/Up (Small) */
                shadow='down' >
                    <Text fontSize="xs" color="text.low" fontWeight="medium">
                    Stake Period
                    </Text>
                    <Text fontSize="s" color="white" fontWeight="bold">
                    6 Month
                    </Text>
                    {/* Stake Period Position Logo here */}


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
            </Flex>
        </Box>
        

</Box>

        </Card>

    )  
}

export default MarketplaceSearchCard