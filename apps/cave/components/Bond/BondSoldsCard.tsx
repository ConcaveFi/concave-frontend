import { Box, Button, Collapse, Flex, Text } from '@concave/ui'
import { formatDistance, formatDistanceStrict } from 'date-fns'
import { Get_Accrualbondv1_Last10_SoldQuery } from 'graphql/generated/graphql'
import { useEffect, useState } from 'react'

interface BoldSoldsCardProps {
  active: boolean
  data: Get_Accrualbondv1_Last10_SoldQuery
}

const BoldSoldsCard = (props: BoldSoldsCardProps) => {
  const { data, active } = props
  const [solds, setSolds] = useState([])

  useEffect(() => {
    if (data) {
      setSolds(data.logAccrualBondsV1_BondSold)
    }
  }, [data])

  const relatives = solds.map((value, index) => (
    <Text key={index} opacity={1 - (active ? index / 10 : (index / 10) * 3)}>
      {formatDistanceStrict(value.timestamp * 1000, new Date().getTime()) + ' ago'}
    </Text>
  ))
  const purchases = solds.map((value, index) => (
    <Text key={index} opacity={1 - (active ? index / 10 : (index / 10) * 3)}>
      {'+ ' + +parseFloat(value.output).toFixed(3) + ' CNV'}
    </Text>
  ))
  return (
    <Collapse startingHeight={'100px'} in={active}>
      <Flex height={'250px'} width="full">
        <Flex flex={1.5} justify="start" align={'end'} direction="column" gap={1}>
          <Flex mt={6}>
            <Text textColor={'text.low'} fontSize={'14px'} fontWeight="700">
              Current Price:
            </Text>
            <Text mr={3} ml={1} fontWeight={'700'}>
              249,1$
            </Text>
          </Flex>

          <Flex>
            <Text textColor={'text.low'} fontSize={'14px'} fontWeight="700">
              Bond Price:
            </Text>
            <Text mr={3} ml={1} fontWeight={'700'}>
              249,1$
            </Text>
          </Flex>
        </Flex>

        <Box w="1px" mt={0} bg="stroke.primary" />
        <Flex
          flex={0.9}
          direction="column"
          align={'center'}
          fontWeight={500}
          textColor="text.accent"
          textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
          my={'6px'}
          fontSize="14px"
        >
          <Text fontSize="16px" textColor={'white'}>
            Timeline
          </Text>
          {relatives}
        </Flex>
        <Box w="1px" mt={0} bg="stroke.primary" />
        <Flex flex={1.3}>
          <Flex
            flex={0.9}
            direction="column"
            align={'center'}
            textColor="text.accent"
            textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
            my={'6px'}
            fontSize="14px"
            fontWeight={500}
          >
            <Text fontSize="16px" textColor={'white'}>
              Purchase
            </Text>
            {purchases}
          </Flex>
        </Flex>
      </Flex>
    </Collapse>
  )
}

export default BoldSoldsCard
