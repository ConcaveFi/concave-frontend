import {useState} from 'react'
import { Box, Card, Flex, Text, Button } from '@concave/ui'
import NewActivityCard from './MarketplaceTransactionCard'
import MarketplaceTransactionCard from './MarketplaceTransactionCard'


const MarketplaceActivityCard = () => {
  const [data, setData] = useState(null)
  const filters = [{name: "all"},{name: "Listing"},{name: "Sale"} ]

  // TODO create types for data later on 
  const handleClick = (trigger: string) => {
    // fetch with the trigger filter and setData
    setData([{
      type: trigger,
      date: 1650615494,
      event: "listed",
      cnv: 700,
      link: `https://etherscan.com/`
    },{
      type: trigger,
      date: 1650615494,
      event: "sold",
      cnv: 200,
      link: `https://etherscan.com/`
    },{
      type: trigger,
      date: 1650615494,
      event: "listed",
      cnv: 340,
      link: `https://etherscan.com/`
    }])
  }

  return (
    <>
      <Box
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
          {filters.map((e,k) => {
            return (
          <Box key={k} mx="auto" py={5} w="90px" h="37px" shadow="down" borderRadius="16px">
            <Button onClick={()=> handleClick(e.name)}  fontSize="s" color="white" fontWeight="bold">
              {e.name}
            </Button>
          </Box>
            )
          })}
        </Flex>
        {/* render Transaction cards from click value */}
        <div>
          <span>list</span>
          {data && data.map((e:any, k) => <MarketplaceTransactionCard key={k} filter={e} />)}
        </div>
      </Box>
    </>
  )
}

export default MarketplaceActivityCard
