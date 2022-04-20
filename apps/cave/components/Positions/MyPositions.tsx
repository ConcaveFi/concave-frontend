import { ExpandArrowIcon } from '@concave/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CloseButton,
  Flex,
  Heading,
  HStack,
  IconButton,
  Modal,
  NumericInput,
  Stack,
  Text,
  useDisclosure,
  UseDisclosureReturn,
} from '@concave/ui'
import { useAddressTokenList } from 'components/AMM/hooks/useTokenList'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { formatUnits } from 'ethers/lib/utils'
import { Pair, Token } from 'gemswap-sdk'
import { useLiquidityInfo } from 'hooks/useLiquidityInfo'
import { precision, usePrecision } from 'hooks/usePrecision'
import React, { useState } from 'react'
import { useBalance } from 'wagmi'

export const MyPositions = ({ account }) => {
  const userTokens = useAddressTokenList(account.address)
  const liquidityPoolTokens = (userTokens.data || []).filter((p) => {
    return p.name == 'Concave LP'
  })
  if (!liquidityPoolTokens.length) {
    return <p>loading pools</p>
  }
  return (
    <>
      <RewardsBanner />
      <Card variant="primary" borderRadius="3xl" p={6} shadow="Up for Blocks">
        <Accordion as={Stack} allowToggle gap={2}>
          {liquidityPoolTokens.map((liquidityPoolToken) => {
            return (
              <LPPositionItem
                key={liquidityPoolToken.address}
                liquidityPoolToken={liquidityPoolToken}
                userAddress={account.address}
              />
            )
          })}
        </Accordion>
      </Card>
    </>
  )
}

const RewardsBanner = () => (
  <Card variant="secondary" p={4} gap={4}>
    <Flex justify="space-between">
      <Heading as="h2" fontSize="lg">
        Liquidity Provider Rewards
      </Heading>
      <CloseButton blendMode="multiply" _hover={{ blendMode: 'normal' }} />
    </Flex>
    <Text fontSize="lg">
      Liquidity providers earn a 0.25% fee on all trades proportional to their share of the pool.
      Fees are added to the pool, accrue in real time and can be claimed by withdrawing your
      liquidity.
    </Text>
  </Card>
)

interface LPPosition {
  userAddress: string
  liquidityPoolToken: Token
}
const LPPositionItem = ({ userAddress, liquidityPoolToken }: LPPosition) => {
  const [{ pair, token, totalSupply }, loading, error] = useLiquidityInfo(liquidityPoolToken)
  const [userBalance] = useBalance({
    addressOrName: userAddress,
    token: token?.address,
    formatUnits: token?.decimals,
  })
  const addLiquidity = useDisclosure()
  const removeLiquidity = useDisclosure()
  if (!pair) {
    return <p>Loading Pair</p>
  }
  if (userBalance.loading) {
    return <p>Loading user Balance</p>
  }
  const percentage =
    +formatUnits(userBalance.data.value, userBalance.data.decimals) /
    +formatUnits(totalSupply, token.decimals)
  return (
    <>
      <AccordionItem p={2} shadow="Up Big" borderRadius="2xl" alignItems="center">
        <AccordionButton>
          {/* //TODO https://github.com/ConcaveFi/concave-frontend/issues/118 */}
          <CurrencyIcon h={'32px'} currency={pair.token0} mx={1} />
          <CurrencyIcon h={'32px'} currency={pair.token1} mx={1} />
          <Text ml="24px" fontWeight="semibold" fontSize="lg">
            {pair.token0.symbol}/{pair.token1.symbol}{' '}
            <a
              target={'_blank'}
              href={`https://ropsten.etherscan.io/address/${token.address}#readContract}`}
              rel="noreferrer"
            >
              link to etherscan
            </a>
          </Text>
          <Button
            variant="secondary"
            borderRadius="full"
            pl={3}
            pr={1}
            fontSize="lg"
            rightIcon={<AccordionIcon h="28px" w="auto" />}
            iconSpacing={0}
            ml="auto"
          >
            Manage
          </Button>
        </AccordionButton>
        <AccordionPanel>
          <Stack
            fontWeight="bold"
            fontSize="lg"
            color="text.medium"
            borderRadius="2xl"
            shadow="down"
            p={4}
            spacing={4}
          >
            <PositionInfoItem label="Your total pool tokens:" value={userBalance.data.formatted} />
            <PositionInfoItem
              label={`Pooled ${pair.token0.symbol}:`}
              value={pair.reserve0.toFixed(2)}
            >
              <CurrencyIcon h={'32px'} size="sm" currency={pair.token0} />
            </PositionInfoItem>
            <PositionInfoItem
              label={`Pooled ${pair.token1.symbol}:`}
              value={pair.reserve1.toFixed(2)}
            >
              <CurrencyIcon h={'32px'} size="sm" currency={pair.token1} />
            </PositionInfoItem>
            <PositionInfoItem
              label="Your pool share:"
              value={`${precision(percentage * 100, 2).formatted}%`}
            />
          </Stack>
          <Flex gap={5} justify="center" mt={6}>
            <Button onClick={addLiquidity.onOpen} variant="primary" h={12} w={40} fontSize="lg">
              Add
            </Button>
            <Button onClick={removeLiquidity.onOpen} variant="primary" h={12} w={40} fontSize="lg">
              Remove
            </Button>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
      <RemoveLiquidityModal
        userAddressOrName={userAddress}
        disclosure={removeLiquidity}
        pair={pair}
      />
      {/* <AddLiquidityModal disclosure={addLiquidity} userAddress={user.address} /> */}
    </>
  )
}

