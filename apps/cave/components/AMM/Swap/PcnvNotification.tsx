import { Currency, CurrencyAmount } from '@concave/core'
import { Flex, Text } from '@concave/ui'
import { formatFixed } from '@ethersproject/bignumber'
import { parseEther } from 'ethers/lib/utils'
import { useGet_Amm_Cnv_InfosQuery } from 'graphql/generated/graphql'
import React from 'react'

type PcnvNotificationProps = {
  isOpen?: boolean
  tokenAmount: CurrencyAmount<Currency>
}
export const PcnvNotification: React.FC<PcnvNotificationProps> = ({ isOpen, tokenAmount }) => {
  const { data } = useGet_Amm_Cnv_InfosQuery()
  const pCNVInitialSupply = 33300000
  const pCNV10PercentClaim = (data?.cnvData?.data?.totalSupply || 0) * 0.1
  const pCNVToCNVDifference = pCNV10PercentClaim / pCNVInitialSupply

  const pCNVAmount = parseFloat(tokenAmount?.toSignificant())
  const CNVAmount = pCNVAmount * pCNVToCNVDifference

  return (
    <Flex
      transition="all 0.6s"
      w="full"
      h={isOpen ? '389px' : '0px'}
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
        <TokenInfoContainer label={`${pCNVAmount} pCNV`} />
        <Text color={'text.low'} fontSize="sm">
          pCNV purchased is unlocked over time. CNV can be redeemed with unlocked pCNV.
        </Text>
        <Info
          title={'Exchange Rate:'}
          info={`1 pCNV = ${formatFixed(
            parseEther(pCNVToCNVDifference.toString().slice(0, 8)),
            18,
          )} CNV`}
        />
        <TokenInfoContainer label={`${CNVAmount} CNV`} />
        <Text color={'text.low'} fontSize="sm">
          The amount of CNV redeemable for each pCNV grows as the total supply of CNV increases. For
          more information on these mechanics
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
