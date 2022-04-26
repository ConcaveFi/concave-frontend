import {useState} from 'react'
import { Box, Card, Flex, Text, Button } from '@concave/ui'
import NewActivityCard from './MarketplaceTransactionCard'
import MarketplaceTransactionCard from './MarketplaceTransactionCard'


const MarketplaceActivityCard = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const filters = [{name: "All"},{name: "Listing"},{name: "Sale"} ]

  // TODO create types for data later on 
  const handleClick = (trigger: string) => {
    // fetch with the trigger filter and setData
    setLoading(true)
    setData([{
      type: trigger,
      date: 1650615494,
      event: "listed",
      length: "3 month",
      cnv: 700,
      link: "0xe15891caf71e104dc1f70a003ff60fc2160edc0a9a3040e98702874bc000a9b4"
    },{
      type: trigger,
      date: 1650615494,
      event: "sold",
      length: "6 month",
      cnv: 200,
      link: "0xe15891caf71e104dc1f70a003ff60fc2160edc0a9a3040e98702874bc000a9b4"
    },{
      type: trigger,
      date: 1650615494,
      event: "listed",
      length: "1 year",
      cnv: 340,
      link: "0xe15891caf71e104dc1f70a003ff60fc2160edc0a9a3040e98702874bc000a9b4"
    }])
    setLoading(false)
  }

  return (
    <>
      <Box
        p={7}
        gap={6}
        h="auto" // h="fit-content"
        shadow="Block Up"
        w="300px" // w= "100%"
        maxW="420px"
        backgroundBlendMode={'screen'}
        background={"/assets/textures/glass.jpg"} // glass png here
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
          {loading && <span>loading...</span>}
          {data && !error && data.map((e:any, k) => <MarketplaceTransactionCard key={k} filter={e} />)}
        </div>
      </Box>
    </>
  )
}

export default MarketplaceActivityCard
