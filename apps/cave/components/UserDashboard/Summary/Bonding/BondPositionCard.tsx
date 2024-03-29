import { Percent } from '@concave/core'
import {
  Button,
  Flex,
  FlexProps,
  gradientBorder,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@concave/ui'
import { ProgressBar } from 'components/ProgressBar'
import { formatDistanceToNow } from 'date-fns'
import { FC } from 'react'
import { compactFormat } from 'utils/bigNumberMask'
import type { BondPosition } from '../../../UserDashboard/hooks/useUserBondState'
import { memo } from 'react'

export const BondPositionCard = (props: BondPosition) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <Popover isOpen={isOpen}>
      <PopoverTrigger>
        <Flex
          w={'full'}
          rounded={'2xl'}
          bg="bg.primary"
          my={2}
          shadow={'up'}
          direction="column"
          onMouseOverCapture={onOpen}
          onMouseOutCapture={onClose}
          _hover={{ ...gradientBorder({ borderWidth: 2 }), shadow: 'Blue Light' }}
        >
          <BondPosition {...props} />
        </Flex>
      </PopoverTrigger>
      <PopoverContent>
        <Flex
          w={'290px'}
          h="100px"
          apply="background.glass"
          css={{ '::after': { opacity: 1 } }}
          rounded={'2xl'}
          sx={{ ...gradientBorder({ borderWidth: 2 }) }}
        >
          <Flex direction={'column'} justify="center" px={6}>
            <Flex align={'center'} gap={2}>
              <Text color={'text.low'}>Redeem date:</Text>
              <Text fontWeight={'bold'}>{props.redeemDate}</Text>
            </Flex>
            <Flex align={'center'} gap={2}>
              {<Text color={'text.low'}>Redeem in:</Text>}
              <Text fontWeight={'bold'} color="text.accent">
                {formatDistanceToNow(props.redeemTimestamp, {
                  addSuffix: true,
                })}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </PopoverContent>
    </Popover>
  )
}

export const BondPositionCardMemo = memo(
  BondPositionCard,
  (propa, propb) => JSON.stringify(propa) === JSON.stringify(propb),
)

type InfoProps = { title: string; info: string }
const Info: FC<InfoProps & FlexProps> = ({ info, title, ...props }) => (
  <Flex direction={'column'} align="start" {...props}>
    <Text fontSize="xs" color={'text.low'}>
      {title}
    </Text>
    <Text fontSize={{ base: 'xs', lg: 'sm' }} fontWeight={'bold'}>
      {info}
    </Text>
  </Flex>
)

const ImageContainer = () => (
  <Flex
    minW={'150px'}
    width={{ base: 'full', md: '150px' }}
    px={4}
    justify={{ base: 'space-around', md: 'center' }}
    shadow={'Down Medium'}
    align="center"
    rounded={'2xl'}
  >
    <Image boxSize={'70px'} src={`/assets/marketplace/12mposition.png`} />
  </Flex>
)

const BondPosition = (props: BondPosition) => {
  return (
    <Flex shadow="up" width={'full'} rounded="2xl" p={3} direction="column">
      <Flex
        width={'full'}
        justify="space-between"
        mb={2}
        align="center"
        direction={{ base: 'column', md: 'row' }}
      >
        <ImageContainer />
        <Flex w="full" justify="space-around">
          <Info title="Bond Creation" info={props.creationDate} />
          <Info title="Owed" info={compactFormat(props.owed) + ' CNV'} />
          <Info title="Redeemed" info={compactFormat(props.redeemed) + ' CNV'} />
        </Flex>

        <Button display={{ base: 'none', md: 'flex' }} minW={'110px'} py={4} />
      </Flex>
      <ProgressBar percent={props.elapsed} />
    </Flex>
  )
}
