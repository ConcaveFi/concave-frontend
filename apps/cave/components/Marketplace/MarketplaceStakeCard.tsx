import { Box, Card, Text } from "@concave/ui"


function MarketplaceStakeCard(props) {
    const vaprText = props.icon === '12m' ? 'Non-Dilutive vAPR' : 'vAPR'


    return (
        <div>
<Card
          p={7}
          gap={2}
        // variant=""
          shadow="Block Up"
          w="300px"
          h="283px"
        >

<Text> test </Text>

        </Card>
        </div>
    )  
}

export default MarketplaceStakeCard