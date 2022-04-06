import { ExpandArrowIcon, PlusIcon, CurrencyIcon } from '@concave/icons'
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
import { useTokenList } from 'components/Swap/hooks/useTokenList'
import { TokenBalance } from 'components/Swap/TokenBalance'
import { TokenInput } from 'components/Swap/TokenInput'
import { useAuth } from 'contexts/AuthContext'
import { BigNumberish, Contract } from 'ethers'
import { useAddLiquidity, UseAddLiquidityData } from 'hooks/useAddLiquidity'
import { useApprovalWhenNeeded } from 'hooks/useAllowance'
import { usePrecision } from 'hooks/usePrecision'
import { contractABI } from 'lib/contractoABI'
import { concaveProvider } from 'lib/providers'
import { TokenType } from 'lib/tokens'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { chain, useSigner } from 'wagmi'
import { useToken, WrapperTokenInfo } from '../components/Swap/useSwap'

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
  pair?: { tokenA: string; tokenB: string; liquidityAddress: string }
  ownedAmount: BigNumberish
}

const LPPositionItem = ({ pair, ownedAmount }: LPPosition) => {
  const tokens = useTokenList()
  const [tokenA, setTokenA] = useState<TokenType>(null)
  const [tokenB, setTokenB] = useState<TokenType>(null)

  useEffect(() => {
    if (!tokens.isSuccess) {
      return
    }
    setTokenA(tokens.data.find((t: any) => t.address.toLowerCase() === pair?.tokenA.toLowerCase()))
    setTokenB(tokens.data.find((t: any) => t.address.toLowerCase() === pair?.tokenB.toLowerCase()))
  }, [pair, pair?.tokenA, pair.tokenB, tokens.data, tokens.isSuccess])

  const addLiquidity = useDisclosure()
  const removeLiquidity = useDisclosure()
  const { user, isConnected } = useAuth()
  if (!tokenA || !tokenB || !isConnected) {
    return <></>
  }

  return (
    <>
      <AccordionItem p={2} shadow="Up Big" borderRadius="2xl" alignItems="center">
        <AccordionButton>
          {/* <CurrencyIcon {...tokenA} />
          <CurrencyIcon {...tokenB} /> */}
          <Text ml="24px" fontWeight="semibold" fontSize="lg">
            {tokenA.symbol}/{tokenB.symbol}
          </Text>
          <Button
            variant="secondary"
            borderRadius="full"
            px={4}
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
            {/* <PositionInfoItem label="Your total pool tokens:" value={ownedAmount.toString()} /> */}
            {/* <PositionInfoItem label={`Pooled ${tokenA.symbol}:`} value={'0.0001331'}>
              <CurrencyIcon size={'sm'} {...tokenA} />
            </PositionInfoItem>
            <PositionInfoItem label={`Pooled ${tokenB.symbol}:`} value={'325.744'}>
              <CurrencyIcon size="sm" {...tokenB} />
            </PositionInfoItem>
            <PositionInfoItem label="Your pool share:" value={'2.79%'} /> */}
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
        userAddressOrName={user.address}
        disclosure={removeLiquidity}
        tokenA={tokenA}
        tokenB={tokenB}
      />
      <AddLiquidityModal disclosure={addLiquidity} userAddress={user.address} />
    </>
  )
}

