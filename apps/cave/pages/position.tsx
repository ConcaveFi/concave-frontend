import { ExpandArrowIcon, PlusIcon, TokenIcon } from '@concave/icons'
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
import { Pair } from '@uniswap/v2-sdk'
import { MaxAmount } from 'components/Swap/MaxAmount'
import { TokenInput } from 'components/Swap/TokenInput'
import { useAuth } from 'contexts/AuthContext'
import { BigNumberish, Contract } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { useAllowance } from 'hooks/useAllowance'
import { usePrecision } from 'hooks/usePrecision'
import { contractABI } from 'lib/contractoABI'
import { concaveProvider2 } from 'lib/providers'
import { AvailableTokens, TokenType } from 'lib/tokens'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
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

const PositionInfoItem = ({ label, value, children = <></> }) => (
  <Flex justify="space-between" align={'center'}>
    <Text>{label}</Text>
    <HStack gap={2} align={'center'} alignContent={'center'}>
      <Text>{value}</Text>
      {children}
    </HStack>
  </Flex>
)

interface LPPosition {
  pair?: Pair
  ownedAmount: BigNumberish
}

const LPPositionItem = ({ pair, ownedAmount }: LPPosition) => {
  const addLiquidity = useDisclosure()
  const removeLiquidity = useDisclosure()
  const router = useRouter()
  const { operation } = router.query
  const { user } = useAuth()
  let userAddress
  user ? (userAddress = user.address) : ''

  // <RemoveLiquidity />
  // <AddLiquidity />

  return (
    <>
      <AccordionItem p={2} shadow="Up Big" borderRadius="2xl" alignItems="center">
        <AccordionButton>
          <TokenIcon logoURI="/assets/tokens/gcnv.svg" symbol="CNV" />
          <TokenIcon logoURI="/assets/tokens/xmr.svg" symbol="XMR" />
          <Text ml="24px" fontWeight="semibold" fontSize="lg">
            XMR/gCNV
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
            <PositionInfoItem label="Your total pool tokens:" value={ownedAmount.toString()} />
            <PositionInfoItem label={`Pooled ${'XMR'}:`} value={'0.0001331'}>
              <TokenIcon size="sm" logoURI="/assets/tokens/xmr.svg" symbol="XMR" />
            </PositionInfoItem>
            <PositionInfoItem label={`Pooled ${'gCNV'}:`} value={'325.744'}>
              <TokenIcon size="sm" logoURI="/assets/tokens/gcnv.svg" symbol="gCNV" />
            </PositionInfoItem>
            <PositionInfoItem label="Your pool share:" value={'2.79%'} />
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
      <RemoveLiquidityModal disclosure={removeLiquidity} />
      <AddLiquidityModal disclosure={addLiquidity} userAddress={userAddress} />
    </>
  )
}

const RemoveLiquidityModal = ({ disclosure }: { disclosure: UseDisclosureReturn }) => {
  const [percentToRemove, setPercentToRemove] = useState(100)
  const [wrapperTokenA, setTokenA] = useToken({ userAddressOrName: '', symbol: 'FRAX' })
  const [wrapperTokenB, setTokenB] = useToken({ userAddressOrName: '', symbol: 'gCNV' })
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
        onChangeValue={(val) => {
          onChange(val.floatValue)
        }}
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
      <ReceiveBox amount={amountAMin} token={wrapperTokenA} />
      <ReceiveBox amount={amountBMin} token={wrapperTokenB} />
    </HStack>
  )
}

