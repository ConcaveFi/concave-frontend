import {
  Box,
  Button,
  Flex,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { MarketItem } from '@concave/marketplace'
import { Card, gradientBorder } from '@concave/ui'
import { format, formatDistance, formatDistanceToNowStrict } from 'date-fns'
import { utils } from 'ethers'
import { truncateNumber } from 'utils/truncateNumber'

type MarketplacePositionProps = { marketItem: MarketItem }
export const MarketplacePosition: React.FC<MarketplacePositionProps> = ({ marketItem }) => {
  const currentValue = truncateNumber(+utils.formatEther(marketItem?.position?.currentValue))
  const discount = truncateNumber(+utils.formatEther(marketItem?.discount))
  const price = truncateNumber(+utils.formatEther(marketItem?.listPrice))
  const positionDate = new Date(marketItem?.position?.maturity * 1000)
  const relativePositionTime = formatDistanceToNowStrict(positionDate, { unit: 'day' })

  const percent = Math.abs(positionDate.getTime() / new Date().getTime())
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
      <LoadBard
        date={format(positionDate, 'mm/dd/yyyy')}
        relativeDate={relativePositionTime}
        percent={percent}
      />
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
    <Info info={stakeDayPeriod[stakePeriod]} title="Stake period" />
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
type LoadBarProps = { percent: number; date: string; relativeDate: string }
const LoadBard = ({ percent, date, relativeDate }: LoadBarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex
      h="12px"
      rounded={'2xl'}
      shadow="down"
      p={'3px'}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <Popover isOpen={isOpen}>
        <PopoverTrigger>
          <Box
            width={`${percent}%`}
            height="full"
            bg={'linear-gradient(90deg, #375FC2 0%, #46CFF3 100%)'}
            rounded="2xl"
          />
        </PopoverTrigger>

        <PopoverContent width={'100px'}>
          <Flex
            direction={'column'}
            w={'140px'}
            h="85px"
            rounded="inherit"
            apply={'background.glass'}
            shadow="up"
            fontWeight="bold"
          >
            <Text mx={'auto'} mt={2} color="text.low">
              Redeem date:
            </Text>
            <Text>{date}</Text>
            <Flex justify={'center'} gap={2}>
              <Text color={'text.low'}>in</Text>
              <Text color={'text.accent'}>{relativeDate}</Text>
            </Flex>
          </Flex>
        </PopoverContent>
      </Popover>
    </Flex>
  )
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
const stakeImage = {
  0: '12mposition.png',
  1: '6mposition.png',
  2: '3mposition.png',
  3: '1mposition.png',
}

const stakeDayPeriod = {
  0: '360 Days',
  1: '180 Days',
  2: '90 Days',
  3: '45 Days',
}
const stakeNumberPeriod = {
  0: 360,
  1: 180,
  2: 90,
  3: 45,
}