const RemoveLiquidityModal = ({
  disclosure,
  userAddressOrName,
  tokenA,
  tokenB,
}: {
  userAddressOrName: string
  tokenA: TokenType
  tokenB: TokenType
  disclosure: UseDisclosureReturn
}) => {
  const [percentToRemove, setPercentToRemove] = useState(0)
  const [wrapperTokenA] = useToken({ userAddressOrName, symbol: tokenA.symbol })
  const [wrapperTokenB] = useToken({ userAddressOrName, symbol: tokenB.symbol })
  const removeLiquidityState = useRemoveLiquidity({
    wrapperTokenA,
    wrapperTokenB,
    amountTokenA: 0.0001331,
    amountTokenB: 325.744,
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
  wrapperTokenA,
  wrapperTokenB,
  amountAMin,
  amountBMin,
}: {
  amountAMin: number
  amountBMin: number
  wrapperTokenA: WrapperTokenInfo
  wrapperTokenB: WrapperTokenInfo
}) => {
  return (
    <HStack gap={7} shadow="Up Big" px={6} py={3} borderRadius="2xl" align="center">
      <Box>
        <Text>You will receive:</Text>
        <Text fontWeight={400} fontStyle={'md'} color={'#2E97E2'} fontSize={'14px'}>
          You will receive:
        </Text>
      </Box>
      <ReceiveBox amount={amountAMin} token={wrapperTokenA.token} />
      <ReceiveBox amount={amountBMin} token={wrapperTokenB.token} />
    </HStack>
  )
}

const RemoveLiquidityActions = () => {
  // const { user } = useAuth()
  const [approved] = useState(false)
  const [{ data }] = useSigner()
  // const userApproval = useAllowance(
  //   user.address,
  //   '0x95dDC411d31bBeDd37e9aaABb335b0951Bc2D25a',
  //   'removeLiquidity',
  // )
  const removeAproval = async () => {
    console.log('send approval to metamask')
    // console.log('wait for approval....', userApproval)
    const rm = () => {
      const contractInstance = new Contract(
        '0x95dDC411d31bBeDd37e9aaABb335b0951Bc2D25a',
        contractABI,
        concaveProvider(chain.ropsten.id),
      )
      const contractSigner = contractInstance.connect(data)
      console.log('signer rm', contractSigner)
      return null
    }
    rm()
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

const YourPosition = ({
  wrapperTokenA,
  wrapperTokenB,
}: {
  wrapperTokenA: WrapperTokenInfo
  wrapperTokenB: WrapperTokenInfo
}) => {
  return (
    <Flex gap={7} direction={'column'} shadow="Up Big" px={4} py={4} borderRadius="2xl">
      <Text fontSize={'lg'}>Your Position</Text>
      <Flex gap={2} align={'center'}>
        {/* <CurrencyIcon
          size={'sm'}
          logoURI={wrapperTokenA.token?.logoURI}
          symbol={wrapperTokenA.token?.symbol}
        />
        <CurrencyIcon
          size={'sm'}
          logoURI={wrapperTokenB.token?.logoURI}
          symbol={wrapperTokenB.token?.symbol}
        /> */}
        <Text px={4}>
          {wrapperTokenA.token?.symbol}/{wrapperTokenB.token?.symbol}
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
        {/* <PositionInfoItem label={wrapperTokenA.token?.symbol} value={'0.0001331'}> */}
        {/* <CurrencyIcon
            size={'sm'}
            logoURI={wrapperTokenA.token?.logoURI}
            symbol={wrapperTokenA.token?.symbol}
          /> */}
        {/* </PositionInfoItem> */}
        {/* <PositionInfoItem label={wrapperTokenB.token?.symbol} value={'325.744'}> */}
        {/* <CurrencyIcon
            size={'sm'}
            logoURI={wrapperTokenB.token?.logoURI}
            symbol={wrapperTokenB.token?.symbol}
          /> */}
        {/* </PositionInfoItem> */}
      </Stack>
    </Flex>
  )
}

const ReceiveBox = ({ amount, token }: { amount: number; token: TokenType }) => {
  return (
    <HStack shadow="down" borderRadius="2xl" p={3}>
      {/* <CurrencyIcon logoURI={token?.logoURI} symbol={token?.symbol} /> */}
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

const useRemoveLiquidity = ({
  wrapperTokenA,
  amountTokenA,
  wrapperTokenB,
  amountTokenB,
  percentToRemove,
}: {
  percentToRemove: number
  wrapperTokenA: WrapperTokenInfo
  amountTokenA: number
  amountTokenB: number
  wrapperTokenB: WrapperTokenInfo
}) => {
  const to = ''
  const ratioToRemove = Math.min(percentToRemove, 100) / 100
  const [liquidity, setLiquidity] = useState(0)
  const amountAMin = amountTokenA * ratioToRemove
  const amountBMin = amountTokenB * ratioToRemove
  const [deadline] = useState(new Date().getTime() / 1000 + 15 * 60)
  // const [{ data, error, loading }, getSigner] = useSigner()
  return {
    wrapperTokenA,
    wrapperTokenB,
    liquidity,
    amountAMin,
    amountBMin,
    deadline,
  }
}

const AddLiquidityModal = ({
  disclosure,
  userAddress,
}: {
  disclosure: UseDisclosureReturn
  userAddress: string
}) => {
  return (
    <Modal
      bluryOverlay={true}
      title="Add Liquidity"
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      isCentered
      size={'xl'}
      bodyProps={{
        gap: 4,
        shadow: 'Up for Blocks',
      }}
    >
      <AddLiquidityContent userAddress={userAddress} />
    </Modal>
  )
}

const SupplyLiquidityModal = ({
  disclosure,
  data,
  onConfirm = () => {},
}: {
  disclosure: UseDisclosureReturn
  data: UseAddLiquidityData
  onConfirm: () => void
}) => {
  const { wrapperTokenA, wrapperTokenB, amountADesired, amountBDesired, userAddress } = data

  const [needsApproveA, requestApproveA, loadingApproveA] = useApprovalWhenNeeded(
    wrapperTokenA.token,
    '', // TODO who is the spender ??
    // chain.ropsten.id,
    userAddress,
    amountADesired.toString(),
  )
  console.log('loadingApproveA', loadingApproveA)
  const [needsApproveB, requestApproveB, loadingApproveB] = useApprovalWhenNeeded(
    wrapperTokenB.token,
    '', // TODO who is the spender ??
    // chain.ropsten.id,
    userAddress,
    amountBDesired.toString(),
  )
  //
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
        {wrapperTokenA.token.symbol}/{wrapperTokenB.token.symbol} Pool Tokens
      </Text>
      <HStack justifyContent={'center'}>
        {/* <CurrencyIcon {...wrapperTokenA.token}></CurrencyIcon>
        <CurrencyIcon {...wrapperTokenB.token}></CurrencyIcon> */}
      </HStack>
      <Box borderRadius={'2xl'} p={6} shadow={'down'}>
        {/* <PositionInfoItem
          label="Rates"
          value={`1  ${wrapperTokenA.token.symbol} =  ${
            usePrecision(wrapperTokenA.price / wrapperTokenB.price).formatted
          } ${wrapperTokenB.token.symbol}`}
        />
        <PositionInfoItem
          label=""
          value={`1  ${wrapperTokenB.token.symbol} =  ${
            usePrecision(wrapperTokenB.price / wrapperTokenA.price).formatted
          } ${wrapperTokenA.token.symbol}`}
        />
        <PositionInfoItem
          mt={8}
          color={'text.low'}
          label={`${wrapperTokenA.token.symbol} Deposited`}
          value={`${amountADesired} ${wrapperTokenA.token.symbol}`}
        />
        <PositionInfoItem
          color={'text.low'}
          label={`${wrapperTokenB.token.symbol} Deposited`}
          value={`${usePrecision(amountBDesired).formatted} ${wrapperTokenB.token.symbol}`}
        />
        <PositionInfoItem color={'text.low'} label="Share Pool" value={'2.786%'} /> */}
      </Box>
      {needsApproveA && (
        <Button mt={2} p={6} fontSize={'2xl'} variant={'primary'} onClick={() => requestApproveA()}>
          {!loadingApproveA
            ? `Approve to use ${amountADesired} ${wrapperTokenA.token.symbol}`
            : 'approving'}
        </Button>
      )}
      {needsApproveB && (
        <Button mt={2} p={6} fontSize={'2xl'} variant={'primary'} onClick={() => requestApproveB()}>
          {!loadingApproveB
            ? `Approve to use ${amountBDesired} ${wrapperTokenB.token.symbol}`
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
  const [data, setters, call] = useAddLiquidity(chain.ropsten.id, userAddress)
  const { amountADesired, amountBDesired, wrapperTokenA, wrapperTokenB } = data
  const { setAmountADesired, setTokenA, setTokenB, setAmountBDesired } = setters
  const valid = wrapperTokenA.token && wrapperTokenB.token && amountADesired && amountBDesired

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
          value={'' + amountADesired}
          currency={wrapperTokenA.token}
          onChangeValue={(value) => {
            setAmountADesired(+value)
          }}
          onChangeCurrency={(token) => {
            setTokenA(token.symbol)
          }}
          balance={'1'}
          stable={'1'}
        >
          <TokenBalance
            value={wrapperTokenA.balance?.formatted}
            onClick={() => {
              setAmountADesired(+wrapperTokenA.balance?.formatted)
            }}
          />
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
          value={'' + amountBDesired}
          currency={wrapperTokenB.token}
          onChangeValue={(value) => {
            setAmountBDesired(+value)
          }}
          onChangeCurrency={(token) => {
            setTokenB(token.symbol)
          }}
          balance={'1'}
          stable={'1'}
        >
          {wrapperTokenB.token?.symbol && (
            <TokenBalance
              value={wrapperTokenB.balance?.formatted}
              onClick={() => {
                setAmountBDesired(+wrapperTokenB.balance?.formatted)
              }}
            />
          )}
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
    </>
  )
}

export default function MyPositions() {
  const auth = useAuth()
  const router = useRouter()
  const { operation } = router.query
  if (!auth.isConnected || !auth.user) {
    return <Text>Please, connect</Text>
  }

  const pairs = [
    {
      tokenA: '0xb9ae584F5A775B2F43C79053A7887ACb2F648dD4',
      tokenB: '0x2b8e79cbd58418ce9aeb720baf6b93825b93ef1f',
      liquidityAddress: '0xb14d541123a7f7276F01A22798caDa7eE1D7F57f',
    },
  ]

  if (operation === 'addLiquidity') {
    return (
      <View title="Add liquidity">
        <Card variant="primary" p={4} w={'500px'} gap={4} shadow={'Up for Blocks'}>
          <AddLiquidityContent userAddress={auth.user.address} />
        </Card>
      </View>
    )
  }

  return (
    <View title="My Liquidity Position">
      <>
        <RewardsBanner />
        <Card variant="primary" borderRadius="3xl" p={6} shadow="Up for Blocks">
          <Accordion as={Stack} allowToggle gap={2}>
            {pairs.map((p, i) => {
              return <LPPositionItem key={i} pair={p} ownedAmount={'0.013'} />
            })}
          </Accordion>
        </Card>
      </>
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
