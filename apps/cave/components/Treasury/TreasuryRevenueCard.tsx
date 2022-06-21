import { Box, Card, Flex, Text } from '@concave/ui'
import { formatDistanceStrict } from 'date-fns'
import { commify } from 'ethers/lib/utils'
import { useGet_Accrualbondv1_Last10_SoldQuery } from 'graphql/generated/graphql'
import { useCNVPrice } from 'hooks/useCNVPrice'

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
    <Text fontSize={{ base: '13px', xl: 'md' }} color="text.low">
      {label}
    </Text>
    <Text fontSize={{ base: '15px', xl: 'lg' }} fontFamily="heading">
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
      w={{ base: '510px', xl: '620px' }}
      h="100px"
      direction="row"
      shadow="Glass Up Medium"
    >
      <Flex justify="center" flex={1}>
        <TreasuryInfoItem label={box1} amount={box1b} />
      </Flex>
      <Box w="1px" mx={0} my={-4} bg="stroke.primary" />
      <TreasuryInfoItem label={box2} amount={box2b} pl={3} pr={3} flex={0.8} />
      <Box w="1px" mx={0} my={-4} bg="stroke.primary" />
      <TreasuryInfoItem label={box3} amount={box3b} flex={1} />
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
  const cnvPrice = useCNVPrice()
  // get total Treasury
  const sumTotal = treasury.treasury.map((i: any) => i.total)
  const reducer = (acc: any, curr: any) => acc + curr
  const seed = 600000
  const total = sumTotal.reduce(reducer) + seed
  console.log(cnv.cnvData, 'what is cnv test')
  const { data, isLoading, isSuccess } = useGet_Accrualbondv1_Last10_SoldQuery()

  const lastsSolds = data?.logAccrualBondsV1_BondSold

  const relativeTimeline = lastsSolds.map(
    (value) => formatDistanceStrict(value.timestamp * 1000, new Date().getTime()) + ' ago',
  )

  const lastsAmounts = lastsSolds.map((value) => '+$' + numberMask(+value?.inputAmount))
  const lastsOutputamounts = lastsSolds.map((value) => '' + numberMask(+value?.output))

  return (
    <Card
      direction={'column'}
      w={{ base: '510px', xl: '620px' }}
      height="330px"
      bg={'#111e'}
      shadow={'0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 20px rgba(87, 124, 255, 0.3)'}
      textShadow="0px 0px 27px rgba(129, 179, 255, 0.41)"
    >
      <Flex direction={'row'} flex={1} alignItems="start" gap={5}>
        <Flex direction={'column'} gap={5}>
          <TreasuryInfo
            box1="Market Cap"
            box1b={'$' + numberMask(cnv.cnvData.data.marketCap)}
            box2="CNV Price"
            box2b={'$' + cnvPrice?.price?.toFixed(2) || 0}
            box3="Treasury Value per CNV"
            box3b={'$' + numberMask(total / cnv.cnvData.data.totalSupply)}
          />
          <TreasuryInfo
            box1="Treasury Revenue 24h"
            box1b="Coming Soon"
            box2="Treasury Value"
            box2b={'$' + numberMask(total)}
            box3="CNV Total Supply"
            box3b={'' + numberMask(cnv.cnvData.data.totalSupply)}
          />
          <BondInfo
            bondbox1={relativeTimeline[0]}
            bondbox1a={`${lastsOutputamounts[0]} CNV bond`}
            bondbox1b={lastsAmounts[0]}
            bondbox2={relativeTimeline[1]}
            bondbox2a={`${lastsOutputamounts[1]} CNV bond`}
            bondbox2b={lastsAmounts[1]}
            bondbox3={relativeTimeline[2]}
            bondbox3a={`${lastsOutputamounts[2]} CNV bond`}
            bondbox3b={lastsAmounts[2]}
          />
        </Flex>
      </Flex>
    </Card>
  )
}

export const numSplice = (s: string | Number, decimals?: number) => {
  const a = s.toString()
  const _decimals = decimals + 1 || 3
  return a.indexOf('.') > -1 ? a.slice(0, a.indexOf('.') + _decimals) : a
}

export const numberMask = (number: Number, decimals?: number) => {
  if (number === 0) {
    return `0`
  }
  if (number < 0.01) {
    return `<.01`
  }
  const _decimals = decimals || 2
  return commify(numSplice(number, _decimals))
}
