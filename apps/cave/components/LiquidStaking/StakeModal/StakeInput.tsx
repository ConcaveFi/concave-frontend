import { Box, Button, Card, Flex, HStack, Image, Input, Text } from '@concave/ui'
import { useFetchApi } from 'hooks/cnvData'
import React, { useEffect, useState } from 'react'
import { useAccount, useBalance } from 'wagmi'

function StakeInput() {
  const cnvPrice = useFetchApi('/api/cnv')
  const [stakeInput, setStakeInput] = useState(0)
  const [{ data: account }] = useAccount()

  const [cnvBalance, getBalance] = useBalance({
    addressOrName: account?.address,
    // token: '0x2B8E79CBD58418CE9aeB720BAf6B93825B93eF1F',
    token: '0x000000007a58f5f58E697e51Ab0357BC9e260A04',
  })

  const setMax = () => {
    setStakeInput(+cnvBalance.data?.formatted)
  }

  return (
    <Box>
      <Card w="350px" px={4} py={5}>
        <Flex justify="space-between" alignItems="center">
          <Input
            value={stakeInput}
            onChange={(e) => setStakeInput(Number(e.target.value))}
            ml={-1}
            shadow="none"
            w="60%"
            bg="none"
            fontSize="xl"
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
            {cnvPrice.data ? `$${(stakeInput * cnvPrice.data?.cnv).toFixed(2)}` : 'Loading price'}
          </Text>
          <HStack spacing={2}>
            <Text color="text.low" fontSize="sm" fontWeight="bold">
              Balance: {(+cnvBalance.data?.formatted).toFixed(2)}
            </Text>
            <Button textColor="blue.500" onClick={setMax}>
              Max
            </Button>
          </HStack>
        </Flex>
      </Card>

      <Box mt={5} px={3} width="350px">
        <Button
          onClick={() => console.log('Approve')}
          fontWeight="bold"
          fontSize="md"
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="100%"
          h="40px"
          size="large"
          mx="auto"
        >
          Approve
        </Button>

        <Button
          mt={5}
          onClick={() => console.log('Stake CNV')}
          fontWeight="bold"
          fontSize="md"
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="100%"
          h="40px"
          size="large"
          mx="auto"
        >
          Stake CNV
        </Button>
      </Box>
    </Box>
  )
}

export default StakeInput
