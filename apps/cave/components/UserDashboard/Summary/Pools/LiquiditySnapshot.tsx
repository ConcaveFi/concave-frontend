import { ChevronRightIcon, RepeatIcon, AddIcon } from '@concave/icons'
import { Box, Button, Card, Flex, Heading, HStack, Text } from '@concave/ui'
import { AddLiquidityModal } from 'components/AMM/AddLiquidity/AddLiquidity'
import { usePositionsState } from 'components/LiquidityPoolPositions/hooks/usePositionsState'
import { PairsAccordion } from 'components/LiquidityPoolPositions/MyPositions'
import { ResponsiveButton } from 'components/ResponsiveMenuButton'
import { useRouter } from 'next/router'

export function LiquiditySnapshot() {
  const state = usePositionsState('user')
  const router = useRouter()
  return (
    <Flex
      w="full"
      h="full"
      m="auto"
      p={{ base: 2, sm: 6 }}
      gap={{ base: 2, sm: 4 }}
      flexDir={'column'}
      borderRadius={'3xl'}
      shadow={'Up Big'}
    >
      <Flex direction={'column'} align={{ base: 'center', xl: 'start' }}>
        <Heading
          fontSize={{ base: 'lg' }}
          fontWeight={'semibold'}
          variant="H5"
          apply="background.text-brightBlue"
        >
          My liquidity position
        </Heading>
        <Text fontSize={{ base: 'md', lg: 'xl' }} color="text.bright" fontWeight={'semibold'}>
          Liquidity provider rewards
        </Text>
      </Flex>
      <Text
        textAlign={{ base: 'center', xl: 'start' }}
        fontSize={{ base: 'md', lg: '18px' }}
        color="text.low"
      >
        Liquidity providers earn a 0.25% fee on all trades proportional to their share of the pool.
        Fees are added to the pool, accrue in real time and can be claimed by withdrawing your
        liquidity.
      </Text>
      <Flex gap={{ base: 2, sm: 4 }} w={'full'}>
        <ResponsiveButton
          size={'md'}
          boxShadow={'Up Big'}
          onClick={state.refetch}
          isDisabled={state.isLoading}
          justifyContent={'space-between'}
          leftIcon={<RepeatIcon />}
        >
          Refresh
        </ResponsiveButton>
        <AddLiquidityModal>
          {({ onOpen }) => (
            <ResponsiveButton
              size={'md'}
              boxShadow={'Up Big'}
              onClick={onOpen}
              isDisabled={state.isLoading || state.isFetching}
              justifyContent={'space-between'}
              leftIcon={<AddIcon />}
            >
              Add Liquidity
            </ResponsiveButton>
          )}
        </AddLiquidityModal>
        <Button
          ml={'auto'}
          size={'md'}
          boxShadow={'Up Big'}
          onClick={() => router.push('/pools')}
          justifyContent={'space-between'}
          rightIcon={<ChevronRightIcon />}
        >
          Explore pools
        </Button>
      </Flex>

      <PairsAccordion
        isLoading={state.isLoading}
        isFetching={state.isFetching}
        pairs={state.pairs}
      />
    </Flex>
  )
}
