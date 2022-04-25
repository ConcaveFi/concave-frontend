import {useState} from 'react'
import { Box, Card, Flex, Text, Button } from '@concave/ui'
import NewActivityCard from './MarketplaceTransactionCard'
import MarketplaceTransactionCard from './MarketplaceTransactionCard'


const MarketplaceActivityCard = (props) => {

const [data, setData] = useState("")

  const handleClick = () => {
    setData("test")
    console.log("tx: ", data)
  }

  return (
    <div>
      <Card
        p={7}
        gap={6}
        h="642px" // h="fit-content"
        shadow="Block Up"
        w="300px" // w= "100%"
        maxW="420px"
        backgroundBlendMode={'screen'}
        background={''} // glass png here
        backdropFilter="blur(15px)"
      >
        <Flex direction="row" gap={6} justify="center" mt={2}>
          <Box mx="auto" py={5} w="90px" h="37px" shadow="down" borderRadius="16px">
            <Button onClick={handleClick}  fontSize="s" color="white" fontWeight="bold">
              All
            </Button>
          </Box>
          <Box mx="auto" py={5} w="90px" h="37px" shadow="down" borderRadius="16px">
            <Button onClick={handleClick}  fontSize="s" color="white" fontWeight="bold">
              Listing
            </Button>
          </Box>
          <Box mx="auto" py={5} w="90px" h="37px" shadow="down" borderRadius="16px">
            <Button onClick={handleClick} fontSize="s" color="white" fontWeight="bold">
              Sale
            </Button>
          </Box>
        </Flex>
      </Card>
       {/* render Transaction cards from click value */}

{data && <MarketplaceTransactionCard />}

    </div>
  )
}

export default MarketplaceActivityCard
