import { CNV } from '@concave/gemswap-sdk'
import { Box, Button, Card, Flex, HStack, Image, Input, Text } from '@concave/ui'
import { STAKING_CONTRACT } from 'constants/address'
import { StakingV1Abi } from 'contracts/LiquidStaking/LiquidStakingAbi'
import { ethers } from 'ethers'
import { useFetchApi } from 'hooks/cnvData'
import { useApprove } from 'hooks/useApprove'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAccount, useBalance, useContractWrite, useNetwork } from 'wagmi'

const periodToPoolParameter = {
  '360 days': 0,
  '180 days': 1,
  '90 days': 2,
  '45 days': 3,
}

function StakeInput(props) {
  const cnvPrice = useFetchApi('/api/cnv')
  const [stakeInput, setStakeInput] = useState('')
  const [{ data: account }] = useAccount()
  const [{ data }] = useNetwork()
  const { allowance, ...approve } = useApprove(CNV[data.chain.id], STAKING_CONTRACT[data.chain.id])
  const [approveButtonText, setApproveButtonText] = useState('Approve CNV')
  const [allowanceEnough, setAllowanceEnough] = useState(false)
  // console.log(allowance.formatted)
  // approve.sendApproveTx()

  useEffect(() => {
    if (allowance && +allowance.formatted > +stakeInput) {
      setAllowanceEnough(true)
    } else {
      setAllowanceEnough(false)
    }
    if (stakeInput === '') setStakeInput('')
  }, [allowance, stakeInput])

  const [cnvBalance, getBalance] = useBalance({
    addressOrName: account?.address,
    token: '0x2B8E79CBD58418CE9aeB720BAf6B93825B93eF1F',
    // token: '0x000000007a58f5f58E697e51Ab0357BC9e260A04',
  })

  const setSafeStakeInputValue = (value: string) => {
    let currentValue = value
    if (Number(currentValue) > Number.MAX_SAFE_INTEGER) {
      currentValue = String(Number.MAX_SAFE_INTEGER)
    }
    setStakeInput(String(currentValue))
  }

  const setMax = () => {
    setStakeInput(cnvBalance.data?.formatted)
  }

  const approveCNV = () => {
    approve.sendApproveTx()
    setApproveButtonText('Pending...')
  }

  const [lockData, lockCNV] = useContractWrite(
    {
      addressOrName: '0x265271970c6e13a942f0f75c9d619ffe5ca2872e',
      contractInterface: StakingV1Abi,
    },
    'lock',
    {
      args: [
        account.address,
        ethers.utils.parseEther(String(+stakeInput)),
        periodToPoolParameter[`${props.period}`],
      ],
    },
  )

  const router = useRouter()

  return (
    <Box>
      <Card shadow="down" w="350px" px={4} py={5}>
        <Flex justify="space-between" alignItems="center">
          <Input
            placeholder="0.00"
            value={stakeInput}
            onChange={(e) => setSafeStakeInputValue(e.target.value)}
            ml={-1}
            shadow="none"
            w="60%"
            bg="none"
            fontSize="xl"
            type="number"
          />
          <Flex shadow="up" borderRadius="3xl" px={4} py={1} alignItems="center">
            <Image src="/assets/tokens/cnv.svg" alt="concave-logo" h={8} w={8} />
            <Text ml={2} color="text.medium" fontSize="xl" fontWeight="bold">
              CNV
            </Text>
          </Flex>
        </Flex>
        <Flex mt={2} justify="space-between" px={2}>
          <Text color="text.low" fontSize="md" fontWeight="bold">
            {/* Loading Price */}
            {(cnvPrice as any)?.data
              ? `$${(+stakeInput * (cnvPrice as any)?.data.cnv).toFixed(2)}`
              : 'Loading price'}
          </Text>
          <HStack spacing={2}>
            <Text color="text.low" fontSize="sm" fontWeight="bold">
              Balance: {(+cnvBalance.data?.formatted).toFixed(2)}
            </Text>
            <Button textColor="blue.500" onClick={setMax} disabled={!cnvBalance.data}>
              Max
            </Button>
          </HStack>
        </Flex>
      </Card>

      <Box mt={10} width="350px">
        {!allowanceEnough && (
          <Button
            onClick={approveCNV}
            fontWeight="bold"
            fontSize="md"
            variant="primary"
            bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
            w="100%"
            h="50px"
            size="large"
            mx="auto"
            disabled={+stakeInput > +cnvBalance.data?.formatted}
          >
            {approveButtonText}
          </Button>
        )}

        {allowanceEnough && (
          <Button
            mt={5}
            onClick={() => lockCNV()}
            fontWeight="bold"
            fontSize="md"
            variant="primary"
            bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
            w="100%"
            h="50px"
            size="large"
            mx="auto"
            disabled={
              +stakeInput == 0 || +stakeInput > +cnvBalance.data?.formatted || lockData.loading
            }
          >
            Stake CNV
          </Button>
        )}

        {/* <Button
          mt={5}
          onClick={() => router.push('/dashboard')}
          fontWeight="bold"
          fontSize="md"
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="100%"
          h="40px"
          size="large"
          mx="auto"
        >
          Check position
        </Button> */}
      </Box>
    </Box>
  )
}

export default StakeInput
