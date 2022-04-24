
import { Box, Card, Flex, Text } from "@concave/ui"
import SearchFilterCard from "./SearchFilterCard";
import NftPositionCard from "./NftPositionCard";


const MarketplaceSearchCard = () => {
  // const {v, g, t, data} = props;
  const filters = [{ title: "Redeem In", icon: "RedeemIcon" }, { title: "Price", icon: "PriceIcon" }, { title: "Discount", icon: "DiscountIcon" }, { title: "Stake Period", icon: "StakeIcon" }];

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
            filter="drop-shadow(0px 0px 27px #81b3ff4f)"
          >
            <Text fontSize="xs" color="text.low" fontWeight="medium">Search</Text>
          </Box>
          <Flex direction="row" gap={4} position="relative" mt={2} >
            {filters.map((e) => {
              return <SearchFilterCard title={e.title} icon={e.icon} />
            })}
          </Flex>
        </Box>
      </Flex>
      <Box
        // border={"1px solid red"}
        pos="relative"
        h="100%"
        overflowY={'auto'}
        maxHeight={'100%'}
        borderRadius="16px"
        px={"0.5rem"}
        py={"0.5rem"}
        css={{
          background: 'rgba(113, 113, 113, 0.01)'
        }}
        shadow='down'
      >
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
      </Box>
    </Card>
  )
}

export default MarketplaceSearchCard