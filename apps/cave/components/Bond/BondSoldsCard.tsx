import { ExpandArrowIcon } from '@concave/icons'
import { Box, Card, Collapse, Flex, keyframes, Text } from '@concave/ui'
import { formatDistanceStrict } from 'date-fns'
import { commify } from 'ethers/lib/utils'
import { BigNumber } from 'ethers'
import {
  Get_Accrualbondv1_Last10_SoldQuery,
  useGet_Amm_Cnv_PriceQuery,
} from 'graphql/generated/graphql'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useEffect, useState } from 'react'
import { useCNVPrice } from 'hooks/useCNVPrice'
import { numberMask } from 'components/Treasury/dist/TreasuryRevenueCard'
interface BoldSoldsCardProps {
  data: Get_Accrualbondv1_Last10_SoldQuery
  error: any
  loading: boolean
}

const BoldSoldsCard = (props: BoldSoldsCardProps) => {
  const netWorkdId = useCurrentSupportedNetworkId()
  const { data, loading: isLoading, error } = props
  const AMMData = useCNVPrice()
  const [bondSpotPrice, setBondSpotPrice] = useState('0')
  const [solds, setSolds] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (data) {
      setSolds(data.logAccrualBondsV1_BondSold)
    }
  }, [data])

  const relatives = solds.map((value, index) => (
    <Text
      fontSize={{ base: '12px', md: 'sm' }}
      key={index}
      opacity={1 - (isOpen ? index / 10 : (index / 10) * 3)}
    >
      {formatDistanceStrict(value.timestamp * 1000, new Date().getTime()) + ' ago'}
    </Text>
  ))
  const purchases = solds.map((value, index) => (
    <Text
      fontSize={{ base: '12px', md: 'sm' }}
      key={index}
      opacity={1 - (isOpen ? index / 10 : (index / 10) * 3)}
    >
      {numberMask(value.output) + ' CNV'}
    </Text>
  ))
  const inputAmounts = solds.map((value, index) => (
    <Text
      fontSize={{ base: '12px', md: 'sm' }}
      key={index}
      opacity={1 - (isOpen ? index / 10 : (index / 10) * 3)}
    >
      {`${numberMask(value.inputAmount)} DAI`}
    </Text>
  ))

  return (
    <Flex direction="column">
      <Collapse
        in={isOpen}
        startingHeight={isLoading ? '50px' : solds.length == 0 ? '36px' : '100px'}
      >
        <Flex
          width={'full'}
          height="full"
          flex={1}
          textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
          textColor="text.accent"
          fontWeight={500}
          my={2}
        >
          <Flex flex={1.2} direction="column" align={'center'} fontSize="14px">
            <Text fontSize="16px" textColor={'white'} fontWeight="700">
              When
            </Text>
            {relatives}
          </Flex>
          <Box w="1px" my={-2} bg="stroke.primary" />
          <Flex flex={1.3} direction="column" align={'center'} fontSize="14px">
            <Text fontSize="16px" textColor={'white'} fontWeight="700">
              Amount
            </Text>
            {inputAmounts}
          </Flex>

          <Box w="1px" my={-2} bg="stroke.primary" />
          <Flex flex={1.3}>
            <Flex flex={0.9} direction="column" align={'center'} fontSize="14px">
              <Text fontSize="16px" textColor={'white'} fontWeight="700">
                Bonded
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
        <ExpandArrowIcon
          width={12}
          height={12}
          cursor="pointer"
          transition={'all 0.3s'}
          transform={isOpen ? 'rotate(180deg)' : ''}
          onClick={() => setIsOpen(!isOpen)}
        />
      </Card>
    </Flex>
  )
}
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
export default BoldSoldsCard
