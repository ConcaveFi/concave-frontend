import { Box, Button, Card, Flex, Image, Text } from '@concave/ui'
import { InfoItem } from 'components/Bond/BondInfo'
import { formatDistanceStrict } from 'date-fns'
import { useGet_Accrualbondv1_Last10_SoldQuery } from 'graphql/generated/graphql'
import useAddTokenToWallet from 'hooks/useAddTokenToWallet'
import { useEffect, useState } from 'react'

interface TreasuryRevenueCardProps {}
export const TreasuryInfoItem = ({ label, amount, ...props }) => (
  <Flex
    direction="column"
    py={0.5}
    gap="5px"
    justify="center"
    fontWeight="bold"
    textAlign="center"
    {...props}
  >
    <Text fontSize="m" color="text.low">
      {label}
    </Text>
    <Text fontSize="large" fontFamily="heading">
      {amount}
    </Text>
  </Flex>
)

export const BondInfoItem = ({ timestamp, cnvamount, daiamount, ...props }) => (
  <Flex
    direction="column"
    py={0.5}
    justify="center"
    fontWeight="bold"
    textAlign="center"
    {...props}
  >
    <Text fontSize="xs" color="text.low">
      {timestamp}
    </Text>
    <Text fontSize="xs" color="text.low">
      {cnvamount}
    </Text>
    <Text opacity={0.6} fontSize={'16px'} textColor="text.accent" fontWeight={700}>
      {daiamount}
    </Text>
  </Flex>
)

export const TreasuryInfo = ({ box1, box2, box3, box1b, box2b, box3b }) => {
  return (
    <Card
      variant="secondary"
      bg="none"
      py={3}
      w="599px"
      h="100px"
      direction="row"
      shadow="Glass Up Medium"
    >
      <Flex justify="center" flexBasis="40%">
        <TreasuryInfoItem label={box1} amount={box1b} />
      </Flex>
      <Box w="1px" mx={0} my={-4} bg="stroke.primary" />
      <TreasuryInfoItem label={box2} amount={box2b} flexGrow={1} pl={3} pr={3} flexBasis="25%" />
      <Box w="1px" mx={0} my={-4} bg="stroke.primary" />
      <TreasuryInfoItem label={box3} amount={box3b} flexBasis="35%" />
    </Card>
  )
}

export const BondInfo = ({
  bondbox1,
  bondbox1a,
  bondbox1b,
  bondbox2,
  bondbox2a,
  bondbox2b,
  bondbox3,
  bondbox3a,
  bondbox3b,
}) => {
  return (
    <Box>
      <Flex direction="row">
        <Flex justify="center" flexBasis="40%">
          <BondInfoItem timestamp={bondbox1} cnvamount={bondbox1a} daiamount={bondbox1b} />
        </Flex>

        <BondInfoItem
          timestamp={bondbox2}
          cnvamount={bondbox2a}
          daiamount={bondbox2b}
          flexGrow={1}
          pl={3}
          pr={3}
          flexBasis="25%"
        />

        <BondInfoItem
          timestamp={bondbox3}
          cnvamount={bondbox3a}
          daiamount={bondbox3b}
          flexBasis="35%"
        />
      </Flex>
    </Box>
  )
}

export default function TreasuryRevenueCard(props) {
  const { cnv, treasury } = props

  // get total Treasury
  const sumTotal = treasury.treasury.map((i: any) => i.total)
  const reducer = (acc: any, curr: any) => acc + curr
  const seed = 600000
  const total = sumTotal.reduce(reducer) + seed

  const { data, isLoading, isSuccess } = useGet_Accrualbondv1_Last10_SoldQuery()

  const [lastsSolds, setLastsSolds] = useState([])

  useEffect(() => {
    if (data) {
      setLastsSolds(
        data.logAccrualBondsV1_BondSold.filter((value, index) => {
          if (index < 3) return 1
        }),
      )
    }
  })

  const relativeTimeline = lastsSolds
    ? lastsSolds.map((value) => formatDistanceStrict(value.timestamp * 1000, new Date().getTime()))
    : ['loading', 'loading', 'loading']

  return (
    <Card
      direction={'column'}
      width={'600px'}
      height="330px"
      bg={'#111e'}
      shadow={'0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 20px rgba(87, 124, 255, 0.3)'}
      textShadow="0px 0px 27px rgba(129, 179, 255, 0.41)"
    >
      <Flex direction={'row'} flex={1} alignItems="start" gap={5}>
        <Flex direction={'column'} gap={5}>
          <TreasuryInfo
            box1="Market Cap"
            box1b={'$' + cnv.cnvData.data.marketCap.toFixed(2)}
            box2="CNV Price"
            box2b={'$' + cnv.cnvData.data.last.toFixed(2)}
            box3="Treasury value per CNV"
            box3b={'$' + (total / cnv.cnvData.data.last).toFixed(2)}
          />
          <TreasuryInfo
            box1="Treasury Revenue 24h"
            box1b="+$0"
            box2="Treasury Value"
            box2b={'$' + total.toFixed(2)}
            box3="Concave total Supply"
            box3b={'$' + cnv.cnvData.data.totalSupply.toFixed(2)}
          />
          <BondInfo
            bondbox1={relativeTimeline[0]}
            bondbox1a="1,000 CNV bond"
            bondbox1b="+$32,832"
            bondbox2={relativeTimeline[1]}
            bondbox2a="8,050 CNV bond"
            bondbox2b="+$264,300"
            bondbox3={relativeTimeline[2]}
            bondbox3a="3,000 CNV bond"
            bondbox3b="+$98,496"
          />
        </Flex>
      </Flex>
    </Card>
  )
}
