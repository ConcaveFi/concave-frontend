import { Box, Card, Text } from "@concave/ui"


function MarketplaceSearchCard(props) {



    return (
        <div>
<Card
          p={7}
          gap={2}
          variant="primary"
          h="945px"
          shadow="Block Up"
          w="640px"
        >
          <Box
            pos="relative"
            h="fit-content"
            overflowY={'auto'}
            maxHeight={'500px'}
            css={{
              '&::-webkit-scrollbar': {
                width: '1px',
              },
              '&::-webkit-scrollbar-track': {
                width: '1px',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '10px',
                background: 'white',
              },
            }}
          >
<Text> test </Text>

</Box>
        </Card>
        </div>
    )  
}

export default MarketplaceSearchCard