import { Box, Collapse, Flex, HStack, Image, Text, VStack } from '@concave/ui'
import { Dispatch, SetStateAction, useState } from 'react'

interface NftPositionBoxProps {
  stakePeriod: number
  redeemIn: number
  price: number
  discount: number
  active?: boolean
  onClick?: (any: Dispatch<SetStateAction<boolean>>) => void
}

const NftPositionBox = (props: NftPositionBoxProps) => {
  const { stakePeriod, discount, price, redeemIn } = props
  const active = props.active

  const shadowMedium =
    'inset 0px -5px 10px rgba(134, 175, 255, 0.05), inset -9px 12px 24px rgba(13, 17, 23, 0.4)'

  return (
    <Flex
      grow={1}
      height={'80px'}
      maxHeight={'80px'}
      position="relative"
      bg={'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'}
      rounded="2xl"
      shadow={'up'}
    >
      <Flex height={'full'} alignItems="center" justifyContent={'center'} width={200}>
        <HStack width={177} height={68} shadow={shadowMedium} rounded={'2xl'}>
          <Flex w={'55%'} pl={2} direction="column">
            <Text fontSize="xs" color="text.low" fontWeight="medium">
              Stake Period
            </Text>
            <Text fontSize="s" color="white" fontWeight="bold">
              {stakePeriod} Month
            </Text>
          </Flex>
          <Box w={'45%'}>
            <Image sizes="100%" src={'/assets/marketplace/6mposition.png'} alt="position" />
          </Box>
        </HStack>
      </Flex>

      <Flex flex={1} justifyContent="center" direction={'column'} textAlign={'start'} ml="2">
        <Text color="text.low" fontSize="sm">
          Redeem In:
        </Text>
        <Text fontSize="md" fontWeight="bold">
          {redeemIn} Days
        </Text>
      </Flex>
      <Flex flex={1} justifyContent="center" direction={'column'} textAlign={'start'} ml="2">
        <Text color="text.low" fontSize="sm">
          Price:
        </Text>
        <Text fontSize="md" fontWeight="bold">
          {price} CNV
        </Text>
      </Flex>
      <Flex flex={1} justifyContent="center" direction={'column'} textAlign={'start'} ml="2">
        <Text color="text.low" fontSize="sm">
          Discount:
        </Text>
        <Text fontSize="md" fontWeight="bold">
          {discount}%
        </Text>
      </Flex>
      <Flex flex={1.3} justifyContent="center" alignItems={'center'}>
        <Image
          transition={'all'}
          transitionDuration="0.3s"
          transform={!!active ? 'rotate(180deg)' : ''}
          height={'60px'}
          src={`/assets/liquidstaking/modal-arrow-logo.svg`}
          alt="arrow down logo"
        />
      </Flex>
    </Flex>
  )
}
const NftPositionCard = (props: NftPositionBoxProps) => {
  const [active, setActive] = useState(false)
  const { discount, price, redeemIn, stakePeriod } = props
  const backgroundBorder =
    'linear-gradient(41.89deg, #53399B 0.69%, #7DE0FF 38.19%, #504179 72.85%, #84E2FF 100%)'
  const defaultBg = 'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'
  return (
    <Flex
      shadow={active ? 'up' : ''}
      bg={active ? backgroundBorder : 'rgb(0,0,0,0)'}
      rounded={'2xl'}
      justifyContent="center"
      cursor={'pointer'}
      my={active ? 6 : 0}
      transition="all"
      transitionDuration={'0.3s'}
    >
      <Flex
        direction="column"
        grow={1}
        m={'2px'}
        bg={defaultBg}
        rounded={'2xl'}
        onClick={() => setActive(!active)}
      >
        <NftPositionBox
          active={active}
          discount={discount}
          price={price}
          redeemIn={redeemIn}
          stakePeriod={stakePeriod}
        />
        <Collapse in={active}>
          <Flex height="100px"></Flex>
        </Collapse>
      </Flex>
    </Flex>
  )
}

export default NftPositionCard
