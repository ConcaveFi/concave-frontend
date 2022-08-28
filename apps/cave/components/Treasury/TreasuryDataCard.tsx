import { Card, Flex, FlexProps, gradientBorder, Text } from '@concave/ui'
import { numberMask } from 'utils/numberMask'
import { LastBondSolds, TreasuryData } from './Hooks/useTreasuryData'

type TreasuryDataCardProps = {
  treasuryData: TreasuryData
  lastBondSolds: LastBondSolds
}
export const TreasuryDataCard = ({ treasuryData, lastBondSolds }: TreasuryDataCardProps) => {
  const {
    cnvPrice,
    marketCap,
    valuePerCNV,
    cnvTotalSupply,
    treasuryRevenue,
    treasuryValue,
    cnvStatus,
    treasuryStatus,
    cnvPriceStatus,
  } = treasuryData || {}
  const statusLabel = {
    loading: 'loading ...',
    error: 'error fetching',
  }
  const marketCapLab = statusLabel[cnvStatus] || (marketCap && '$' + numberMask(marketCap))
  const cnvPriceLab = statusLabel[cnvPriceStatus] || (cnvPrice && '$' + numberMask(cnvPrice))
  const valuePerCNVLab = statusLabel[cnvStatus] || (valuePerCNV && '$' + numberMask(valuePerCNV))
  const treasuryValueLab =
    statusLabel[treasuryStatus] || (treasuryValue && '$' + numberMask(treasuryValue))
  const cnvTotalSupplyLab = statusLabel[cnvStatus] || (cnvTotalSupply && numberMask(cnvTotalSupply))
  return (
    <Card
      backdropFilter="blur(8px)"
      w={'full'}
      h={{ base: '610px', md: '330px' }}
      justify={'space-between'}
    >
      <TreasuryDataContainer
        data={[
          { title: 'Market cap', info: marketCapLab },
          { title: 'CNV price', info: cnvPriceLab, applyBorder: true },
          { title: 'Treasury value per CNV', info: valuePerCNVLab },
        ]}
      />{' '}
      <TreasuryDataContainer
        data={[
          { title: 'Treasury revenue', info: 'Coming soon' },
          {
            title: 'Treasury value',
            info: treasuryValueLab,
            applyBorder: true,
          },
          { title: 'CNV total supply', info: cnvTotalSupplyLab },
        ]}
      />
      <LastBondsContainer lastBondSolds={lastBondSolds} />
    </Card>
  )
}

type LastBondsContainerProps = { lastBondSolds: LastBondSolds }
const LastBondsContainer: React.FC<LastBondsContainerProps> = ({ lastBondSolds }) => (
  <Flex
    mt={'-4'}
    mb={{ base: 4, lg: 0 }}
    flex={{ base: 0.6, lg: 0.75 }}
    align="center"
    w="full"
    direction={{ base: 'column', md: 'row' }}
  >
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
    {...props}
  >
    <Text fontSize={'12px'}>{timestamp}</Text>
    <Text fontSize={'12px'}>{outputAmount + ' CNV bond'}</Text>
    <Text fontSize={'md'} color="text.accent">
      {'+ $' + inputAmount}
    </Text>
  </Flex>
)

type TreasuryDataContainerProps = {
  data: { title: string; info: string; applyBorder?: boolean }[]
}
const TreasuryDataContainer: React.FC<TreasuryDataContainerProps> = ({ data }) => (
  <Flex
    w="full"
    height={{ base: '216px', md: '100px' }}
    apply={'background.glass'}
    sx={{ ...gradientBorder() }}
    rounded="2xl"
    direction={{ base: 'column', md: 'row' }}
  >
    {data?.map(({ title, info, applyBorder }, index) => (
      <DataInfo info={info} title={title} key={index} applyBorder={applyBorder} />
    ))}
  </Flex>
)

type DataInfoProps = { title: string; info: string; applyBorder?: boolean }
const DataInfo: React.FC<DataInfoProps> = ({ info, title, applyBorder }) => (
  <Flex
    flex={1}
    fontWeight={'bold'}
    direction={{ base: 'row', md: 'column' }}
    justify={{ base: 'space-between', md: 'center' }}
    textAlign={'center'}
    align="center"
    px={{ base: 3, md: 0 }}
    sx={applyBorder && { ...gradientBorder() }}
  >
    <Text width={'full'} color="text.low" fontSize={'14px'}>
      {title}
    </Text>
    <Text width={'full'} fontSize={'16px'}>
      {info}
    </Text>
  </Flex>
)
const borderProps = {
  width: { base: 'full', md: '2px' },
  height: { base: '1px', md: 'full' },
  background: 'stroke.primary',
}
