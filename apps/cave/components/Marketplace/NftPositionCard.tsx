import {
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  Image,
  Text,
  useBreakpointValue,
  useMediaQuery,
  VStack,
} from '@concave/ui'
import { useEffect, useState } from 'react'

interface NftPositionBoxProps {
  stakePeriod: number
  redeemIn: number
  price: number
  discount: number
  active?: boolean
  onClick?: () => void
}

const NftPositionBox = (props: NftPositionBoxProps) => {
  const { stakePeriod, discount, price, redeemIn } = props
  const active = props.active

  return (
    <Flex
      grow={1}
      height={'full'}
      maxHeight={{ base: '180px', md: '80px', lg: '80px' }}
      position="relative"
      bg={'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'}
      rounded="2xl"
      shadow={'up'}
      direction={{ base: 'column', md: 'row', lg: 'row' }}
    >
      <Flex height={'full'}>
        <HStack
          spacing={{ base: 14, md: 0, lg: 0 }}
          width={{ base: 'full', lg: '177px', md: '177px' }}
          height={68}
          shadow={'Down Medium'}
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
          <Box w={{ base: '25%', lg: '45%', md: '45%' }}>
            <Image sizes="100%" src={'/assets/marketplace/6mposition.png'} alt="position" />
          </Box>
        </HStack>
      </Flex>

      <Flex width={'full'}>
        <Flex flex={1} justifyContent="center" direction={'column'} textAlign={'start'} ml="6">
          <Text color="text.low" fontSize={{ base: '12px', lg: 'sm', md: 'sm' }} isTruncated>
            Redeem In:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {redeemIn} Days
          </Text>
        </Flex>
        <Flex flex={1} justifyContent="center" direction={'column'} textAlign={'start'} ml="6">
          <Text color="text.low" fontSize={{ base: '12px', lg: 'sm', md: 'sm' }} isTruncated>
            Price:
          </Text>
          <Text fontSize="md" fontWeight="bold" isTruncated>
            {price} CNV
          </Text>
        </Flex>
        <Flex flex={1} justifyContent="center" direction={'column'} textAlign={'start'} ml="6">
          <Text color="text.low" fontSize={{ base: '12px', lg: 'sm', md: 'sm' }}>
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
  const [active, setActive] = useState(false)
  const { discount, price, redeemIn, stakePeriod } = props
  const backgroundBorder =
    'linear-gradient(41.89deg, #53399B 0.69%, #7DE0FF 38.19%, #504179 72.85%, #84E2FF 100%)'

  return (
    <Flex
      shadow={active ? 'up' : ''}
      bg={active ? backgroundBorder : 'rgb(0,0,0,0)'}
      rounded={'2xl'}
      justifyContent="center"
      my={active ? 6 : 0}
      transition="all"
      transitionDuration={'0.3s'}
      maxH={'280px'}
    >
      <Flex
        direction={'column'}
        height="full"
        m={'2px'}
        bg={'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'}
        rounded={'2xl'}
        onClick={() => {}}
        flex={1}
      >
        <NftPositionBox
          active={active}
          discount={discount}
          price={price}
          redeemIn={redeemIn}
          stakePeriod={stakePeriod}
          onClick={() => setActive(!active)}
        />
        <Collapse in={active}>
          <Flex
            direction={{ lg: 'row', md: 'row', base: 'column' }}
            justifyContent="start"
            alignItems={'center'}
            width="full"
          >
            <Flex width={'full'} justify={{ lg: '', md: '', base: 'space-around' }} isTruncated>
              <Flex
                pl={{ lg: 3, md: 3, base: 0 }}
                direction={'column'}
                justifyContent="center"
                alignItems={'start'}
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
                ml={4}
              >
                <Text width={'full'} color={'text.low'} fontSize="sm">
                  Redeem date:
                </Text>
                <Text width={'full'} fontWeight={500}>
                  12.07.22
                </Text>
              </Flex>
              <Flex textAlign={'start'} ml={4} direction={'column'} justifyContent="center">
                <Text color={'text.low'} fontSize="sm">
                  Current value
                </Text>
                <Flex justifyContent={'center'} alignItems="center">
                  <Text width={'full'} fontWeight={500}>
                    612.42 CNV
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <BuyButton />
          </Flex>
        </Collapse>
      </Flex>
    </Flex>
  )
}

const BuyButton = () => {
  return (
    <Button pr={{ lg: 6, md: 6, base: 0 }}>
      <Flex
        boxShadow={'Up Big'}
        background="linear-gradient(90deg, #72639B 0%, #44B9DE 100%)"
        height={38}
        width={143}
        rounded={{ lg: '2xl', md: '2xl', base: '16px 16px 0px 0px' }}
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