const RemoveLiquidityActions = () => {
  const { user } = useAuth()
  const [approved, setApproved] = useState(false)
  const [{ data, error, loading }, getSigner] = useSigner()
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
        concaveProvider2(chain.ropsten.id),
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
      <Button disabled={!approved} w={250} variant={'primary'} onclick={confirmedWithdrawal}>
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
        <TokenIcon logoURI={wrapperTokenA.token?.logoURI} symbol={wrapperTokenA.token?.symbol} />
        <TokenIcon logoURI={wrapperTokenB.token?.logoURI} symbol={wrapperTokenB.token?.symbol} />
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
        <PositionInfoItem label={wrapperTokenA.token?.symbol} value={'0.0001331'}>
          <TokenIcon
            size="sm"
            logoURI={wrapperTokenA.token?.logoURI}
            symbol={wrapperTokenA.token?.symbol}
          />
        </PositionInfoItem>
        <PositionInfoItem label={wrapperTokenB.token?.symbol} value={'325.744'}>
          <TokenIcon
            size="sm"
            logoURI={wrapperTokenB.token?.logoURI}
            symbol={wrapperTokenB.token?.symbol}
          />
        </PositionInfoItem>
      </Stack>
    </Flex>
  )
}

const ReceiveBox = ({ amount, token }: { amount: number; token: TokenType }) => {
  return (
    <HStack shadow="down" borderRadius="2xl" p={3}>
      <TokenIcon logoURI={token.logoURI} symbol={token.symbol} />
      <Box>
        <Text fontFamily={'heading'} fontWeight={600}>
          {usePrecision(amount, 7).formatted}
        </Text>
        <Text title={token.name} fontWeight={700} fontSize={'sm'} color={'text.low'}>
          {token.symbol}
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
  const [deadline, setDeadLine] = useState(new Date().getTime() / 1000 + 15 * 60)
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
const AddLiquidityContent = ({ userAddress }: { userAddress: string }) => {
  const [wrapperTokenA, setTokenA] = useToken({ userAddressOrName: userAddress, symbol: 'DAI' })
  const [wrapperTokenB, setTokenB] = useToken({ userAddressOrName: userAddress, symbol: 'FRAX' })
  const [amountADesired, setAmountADesired] = useState<number>(null)
  const [amountBDesired, setAmountBDesired] = useState<number>(null)
  const [{ data, error, loading }, getSigner] = useSigner()

  const addLiquidity = () => {
    const contractInstance = new Contract(
      '0xB11DDDf6F32eFc7d903802631CFc06EC400AB6e8',
      contractABI,
      concaveProvider2(chain.ropsten.id),
    )
    const contractSigner = contractInstance.connect(data)
    const to = userAddress
    const deadLine = new Date().getTime() + 30 * 60
    const tokenA = wrapperTokenA.token.address
    const tokenB = wrapperTokenB.token.address
    const amountADesired = parseUnits('11', 18).toString()
    const amountBDesired = parseUnits('11', 18).toString()
    const amountAMin = parseUnits('10', 18).toString()
    const amountBMin = parseUnits('10', 18).toString()
    console.table({
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      to,
      deadLine,
    })

    contractSigner.addLiquidity(
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      to,
      deadLine,
      {
        gasLimit: 100000,
        // nonce: nonce || undefined,
      },
    )
  }
  // TODO

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
          price={wrapperTokenA.price}
          selected={wrapperTokenA.token}
          onChangeValue={(value) => {
            setAmountADesired(value)
          }}
          onSelectToken={(token) => {
            setTokenA(token.symbol)
          }}
        >
          <MaxAmount
            label="Balance:"
            max={+wrapperTokenA.balance?.formatted}
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
          price={wrapperTokenB.price}
          selected={wrapperTokenB.token}
          onChangeValue={(value) => {
            setAmountBDesired(value)
          }}
          onSelectToken={(token) => {
            setTokenB(token.symbol)
          }}
        >
          {wrapperTokenB.token?.symbol && (
            <MaxAmount
              label="Balance:"
              max={+wrapperTokenB.balance?.formatted}
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
        bg={'rgba(113, 113, 113, 0.01)'}
      >
        <Text
          fontSize={'2xl'}
          onClick={() => {
            addLiquidity()
          }}
        >
          Add Liquidity
        </Text>
      </Button>
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
            <LPPositionItem ownedAmount={'0.013'} />
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
