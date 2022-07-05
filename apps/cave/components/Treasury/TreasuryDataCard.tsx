import { Box, Card, Flex, FlexProps, gradientBorder, Text } from '@concave/ui'
import { LastBondSolds } from './Hooks/useTreasuryData'

type TreasuryDataCardProps = {
  firstRow: {
    marketCap: string
    cnvPrice: string
    valuePerCNV: string
  }
  secondRow: {
    treasuryRevenue: string
    treasuryValue: string
    cnvTotalSupply: string
  }
  lastBondSolds: LastBondSolds
}
export const TreasuryDataCard = ({ firstRow, secondRow, lastBondSolds }: TreasuryDataCardProps) => {
  const { cnvPrice, marketCap, valuePerCNV } = firstRow || {}
  const { cnvTotalSupply, treasuryRevenue, treasuryValue } = secondRow || {}
  return (
    <Card
      backdropFilter="blur(8px)"
      w={{ base: '340px', md: '510px', xl: '600px' }}
      h={{ base: '610px', md: '330px' }}
      justify={'space-between'}
    >
      <TreasuryDataContainer
        info1={['Market cap', marketCap]}
        info2={['CNV Price', cnvPrice]}
        info3={['Treasury value per CNV', valuePerCNV]}
      />
      <TreasuryDataContainer
        info1={['Treasury revenue', treasuryRevenue]}
        info2={['Treasury value', treasuryValue]}
        info3={['CNV total suply', cnvTotalSupply]}
      />
      <LastBondsContainer lastBondSolds={lastBondSolds} />
    </Card>
  )
}

type LastBondsContainerProps = { lastBondSolds: LastBondSolds }
const LastBondsContainer: React.FC<LastBondsContainerProps> = ({ lastBondSolds }) => (
  <Flex mt={'-4'} flex={0.75} align="center" w="full" direction={{ base: 'column', md: 'row' }}>
    {lastBondSolds?.map(({ timesTamp, inputAmount, outputAmount }, index) => (
      <LastBondInfo
        opacity={{ base: 1 - index / 3.2, md: 1 }}
        key={index}
        timestamp={timesTamp}
        outputAmount={outputAmount}
        inputAmount={inputAmount}
      />
    ))}
  </Flex>
)

type LastBondInfoProps = { timestamp: string; inputAmount: string; outputAmount: String }
const LastBondInfo: React.FC<LastBondInfoProps & FlexProps> = ({
  timestamp,
  inputAmount,
  outputAmount,
  ...props
}) => (
  <Flex
    flex={1}
    align="center"
    color={'text.low'}
    fontWeight="semibold"
    direction={{ base: 'row', md: 'column' }}
    justify="space-around"
    w="full"
    {...props}
  >
    <Text fontSize={'12px'}>{timestamp}</Text>
    <Text fontSize={'12px'}>{outputAmount + ' CNV bond'}</Text>
    <Text fontSize={'md'} color="text.accent">
      {'+ $' + inputAmount}
    </Text>
  </Flex>
)

type RevenueInfo = [string, string]
type TreasuryDataContainerProps = {
  info1: RevenueInfo
  info2: RevenueInfo
  info3: RevenueInfo
}
const TreasuryDataContainer: React.FC<TreasuryDataContainerProps> = ({ info1, info2, info3 }) => (
  <Flex
    w="full"
    height={{ base: '216px', md: '100px' }}
    apply={'background.glass'}
    sx={{ ...gradientBorder() }}
    rounded="2xl"
    direction={{ base: 'column', md: 'row' }}
  >
    <DataInfo info={info1[1] || 'loading...'} title={info1[0]} />
    <Border />
    <DataInfo info={info2[1] || 'loading...'} title={info2[0]} />
    <Border />
    <DataInfo info={info3[1] || 'loading...'} title={info3[0]} />
  </Flex>
)
const Border = () => (
  <Box w={{ base: 'full', md: '1px' }} h={{ base: '1px', md: 'full' }} bg={'stroke.primary'} />
)

type DataInfoProps = { title: string; info: string }
const DataInfo: React.FC<DataInfoProps> = ({ info, title }) => (
  <Flex
    flex={1}
    fontWeight={'bold'}
    direction={{ base: 'row', md: 'column' }}
    justify={{ base: 'space-between', md: 'center' }}
    textAlign={'center'}
    align="center"
    px={{ base: 3, md: 0 }}
  >
    <Text width={'full'} color="text.low" fontSize={'14px'}>
      {title}
    </Text>
    <Text width={'full'} fontSize={'16px'}>
      {info}
    </Text>
  </Flex>
)