const PositionInfoItem = ({ color = '', label, value, mt = 0, children = <></> }) => (
  <Flex justify="space-between" align={'center'} mt={mt}>
    <Text color={color}>{label}</Text>
    <HStack gap={2} align={'center'} alignContent={'center'}>
      <Text>{value}</Text>
      {children}
    </HStack>
  </Flex>
)

const RemoveLiquidityModal = ({
  disclosure,
  userAddressOrName,
  pair,
}: {
  userAddressOrName: string
  pair: Pair
  disclosure: UseDisclosureReturn
}) => {
  const [percentToRemove, setPercentToRemove] = useState(0)
  const removeLiquidityState = useRemoveLiquidity({
    pair,
    percentToRemove,
  })
  return (
    <Modal
      bluryOverlay={true}
      title="Remove Liquidity"
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      isCentered
      size={'2xl'}
      bodyProps={{
        variant: 'primary',
        borderRadius: '3xl',
        p: 6,
        shadow: 'Up for Blocks',
        fontWeight: 'bold',
        fontSize: 'lg',
        gap: 6,
      }}
    >
      <AmountToRemove onChange={setPercentToRemove} />
      <Flex justifyContent={'center'}>
        <IconButton
          variant="secondary"
          shadow={'Up Small'}
          borderRadius={'full'}
          bgGradient="linear(to-l, secondary.75, secondary.150)"
          w={'35px'}
          h={'30px'}
          my={-4}
          aria-label="Search database"
          icon={<ExpandArrowIcon h={'100%'} />}
        />
      </Flex>
      <YouWillReceive {...removeLiquidityState} />
      <RemoveLiquidityActions />
      <YourPosition {...removeLiquidityState} />
    </Modal>
  )
}

const RemoveLiquidityActions = () => {
  const [approved, setApproved] = useState(false)
  const removeAproval = async () => {}

  const confirmedWithdrawal = () => {
    console.log('send tx to metamask')
    return console.log('confirmed Withdrawal!!!')
  }

  return (
    <Flex gap={4} justifyContent={'center'}>
      <Button w={250} variant={'primary'} onClick={removeAproval}>
        Approve
      </Button>
      <Button disabled={!approved} w={250} variant={'primary'} onClick={confirmedWithdrawal}>
        Confirm Withdrawal
      </Button>
    </Flex>
  )
}

