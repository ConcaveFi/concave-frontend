import { Box, Text, VStack, HStack } from "@concave/ui"
import { GasIcon, RedeemIcon, LinesIcon, DiscountIcon, PriceIcon, StakeIcon } from "@concave/icons"


const SearchFilterCard = (props: any) => {
    const { title, icon } = props; // dont forget to import them here too :) <3
    return (
        <Box
            pos="relative"
            // w="80px"
            // h="53px"
            background="gray.400"
            overflowY={'auto'}
            maxHeight={'500px'}
            borderRadius="16px"
            css={{
                background: 'rgba(113, 113, 113, 0.01)'
            }}
            shadow='up'
        >
            <VStack>
                <HStack>
                    <>
                        {icon === "GasIcon" && <GasIcon viewBox="0 0 16 16" mr={2} />}
                        {icon === "RedeemIcon" && <RedeemIcon viewBox="0 0 16 16" mr={2} />}
                        {icon === "DiscountIcon" && <DiscountIcon viewBox="0 0 16 16" mr={2} />}
                        {icon === "PriceIcon" && <PriceIcon viewBox="0 0 16 16" mr={2} />}
                        {icon === "StakeIcon" && <StakeIcon viewBox="0 0 16 16" mr={2} />}
                    </>
                    <LinesIcon viewBox="0 0 16 16" mr={2} />
                </HStack>
                <Text fontSize="xs" color="text.low" fontWeight="medium">{title}</Text>
            </VStack >
        </Box >
    )
}
export default SearchFilterCard;