import { Box, Button, Card, Collapse, Flex, Text, useDisclosure } from '@concave/ui'
import { BOND_ADDRESS } from 'contracts/Bond/BondingAddress'
import { formatDistanceStrict } from 'date-fns'
import {
  Get_Accrualbondv1_Last10_SoldQuery,
  useGet_Amm_Cnv_PriceQuery,
} from 'graphql/generated/graphql'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useEffect, useState } from 'react'
import BondSoldsModal from './BondSoldsModal'
import { getBondSpotPrice } from './BondState'

interface BoldSoldsCardProps {
  loading: boolean
  data: Get_Accrualbondv1_Last10_SoldQuery
  error: any
}

const BoldSoldsCard = (props: BoldSoldsCardProps) => {
  const netWorkId = useCurrentSupportedNetworkId()
  const { data, loading } = props
  const AMMData = useGet_Amm_Cnv_PriceQuery()
  const [solds, setSolds] = useState([])
  const [bondSpotPrice, setBondSpotPrice] = useState('0')
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (data) {
      setSolds(data.logAccrualBondsV1_BondSold)
    }
  }, [data])

  useEffect(() => {
    if (bondSpotPrice === '0')
      getBondSpotPrice(netWorkId, BOND_ADDRESS[netWorkId])
        .then(setBondSpotPrice)
        .catch((e) => {
          // console.log(e)
        })
  })

  const relatives = solds.map((value, index) => (
    <Text key={index} opacity={1 - (isOpen ? index / 10 : (index / 10) * 3)}>
      {formatDistanceStrict(value.timestamp * 1000, new Date().getTime()) + ' ago'}
    </Text>
  ))
  const purchases = solds.map((value, index) => (
    <Text key={index} opacity={1 - (isOpen ? index / 10 : (index / 10) * 3)}>
      {'+ ' + +parseFloat(value.output).toFixed(3) + ' CNV'}
    </Text>
  ))

  console.log(isOpen)

  return (
    // <Collapse startingHeight={'140px'} in={active}>
    <>
      <Flex height={'140px'} width="full" direction="column">
        <Flex width={'full'} flex={1}>
          <Flex flex={1} justify="center" align={'center'} direction="column">
            <Text textColor={'text.low'} fontSize={'14px'} fontWeight="700">
              Current Price:
            </Text>
            <Text fontWeight={'700'}>
              {'$34,23'}
              {/* ${AMMData?.data?.cnvData?.data?.last?.toFixed(3)} */}
            </Text>

            <Text textColor={'text.low'} fontSize={'14px'} fontWeight="700">
              Bond Price:
            </Text>
            <Text mr={3} ml={1} fontWeight={'700'}>
              ${parseFloat(bondSpotPrice).toFixed(5)}
            </Text>
          </Flex>
          <Box w="1px" mt={0} bg="stroke.primary" />
          <Flex
            flex={1}
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
            <Text>3 min ago</Text>
            <Text>3 hours ago</Text>
            <Text>3 days ago</Text>
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
              <Text>100 CNV</Text>
              <Text>120 CNV</Text>
              <Text>410 CNV</Text>
            </Flex>
          </Flex>
        </Flex>
        <Card
          height={'40px'}
          width="full"
          variant="secondary"
          rounded={'0px 0px 16px 16px'}
          justify="center"
          align={'center'}
          fontWeight="700"
          fontSize={'18px'}
        >
          <Text onClick={onOpen} cursor={'pointer'}>
            Show more
          </Text>
        </Card>
      </Flex>
      <BondSoldsModal isOpen={isOpen} onClose={onClose} data={data} />
    </>
    // </Collapse>
  )
}

export default BoldSoldsCard