const YourPosition = ({ pair }: { pair: Pair }) => {
  return (
    <Flex gap={7} direction={'column'} shadow="Up Big" px={4} py={4} borderRadius="2xl">
      <Text fontSize={'lg'}>Your Position</Text>
      <Flex gap={2} align={'center'}>
        <CurrencyIcon size="sm" currency={pair.token0} />
        <CurrencyIcon size="sm" currency={pair.token1} />
        <Text px={4}>
          {pair.token0.symbol}/{pair.token1.symbol}
        </Text>
      </Flex>
      <Stack
        fontWeight="bold"
        fontSize="lg"
        color="text.medium"
        borderRadius="2xl"
        shadow="inset 0px -5px 10px rgba(134, 175, 255, 0.05), inset -9px 12px 24px rgba(13, 17, 23, 0.4)"
        p={4}
        spacing={3}
      >
        <PositionInfoItem label="Your pool share:" value={'2.79%'} />
        <PositionInfoItem label={pair.token0.symbol} value={'0.0001331'}>
          <CurrencyIcon size="sm" currency={pair.token0} />
        </PositionInfoItem>
        <PositionInfoItem label={pair.token1.symbol} value={'325.744'}>
          <CurrencyIcon size="sm" currency={pair.token1} />
        </PositionInfoItem>
      </Stack>
    </Flex>
  )
}

const YouWillReceive = ({
  pair,
  amountAMin,
  amountBMin,
}: {
  amountAMin: number
  amountBMin: number
  pair: Pair
}) => {
  return (
    <HStack gap={7} shadow="Up Big" px={6} py={3} borderRadius="2xl" align="center">
      <Box>
        <Text>You will receive:</Text>
        <Text fontWeight={400} fontStyle={'md'} color={'#2E97E2'} fontSize={'14px'}>
          You will receive:
        </Text>
      </Box>
      <ReceiveBox amount={amountAMin} token={pair.token0} />
      <ReceiveBox amount={amountBMin} token={pair.token1} />
    </HStack>
  )
}

const ReceiveBox = ({ amount, token }: { amount: number; token: Token }) => {
  return (
    <HStack shadow="down" borderRadius="2xl" p={3}>
      <CurrencyIcon size="sm" currency={token} />
      <Box>
        <Text fontFamily={'heading'} fontWeight={600}>
          {usePrecision(amount, 7).formatted}
        </Text>
        <Text title={token?.name} fontWeight={700} fontSize={'sm'} color={'text.low'}>
          {token?.symbol}
        </Text>
      </Box>
    </HStack>
  )
}
const AmountToRemove = ({ onChange }: { onChange: (n: number) => void }) => {
  return (
    <Flex shadow="Up Big" px={6} py={3} borderRadius="2xl" justify="space-between" align="center">
      <Text>Amount to remove</Text>
      <NumericInput
        shadow="down"
        onValueChange={({ floatValue }, eventSrc) =>
          eventSrc.source === 'event' && onChange(floatValue)
        }
        borderRadius="2xl"
        isAllowed={({ floatValue }) => !floatValue || (floatValue <= 100 && floatValue >= 0)}
        py={2}
        px={4}
        w="180px"
        textAlign="right"
        suffix=" %"
        placeholder="0.0 %"
      />
    </Flex>
  )
}

const useRemoveLiquidity = ({ pair, percentToRemove }: { percentToRemove: number; pair: Pair }) => {
  const to = ''
  const ratioToRemove = Math.min(percentToRemove, 100) / 100
  const [liquidity, setLiquidity] = useState(0)
  const amountAMin = +pair.reserve0.toExact() * ratioToRemove
  const amountBMin = +pair.reserve1.toExact() * ratioToRemove
  const [deadline, setDeadLine] = useState(new Date().getTime() / 1000 + 15 * 60)
  // const [{ data, error, loading }, getSigner] = useSigner()
  return {
    liquidity,
    pair,
    amountAMin,
    amountBMin,
    deadline,
  }
}
