import { Text, VStack, HStack, Flex, Image, useMediaQuery, Box } from '@concave/ui'
import { useEffect, useState } from 'react'

interface StakeAprCardProps {
  title: string
  length: string
  text: string
  image: string
  diluted: boolean
  isLargerLayout: boolean
}
const StakeAprCard = (props: StakeAprCardProps) => {
  const { isLargerLayout } = props

  return isLargerLayout ? <DefaultLayout props={props} /> : <MobileLayout props={props} />
}

interface MobileLayoutProps {
  props: StakeAprCardProps
}

const MobileLayout = (props: MobileLayoutProps) => {
  const { title, length, text, image, diluted } = props.props

  return (
    <Flex
      direction={'column'}
      align="center"
      justify={'center'}
      flex={1}
      height="170px"
      position="relative"
    >
      <Text fontSize="xs" color="text.low" fontWeight="medium">
        Stake Pool
      </Text>
      <Text fontSize="s" color="white" fontWeight="bold">
        {title}
      </Text>
      <Flex position={'relative'} height="40px" width={'full'} align="center">
        <Flex position={'absolute'} width="full">
          <Image h="70px" w="70px" src={image} alt={`stake-period-${length}`} mx="auto" />
        </Flex>
      </Flex>
      <Text fontSize="xs" color="text.low" fontWeight="medium">
        {!diluted && 'v'}APR
      </Text>

      <Text fontSize="s" color="white" fontWeight="bold">
        {text}
      </Text>
    </Flex>
  )
}
interface DefaultLayoutProps {
  props: StakeAprCardProps
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { title, length, text, image, diluted } = props.props
  return (
    <Flex flex={1} direction={'column'} mx={6}>
      <Flex>
        <Flex direction={'column'} flex={1} mt={4}>
          <Text fontSize="xs" color="text.low" fontWeight="medium">
            Stake Pool
          </Text>
          <Text fontSize="s" color="white" fontWeight="bold">
            {title}
          </Text>
        </Flex>
        <>
          <Image h="70px" w="70px" src={image} alt={`stake-period-${length}`} />
        </>
        <Flex direction={'column'} flex={1} mt={4}>
          <Text fontSize="xs" color="text.low" fontWeight="medium">
            {!diluted && 'v'}APR
          </Text>
          <Text fontSize="s" color="white" fontWeight="bold">
            {text}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default StakeAprCard
