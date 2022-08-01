import { Currency, CurrencyAmount, PCNVContract } from '@concave/core'
import { Flex, Text } from '@concave/ui'
import { formatFixed } from '@ethersproject/bignumber'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { useGet_Amm_Cnv_InfosQuery } from 'graphql/generated/graphql'
import React from 'react'
import { useQuery } from 'react-query'
import { useProvider } from 'wagmi'

type PcnvNotificationProps = {
  isOpen?: boolean
  tokenAmount: CurrencyAmount<Currency>
}
export const PcnvNotification: React.FC<PcnvNotificationProps> = ({ isOpen, tokenAmount }) => {
  const { data } = useGet_Amm_Cnv_InfosQuery()
  const provider = useProvider()
  const pCNVInitialSupply = 33300000
  const pCNV10PercentClaim = (data?.cnvData?.data?.totalSupply || 0) * 0.1
  const pCNVToCNVDifference = pCNV10PercentClaim / pCNVInitialSupply

  const { data: vestedPercent, status } = useQuery(['VestedPercent'], async () => {
    const pCNVContract = new PCNVContract(provider)
    const time = +(Date.now() / 1000).toString().split('.')[0]
    console.log(time)

    return await pCNVContract.vestedPercent(time)
  })
  const pCNVAmount = parseFloat(tokenAmount?.toSignificant()) * +formatEther(vestedPercent)
  const CNVAmount = pCNVAmount * pCNVToCNVDifference

  console.log(formatEther(vestedPercent))
  const pCNVUnlockedLabel = {
    loading: 'Loading ...',
    success: `${formatEther(vestedPercent?.mul(100) || 0)}%`,
    error: 'An error occurred',
  }
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
        <Info title={'Unlocked pCNV:'} info={pCNVUnlockedLabel[status]} />
        <TokenInfoContainer label={`${pCNVAmount} pCNV`} />
        <Text color={'text.low'} fontSize="sm">
          pCNV purchased is unlocked over time. CNV can be redeemed with unlocked pCNV.
        </Text>
        <Info
          title={'Exchange Rate:'}
          info={`1 pCNV = ${formatFixed(
            parseEther(pCNVToCNVDifference?.toString().slice(0, 8)),
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
