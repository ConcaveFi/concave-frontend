import { ExpandArrowIcon, PlusIcon } from '@concave/icons'
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
import { TokenInput } from 'components/AMM/TokenInput'
import { parseInputAmount } from 'components/AMM/utils/parseInputAmount'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { TransactionSubmittedModal } from 'components/TransactionSubmittedModal'
import { formatUnits } from 'ethers/lib/utils'
import { Pair, Token } from 'gemswap-sdk'
import { useAddLiquidity, UseAddLiquidityData } from 'hooks/useAddLiquidity'
import { useApprovalWhenNeeded } from 'hooks/useAllowance'
import { useLiquidityInfo } from 'hooks/useLiquidityInfo'
import { precision, usePrecision } from 'hooks/usePrecision'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { chain, useAccount, useBalance } from 'wagmi'

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

const PositionInfoItem = ({ color = '', label, value, mt = 0, children = <></> }) => (
  <Flex justify="space-between" align={'center'} mt={mt}>
    <Text color={color}>{label}</Text>
    <HStack gap={2} align={'center'} alignContent={'center'}>
      <Text>{value}</Text>
      {children}
    </HStack>
  </Flex>
)

interface LPPosition {
  //  pair?: Pair
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

const RemoveLiquidityActions = () => {
  const [approved, setApproved] = useState(false)
  // const [{ data, error, loading }, getSigner] = useSigner()
  // const userApproval = useAllowance(
  //   user.address,
  //   '0xc9c07a4526915014bc60791fca2eef51975a3694',
  //   'removeLiquidity',
  // )
  const removeAproval = async () => {
    // console.log('send approval to metamask')
    // // console.log('wait for approval....', userApproval)
    // const rm = () => {
    //   const contractInstance = new Contract(
    //     '0xc9c07a4526915014bc60791fca2eef51975a3694',
    //     contractABI,
    //     concaveProvider(chain.ropsten.id),
    //   )
    //   const contractSigner = contractInstance.connect(data)
    //   console.log('signer rm', contractSigner)
    //   return null
    // }
    // rm()
    // setApproved(true)
    // return console.log('removed approved!!!')
  }

  const confirmedWithdrawal = () => {
    console.log('send tx to metamask')
    // useRemoveLiquidity
    // useRemoveLiquidity()
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
const useViewLiquidity = async ({
  userAddress,
  percentToRemove,
}: {
  percentToRemove: number
  userAddress: string
}) => {
  // const provider = concaveProvider(chain.ropsten.id)
  // const gemFactory = new ethers.Contract(
  //   ContractAddress['ropstenFactory'],
  //   gemFactoryABI,
  //   provider,
  // )
  // let length = await gemFactory.allPairsLength().catch((e) => {
  //   console.log(e)
  // })
  // let parse = typeof length == 'object' ? length.toString() : 0
  // for (let i = 0; i < parse; i++) {
  //   const pairAddress = await gemFactory.allPairs(i).catch(() => {})
  //   // pairAddress
  //   // provider.getBalance(userAddress, )
  // }
  // return {}
}

// const AddLiquidityModal = ({
//   disclosure,
//   userAddress,
// }: {
//   disclosure: UseDisclosureReturn
//   userAddress: string
// }) => {
//   return (
//     <Modal
//       bluryOverlay={true}
//       title="Add Liquidity"
//       isOpen={disclosure.isOpen}
//       onClose={disclosure.onClose}
//       isCentered
//       size={'xl'}
//       bodyProps={{
//         gap: 4,
//         shadow: 'Up for Blocks',
//       }}
//     >
//       <AddLiquidityContent userAddress={userAddress} />
//     </Modal>
//   )
// }

const SupplyLiquidityModal = ({
  disclosure,
  data,
  onConfirm = () => {},
}: {
  disclosure: UseDisclosureReturn
  data: UseAddLiquidityData
  onConfirm: () => void
}) => {
  const { tokenA, tokenB, amountADesired, amountBDesired, userAddress } = data
  const [needsApproveA, requestApproveA, loadingApproveA] = useApprovalWhenNeeded(
    tokenA,
    '0xc9c07a4526915014bc60791fca2eef51975a3694',
    userAddress,
    amountADesired.toExact(),
  )
  const [needsApproveB, requestApproveB, loadingApproveB] = useApprovalWhenNeeded(
    tokenB,
    '0xc9c07a4526915014bc60791fca2eef51975a3694',
    userAddress,
    amountBDesired.toExact(),
  )

  return (
    <Modal
      bluryOverlay={true}
      title="Supply"
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      isCentered
      size={'xl'}
      bodyProps={{
        gap: 6,
        shadow: 'Up for Blocks',
      }}
    >
      <Text fontSize="3xl">
        {tokenA.symbol}/{tokenB.symbol} Pool Tokens
      </Text>
      <HStack justifyContent={'center'}>
        <CurrencyIcon currency={tokenA} />
        <CurrencyIcon currency={tokenB} />
      </HStack>
      <Box borderRadius={'2xl'} p={6} shadow={'down'}>
        <PositionInfoItem
          label="Rates"
          value={`1  ${tokenA.symbol} =  ${
            1 // usePrecision(wrapperTokenA.price / wrapperTokenB.price).formatted
          } ${tokenB.symbol}`}
        />
        <PositionInfoItem
          label=""
          value={`1  ${tokenB.symbol} =  ${
            1 // usePrecision(wrapperTokenB.price / wrapperTokenA.price).formatted
          } ${tokenA.symbol}`}
        />
        <PositionInfoItem
          mt={8}
          color={'text.low'}
          label={`${tokenA.symbol} Deposited`}
          value={`${amountADesired.toExact()} ${tokenA.symbol}`}
        />
        <PositionInfoItem
          color={'text.low'}
          label={`${tokenB.symbol} Deposited`}
          value={`${amountBDesired.toExact()} ${tokenB.symbol}`}
        />
        <PositionInfoItem color={'text.low'} label="Share Pool" value={'2.786%'} />
      </Box>
      {needsApproveA && (
        <Button mt={2} p={6} fontSize={'2xl'} variant={'primary'} onClick={() => requestApproveA()}>
          {!loadingApproveA
            ? `Approve to use ${amountADesired.toExact()} ${tokenA.symbol}`
            : 'approving'}
        </Button>
      )}
      {needsApproveB && (
        <Button mt={2} p={6} fontSize={'2xl'} variant={'primary'} onClick={() => requestApproveB()}>
          {!loadingApproveB
            ? `Approve to use ${amountBDesired.toExact()} ${tokenB.symbol}`
            : 'approving'}
        </Button>
      )}
      {!needsApproveA && !needsApproveA && (
        <Button mt={2} p={6} fontSize={'2xl'} variant={'primary'} onClick={onConfirm}>
          Confirm Supply
        </Button>
      )}
    </Modal>
  )
}

const AddLiquidityContent = ({ userAddress }: { userAddress: string }) => {
  const supplyLiquidityModal = useDisclosure()
  const [data, setters, call, clear] = useAddLiquidity(chain.ropsten, userAddress)
  const { amountADesired, amountBDesired, tokenA, tokenB } = data
  const { setAmountADesired, setTokenA, setTokenB, setAmountBDesired } = setters
  const valid = tokenA && tokenB && amountADesired && amountBDesired
  const [{ data: balanceA }] = useBalance({
    addressOrName: userAddress,
    token: tokenA?.address,
    formatUnits: tokenA?.decimals,
  })
  const [{ data: balanceB }] = useBalance({
    addressOrName: userAddress,
    token: tokenB?.address,
    formatUnits: tokenB?.decimals,
  })

  return (
    <>
      <Card variant="secondary" p={4} backgroundBlendMode={'screen'}>
        <Text fontSize="lg">
          Tip: When you add liquidity, you will receive pool tokens representing your position.
          These tokens automatically earn fees proportional to your share of the pool, and can be
          redeemed at any time.
        </Text>
      </Card>
      <Flex direction={'column'} p={4} gap={2}>
        <TokenInput
          currencyAmount={amountADesired}
          currency={tokenA}
          onChangeValue={(value) => {
            setAmountADesired(parseInputAmount(value, tokenA))
          }}
          onSelectCurrency={(token) => {
            setTokenA(token)
          }}
        >
          <HStack></HStack>
        </TokenInput>
        <Flex align="center" justify="center">
          <Button
            shadow={'Up Small'}
            _focus={{ boxShadow: 'Up Small' }}
            bgColor="rgba(156, 156, 156, 0.01);"
            w={'34px'}
            h={'30px'}
            onClickCapture={console.log}
            borderRadius={'full'}
          >
            <PlusIcon />
          </Button>
        </Flex>
        <TokenInput
          currencyAmount={amountBDesired}
          currency={tokenB}
          onChangeValue={(value) => {
            setAmountBDesired(parseInputAmount(value, tokenB))
          }}
          onSelectCurrency={(token) => {
            setTokenB(token)
          }}
        >
          <HStack></HStack>
        </TokenInput>
      </Flex>
      <Button
        h={'50px'}
        p={4}
        shadow={'Up Small'}
        _focus={{
          shadow: 'Up Small',
        }}
        isDisabled={!valid}
        bg={'rgba(113, 113, 113, 0.01)'}
      >
        <Text
          fontSize={'2xl'}
          onClick={() => {
            console.log('open modal')
            supplyLiquidityModal.onOpen()
          }}
        >
          Add Liquidity
        </Text>
      </Button>

      {valid ? (
        <SupplyLiquidityModal disclosure={supplyLiquidityModal} data={data} onConfirm={call} />
      ) : (
        <></>
      )}
      {data?.hash ? (
        <TransactionSubmittedModal
          disclosure={supplyLiquidityModal}
          hash={data.hash}
          onClose={clear}
        />
      ) : (
        <></>
      )}
    </>
  )
}

const MyPositions = ({ account }) => {
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

export default function PositionsView() {
  const [{ data: account }] = useAccount()
  const router = useRouter()
  const { operation } = router.query
  console.log(account)
  if (!account) {
    return <Text>Please, login</Text>
  }

  if (operation === 'addLiquidity') {
    return (
      <View title="Add liquidity">
        <Card variant="primary" p={4} w={'500px'} gap={4} shadow={'Up for Blocks'}>
          <AddLiquidityContent userAddress={account.address} />
        </Card>
      </View>
    )
  }

  return (
    <View title="My Liquidity Position">
      <MyPositions account={account} />
    </View>
  )
}

const View = ({ title, children }) => {
  return (
    <Flex maxW="container.md" direction="column" justifyContent="center" h="full" gap={6}>
      <Heading fontSize="2xl">{title}</Heading>
      {children}
    </Flex>
  )
}
