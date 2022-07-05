import { Box, Card, Flex, gradientBorder, Text } from '@concave/ui'
import { LastBondSolds } from './Hooks/useTreasuryData'

type TreasuryRevenueCardProps = {
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
export const TreasuryRevenueCard = ({
  firstRow,
  secondRow,
  lastBondSolds,
}: TreasuryRevenueCardProps) => {
  const { cnvPrice, marketCap, valuePerCNV } = firstRow || {}
  const { cnvTotalSupply, treasuryRevenue, treasuryValue } = secondRow || {}
  return (
    <Card bg={'#111b'} w={'600px'} h="330px" justify={'space-between'}>
      <TreasuryRevenueRow
        info1={['Market cap', marketCap]}
        info2={['CNV Price', cnvPrice]}
        info3={['Treasury value per CNV', valuePerCNV]}
        variant="primary"
      />
      <TreasuryRevenueRow
        info1={['Treasury revenue', treasuryRevenue]}
        info2={['Treasury value', treasuryValue]}
        info3={['CNV total suply', cnvTotalSupply]}
        variant="primary"
      />
      <LastBondsContainer lastBondSolds={lastBondSolds} />
    </Card>
  )
}

type LastBondsContainerProps = { lastBondSolds: LastBondSolds }
const LastBondsContainer: React.FC<LastBondsContainerProps> = ({ lastBondSolds }) => (
  <Flex mt={'-4'} flex={0.75} align="center" w="full">
    {lastBondSolds?.map(({ timesTamp, inputAmount, outputAmount }, index) => (
      <LastBondInfo
        key={index}
        timestamp={timesTamp}
        outputAmount={outputAmount}
        inputAmount={inputAmount}
      />
    ))}
  </Flex>
)

type LastBondInfoProps = { timestamp: string; inputAmount: string; outputAmount: String }
const LastBondInfo: React.FC<LastBondInfoProps> = ({ timestamp, inputAmount, outputAmount }) => (
  <Flex flex={1} align="center" color={'text.low'} fontWeight="semibold" direction={'column'}>
    <Text fontSize={'12px'}>{timestamp}</Text>
    <Text fontSize={'12px'}>{outputAmount + ' CNV bond'}</Text>
    <Text fontSize={'md'} color="text.accent">
      {'$' + inputAmount}
    </Text>
  </Flex>
)

type RevenueInfo = [string, string]
type TreasuryRevenueRowProps = {
  variant: 'primary' | 'secondary'
  info1: RevenueInfo
  info2: RevenueInfo
  info3: RevenueInfo
}
const TreasuryRevenueRow: React.FC<TreasuryRevenueRowProps> = ({
  variant,
  info1,
  info2,
  info3,
}) => (
  <Flex
    w="full"
    height={'100px'}
    apply={revenueRowBackground[variant]}
    sx={revenueRowBorder[variant]}
    rounded="2xl"
  >
    <Info info={info1[1] || 'loading...'} title={info1[0]} />
    {variant == 'primary' && <Box w={'1px'} h="full" bg={'stroke.primary'} />}
    <Info info={info2[1] || 'loading...'} title={info2[0]} />
    {variant == 'primary' && <Box w={'1px'} h="full" bg={'stroke.primary'} />}
    <Info info={info3[1] || 'loading...'} title={info3[0]} />
  </Flex>
)

type InfoProps = { title: string; info: string }
const Info: React.FC<InfoProps> = ({ info, title }) => (
  <Flex flex={1} fontWeight={'bold'} direction={'column'} justify={'center'} align="center">
    <Text color="text.low" fontSize={'14px'}>
      {title}
    </Text>
    <Text fontSize={'16px'}>{info}</Text>
  </Flex>
)

const revenueRowBackground = {
  primary: 'background.glass',
  secondary: '',
}
const revenueRowBorder = {
  primary: { ...gradientBorder() },
  secondary: {},
}
