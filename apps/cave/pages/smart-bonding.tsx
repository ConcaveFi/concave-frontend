import { keyframes } from '@chakra-ui/system'
import { Flex, Heading, Stack } from '@concave/ui'
import { BondBuyCard } from 'components/Bond/BondBuyCard'
import { BondPanel } from 'components/Bond/BondPanel'
import { BondSoldsCard } from 'components/Bond/BondSoldsCard'
import {
  getCurrentBlockTimestamp,
  getUserBondPositions,
  ReturnBondPositions,
  useBondState,
} from 'components/Bond/BondState'
import { withPageTransition } from 'components/PageTransition'

import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const useCurrentBlockTs = (networkId: number) => {
  const enabled = networkId != undefined
  return useQuery(['useCurrentBlockTs', networkId], () => getCurrentBlockTimestamp(networkId), {
    enabled,
  })
}

export function Bond() {
  const { userAddress, signer, networkId } = useBondState()
  const spinnerStyles = { animation: `${spin} 2s linear infinite`, size: 'sm' }
  const [bondSigma, setBondSigma] = useState<ReturnBondPositions>()
  const [showUserPosition, setShowUserPosition] = useState(true)
  const currentBlockTs = useCurrentBlockTs(networkId)
  const isLoadingBondSigma = currentBlockTs.isFetching && !!currentBlockTs.data

  const updateBondPositions = async () => {
    const bondSigma = await getUserBondPositions(networkId, userAddress, currentBlockTs.data)
    setBondSigma(bondSigma)
    setShowUserPosition(true)
  }

  useEffect(() => {
    if (!userAddress) return
    if (!currentBlockTs.data) return
    updateBondPositions()
  }, [userAddress, currentBlockTs.data])

  return (
    <Flex
      direction={'column'}
      mx="auto"
      p={0}
      gap={{ base: 3, lg: 2, xl: 10 }}
      w={{ base: '430px', lg: '720px', xl: '900px' }}
    >
      <BondDescription />
      <Flex direction={{ lg: 'row', base: 'column' }} gap={{ base: 3, lg: 2, xl: 10 }} w="full">
        <BondPanel
          userAddress={userAddress}
          showUserPosition={showUserPosition}
          isLoadingBondSigma={isLoadingBondSigma}
          bondSigma={bondSigma}
          updateBondPositions={updateBondPositions}
        />
        <BondBuyCard updateBondPositions={updateBondPositions} />
      </Flex>
      <BondSoldsCard />
    </Flex>
  )
}

Bond.Meta = {
  title: 'Concave | Bonding',
  description: `Concave's Smart Bonding offers capital efficient bonds for virtually any ERC20 token, pricing and issuance model, which is optimized by an off-chain algorithm.`,
}

export default withPageTransition(Bond)

const BondDescription = () => (
  <Stack mt={10} maxW="100%" align="center" textAlign="center">
    <Heading
      apply="background.text-brightBlue"
      fontWeight="semibold"
      variant={'H2'}
      fontSize="5xl"
      mb={3}
    >
      Dynamic Bond Market
    </Heading>
    <Flex
      direction={{ lg: 'row', md: 'column' }}
      apply="background.text-brightBlue"
      align={'center'}
      justify="center"
      maxW={550}
    >
      Bonds allow new CNV supply to be minted at a discount. All funds raised through bonds are
      added to the Concave treasury and invested to generate returns for quarterly dividends.
    </Flex>
  </Stack>
)
