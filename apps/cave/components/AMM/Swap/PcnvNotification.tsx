import { Flex, Text } from '@concave/ui'
import React from 'react'

type PcnvNotificationProps = {
  isOpen?: boolean
}
export const PcnvNotification: React.FC<PcnvNotificationProps> = ({ isOpen }) => {
  return (
    <Flex
      transition="all 0.6s"
      w="full"
      h={!isOpen ? '389px' : '0px'}
      position="relative"
      overflow={'hidden'}
      shadow="up"
      rounded={'2xl'}
    >
      <Flex
        position={'absolute'}
        height="389px"
        w="full"
        direction="column"
        justify="space-around"
        p={6}
      >
        <Info title={'Unlocked pCNV:'} info={'50%'} />
        <TokenInfoContainer label="11.552 pCNV" />
        <Text color={'text.low'} fontSize="sm">
          pCNV purchased is unlocked over time. CNV can be redeemed with unlocked pCNV.
        </Text>
        <Info title={'Exchange Rate:'} info={'1 pCNV = 0.01 CNV'} />
        <TokenInfoContainer label="0.0421 CNV" />
        <Text color={'text.low'} fontSize="sm">
          The amount of CNV redeemable for each pCNV grows as the total supply of CNV increases. For
          more infromation on these mechanics
        </Text>
      </Flex>
    </Flex>
  )
}

type TokenInfoContainerProps = { label: string }
const TokenInfoContainer: React.FC<TokenInfoContainerProps> = ({ label }) => (
  <Flex width={'full'} rounded="2xl" shadow={'down'} h="59px" align={'center'} px={4}>
    <Text fontWeight={'bold'} fontSize="lg">
      {label}
    </Text>
  </Flex>
)

type InfoProps = { title: string; info: string }
const Info: React.FC<InfoProps> = ({ info, title }) => (
  <Flex gap={2} fontWeight="bold" fontSize={'md'}>
    <Text color={'text.low'}>{title}</Text>
    <Text>{info}</Text>
  </Flex>
)
