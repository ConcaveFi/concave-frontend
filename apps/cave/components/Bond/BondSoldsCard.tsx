import { SpinIcon, SpinnerIcon } from '@concave/icons'
import {
  Box,
  Button,
  ButtonSpinner,
  Card,
  Collapse,
  Flex,
  keyframes,
  Spinner,
  Text,
  useDisclosure,
} from '@concave/ui'
import { BOND_ADDRESS } from 'contracts/Bond/BondingAddress'
import { formatDistanceStrict } from 'date-fns'
import {
  Get_Accrualbondv1_Last10_SoldQuery,
  useGet_Amm_Cnv_PriceQuery,
} from 'graphql/generated/graphql'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useEffect, useState } from 'react'
import { getBondSpotPrice } from './BondState'

interface BoldSoldsCardProps {
  data: Get_Accrualbondv1_Last10_SoldQuery
  error: any
  loading: boolean
}

const BoldSoldsCard = (props: BoldSoldsCardProps) => {
  const netWorkdId = useCurrentSupportedNetworkId()
  const { data, loading: isLoading, error } = props
  const AMMData = useGet_Amm_Cnv_PriceQuery()
  const [bondSpotPrice, setBondSpotPrice] = useState('0')
  const [solds, setSolds] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (data) {
      setSolds(data.logAccrualbondsv1_BondSold)
    }
  }, [data])

  useEffect(() => {
    if (bondSpotPrice === '0')
      getBondSpotPrice(netWorkdId, BOND_ADDRESS[netWorkdId])
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
  const inputAmounts = solds.map((value, index) => (
    <Text key={index} opacity={1 - (isOpen ? index / 10 : (index / 10) * 3)}>
      {+parseFloat(value.inputaAmount).toFixed(3) + ' CNV'}
    </Text>
  ))

  console.log()

  return (
    <Flex width="full" direction="column">
      <Collapse
        in={isOpen}
        startingHeight={isLoading ? '50px' : solds.length == 0 ? '36px' : '100px'}
      >
        <Flex width={'full'} height="full" flex={1}>
          <Flex
            flex={1.3}
            direction="column"
            align={'center'}
            fontWeight={500}
            textColor="text.accent"
            textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
            my={'6px'}
            fontSize="14px"
          >
            <Text fontSize="16px" textColor={'white'}>
              Amount
            </Text>
            {inputAmounts}
          </Flex>
          <Box w="1px" mt={0} bg="stroke.primary" />
          <Flex
            flex={0.8}
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
      <Card
        height={'40px'}
        width="full"
        variant="secondary"
        rounded={'0px'}
        justify="center"
        align={'center'}
        fontWeight="700"
        fontSize={'18px'}
      >
        {!isLoading ? (
          isOpen ? (
            <Text onClick={onClose} cursor={'pointer'}>
              Show less
            </Text>
          ) : (
            <Text onClick={onOpen} cursor={'pointer'}>
              Show more
            </Text>
          )
        ) : (
          <Flex gap={4}>
            <Text>Loading transactions</Text>
            <SpinIcon
              width={'25px'}
              height="25px"
              css={{ animation: `${spin} 2s linear infinite` }}
            />
          </Flex>
        )}
      </Card>
    </Flex>
  )
}
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
export default BoldSoldsCard
