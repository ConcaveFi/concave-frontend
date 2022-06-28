import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { MarketItem } from '@concave/marketplace'
import { gradientBorder } from '@concave/ui'
import { utils } from 'ethers'
import { truncateNumber } from 'utils/truncateNumber'

type MarketplacePositionProps = { marketItem: MarketItem }
export const MarketplacePosition: React.FC<MarketplacePositionProps> = ({ marketItem }) => {
  const currentValue = truncateNumber(+utils.formatEther(marketItem?.position?.currentValue))
  const discount = truncateNumber(+utils.formatEther(marketItem?.discount))
  const price = truncateNumber(+utils.formatEther(marketItem?.listPrice))
  return (
    <Flex
      width={'full'}
      h="114px"
      rounded={'2xl'}
      shadow="up"
      my={'1.5'}
      apply="background.metalBrighter"
      direction={'column'}
      p={2}
      justify="space-between"
    >
      <Flex align="center" maxH={'95px'} gap={4} width={'full'}>
        <ImageContainer stakePeriod={marketItem?.position?.poolID} />
        <Info title="Current value" info={`${currentValue}`} />
        <Info title="Discount" info={`${discount}%`} />
        <BuyContainer price={price} />
      </Flex>
      <LoadBard percent={20} />
    </Flex>
  )
}
type ImageContainerProps = { stakePeriod: number }
const ImageContainer: React.FC<ImageContainerProps> = ({ stakePeriod }) => (
  <Flex
    align={'center'}
    height={'76px'}
    w="196px"
    rounded={'2xl'}
    shadow="Down Medium"
    px={'2'}
    justify="space-around"
  >
    <Info info={period[stakePeriod]} title="Stake period" />
    <Image
      width={{ base: '90px', lg: '70px' }}
      height={{ base: '90px', lg: '70px' }}
      src={`/assets/marketplace/${stakeImage[stakePeriod]}`}
    />
  </Flex>
)

type BuyContainerProps = { price: number }
const BuyContainer = ({ price }: BuyContainerProps) => (
  <Box p={'2px'} bg="linear-gradient(90deg, #72639B 0%, #44B9DE 100%)" rounded={'2xl'}>
    <Flex
      w="172px"
      h="49px"
      rounded={'2xl'}
      shadow="up"
      apply="background.metalBrighter"
      justify="end"
    >
      <Flex flex={1} align="center" justify="center">
        <Info title="Price" info={price + ' CNV'} />
      </Flex>
      <Button
        width={'45%'}
        height="full"
        bg="linear-gradient(90deg, #72639B 0%, #44B9DE 100%)"
        rounded={'2xl'}
      >
        Buy
      </Button>
    </Flex>
  </Box>
)
type LoadBarProps = { percent: number }
const LoadBard = ({ percent }: LoadBarProps) => (
  <Flex width={'full'} h="12px" rounded={'2xl'} shadow="down" p={'3px'}>
    <Box
      width={`${percent}%`}
      height="full"
      bg={'linear-gradient(90deg, #375FC2 0%, #46CFF3 100%)'}
      rounded="2xl"
    />
  </Flex>
)
const stakeImage = {
  0: '12mposition.png',
  1: '6mposition.png',
  2: '3mposition.png',
  3: '1mposition.png',
}

const period = {
  0: '360 Days',
  1: '180 Days',
  2: '90 Days',
  3: '45 Days',
}

type InfoProps = { title: string; info: string; infoSize?: number }
const Info = ({ info, infoSize, title }: InfoProps) => (
  <Flex direction={'column'} align="center" fontWeight={'bold'}>
    <Text fontSize={'12px'} color="text.low">
      {title}
    </Text>
    <Text fontSize={infoSize || 16}>{info}</Text>
  </Flex>
)
