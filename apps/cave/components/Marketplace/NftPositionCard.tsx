import {
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  Image,
  Text,
  useMediaQuery,
  VStack,
} from '@concave/ui'
import { useEffect, useState } from 'react'

interface NftPositionBoxProps {
  isLargerThan770?: boolean
  stakePeriod: number
  redeemIn: number
  price: number
  discount: number
  active?: boolean
  onClick?: () => void
}

const NftPositionBox = (props: NftPositionBoxProps) => {
  const { stakePeriod, discount, price, redeemIn, isLargerThan770 } = props
  const active = props.active
  const [maxHeight, setMaxHeight] = useState('80px')
  const [direction, setDirecton] = useState<'row' | 'column'>('row')
  const [imgSize, setImgSize] = useState('45%')
  const [containerSize, setContainerSize] = useState('177')
  const [spacing, setSpacing] = useState(0)
  const [lowFontSize, setLowFontSize] = useState('sm')
  const [height, setheight] = useState(68)
  const shadowMedium =
    'inset 0px -5px 10px rgba(134, 175, 255, 0.05), inset -9px 12px 24px rgba(13, 17, 23, 0.4)'

  useEffect(() => {
    setMaxHeight(isLargerThan770 ? '80px' : '140px')
    setDirecton(isLargerThan770 ? 'row' : 'column')
    setImgSize(isLargerThan770 ? '45%' : '25%')
    setContainerSize(isLargerThan770 ? '177px' : 'full')
    setSpacing(isLargerThan770 ? 0 : 14)
    setLowFontSize(isLargerThan770 ? 'sm' : '12px')
  }, [isLargerThan770])
  return (
    <Flex
      grow={1}
      height={'full'}
      maxHeight={maxHeight}
      position="relative"
      bg={'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'}
      rounded="2xl"
      shadow={'up'}
      direction={direction}
    >
      <Flex height={'full'}>
        <HStack
          spacing={spacing}
          width={containerSize}
          height={68}
          shadow={shadowMedium}
          rounded={'2xl'}
        >
          <Flex w={'55%'} pl={2} direction="column" textAlign={'start'}>
            <Text fontSize="xs" color="text.low" fontWeight="medium" ml={4}>
              Stake Period
            </Text>
            <Text fontSize="s" color="white" fontWeight="bold" ml={4}>
              {stakePeriod} Days
            </Text>
          </Flex>
          <Box w={imgSize}>
            <Image sizes="100%" src={'/assets/marketplace/6mposition.png'} alt="position" />
          </Box>
        </HStack>
      </Flex>

      <Flex width={'full'}>
        <Flex flex={1} justifyContent="center" direction={'column'} textAlign={'start'} ml="6">
          <Text color="text.low" fontSize={lowFontSize} isTruncated>
            Redeem In:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {redeemIn} Days
          </Text>
        </Flex>
        <Flex flex={1} justifyContent="center" direction={'column'} textAlign={'start'} ml="6">
          <Text color="text.low" fontSize={lowFontSize} isTruncated>
            Price:
          </Text>
          <Text fontSize="md" fontWeight="bold" isTruncated>
            {price} CNV
          </Text>
        </Flex>
        <Flex flex={1} justifyContent="center" direction={'column'} textAlign={'start'} ml="6">
          <Text color="text.low" fontSize={lowFontSize}>
            Discount:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {discount}%
          </Text>
        </Flex>
        <Flex
          flex={1.3}
          justifyContent="center"
          width={'60px'}
          height="60px"
          alignItems={'center'}
          zIndex={3}
        >
          <Image
            transition={'all'}
            transitionDuration="0.3s"
            transform={!!active ? 'rotate(180deg)' : ''}
            height={'60px'}
            src={`/assets/liquidstaking/modal-arrow-logo.svg`}
            alt="arrow down logo"
            cursor={'pointer'}
            onClick={props.onClick}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
const NftPositionCard = (props: NftPositionBoxProps) => {
  const [isLargerThan770] = useMediaQuery('(min-width: 770px)')
  const [active, setActive] = useState(false)
  const { discount, price, redeemIn, stakePeriod } = props
  const backgroundBorder =
    'linear-gradient(41.89deg, #53399B 0.69%, #7DE0FF 38.19%, #504179 72.85%, #84E2FF 100%)'
  const defaultBg = 'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'

  const [maxWidth, setMaxWidth] = useState('')
  const [direction, setDirection] = useState<'column' | 'row'>('row')
  const [width, setWidth] = useState('')
  const [justify, setJustify] = useState<'' | 'space-around'>('')
  const [padding, setPadding] = useState(6)

  useEffect(() => {
    setMaxWidth(isLargerThan770 ? '' : '500px')
    setDirection(isLargerThan770 ? 'row' : 'column')
    setWidth(isLargerThan770 ? '200px' : '')
    setJustify(isLargerThan770 ? '' : 'space-around')
    setPadding(isLargerThan770 ? 6 : 0)
  }, [isLargerThan770])
  return (
    <Flex
      shadow={active ? 'up' : ''}
      bg={active ? backgroundBorder : 'rgb(0,0,0,0)'}
      rounded={'2xl'}
      justifyContent="center"
      my={active ? 6 : 0}
      transition="all"
      transitionDuration={'0.3s'}
      maxH={'250px'}
    >
      <Flex
        direction={'column'}
        height="full"
        m={'2px'}
        bg={defaultBg}
        rounded={'2xl'}
        onClick={() => {}}
        flex={1}
      >
        <NftPositionBox
          isLargerThan770={isLargerThan770}
          active={active}
          discount={discount}
          price={price}
          redeemIn={redeemIn}
          stakePeriod={stakePeriod}
          onClick={() => setActive(!active)}
        />
        <Collapse in={active}>
          <Flex direction={direction} justifyContent="start" alignItems={'center'} width="full">
            <Flex width={'full'} justify={justify}>
              <Flex
                pl={padding}
                direction={'column'}
                justifyContent="center"
                alignItems={'start'}
                width={width}
              >
                <Text color={'text.low'} fontSize="sm">
                  Last sold by 0x43fs... for
                </Text>
                <Flex justifyContent={'center'} alignItems="center">
                  <Text fontWeight={500}>600 CNV</Text>
                  <Text color={'text.low'} fontSize="sm" pl={1}>
                    (3 days ago)
                  </Text>
                </Flex>
              </Flex>
              <Flex
                py={4}
                direction={'column'}
                justifyContent="start"
                alignItems={'start'}
                textAlign="start"
              >
                <Text width={'full'} color={'text.low'} fontSize="sm">
                  Redeem date:
                </Text>
                <Text width={'full'} fontWeight={500}>
                  612.42 CNV
                </Text>
              </Flex>
              <Flex textAlign={'start'} ml={4} direction={'column'} justifyContent="center">
                <Text color={'text.low'} fontSize="sm">
                  Current value
                </Text>
                <Flex justifyContent={'center'} alignItems="center">
                  <Text width={'full'} fontWeight={500}>
                    12.07.22
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <BuyButton padding={padding} isLargerThan770={isLargerThan770} />
          </Flex>
        </Collapse>
      </Flex>
    </Flex>
  )
}
interface BuyButtonProps {
  padding: number
  isLargerThan770: boolean
}

const BuyButton = ({ isLargerThan770, padding }: BuyButtonProps) => {
  const [rounded, setRounded] = useState('2xl')

  useEffect(() => {
    setRounded(isLargerThan770 ? '2xl' : '16px 16px 0px 0px')
  }, [isLargerThan770])
  return (
    <Button pr={padding}>
      <Flex
        boxShadow={'Up Big'}
        background="linear-gradient(90deg, #72639B 0%, #44B9DE 100%)"
        height={38}
        width={143}
        rounded={rounded}
        justifyContent={'center'}
        alignItems="center"
        ml={2}
      >
        <Text>Buy</Text>
      </Flex>
    </Button>
  )
}

export default NftPositionCard
