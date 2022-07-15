import { CNV, Currency, CurrencyAmount, STAKING_CONTRACT } from '@concave/core'
import { Box, Button, Flex, HStack, Input, NumericInput, Text, VStack } from '@concave/ui'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { ChooseButton } from 'components/Marketplace/ChooseButton'
import { BigNumber } from 'ethers'
import { verifyTypedData } from 'ethers/lib/utils'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { truncateNumber } from 'utils/truncateNumber'
import { useAccount, useSignTypedData } from 'wagmi'

import { UserMarketInfoState } from './LockPosition/MarketLockInfo/useMarketPlaceInfo'

type UserListPositionCardProps = { marketItemState: UserMarketInfoState }

type ListForSaleState = ReturnType<typeof useListeForSaleState>

export const useListeForSaleState = ({ marketItemState }: UserListPositionCardProps) => {
  const selectedToken = CNV[marketItemState.chainId]
  const { address: seller } = useAccount()
  const [deadline, setDeadline] = useState(BigNumber.from(Date.now()))
  const [method, setMethod] = useState<'Sale' | 'Auction'>('Sale')
  const [price, setPrice] = useState<CurrencyAmount<Currency>>(
    CurrencyAmount.fromRawAmount(
      selectedToken,
      marketItemState.marketItem.data.position.currentValue.toString(),
    ),
  )
  const value = {
    action: 'LISTING_NFT',
    tokenId: marketItemState.marketItem.data.position.tokenId.toString(),
    buyPrice: BigNumber.from(price.wrapped.numerator.toString()).toString(),
    owner: seller,
    erc20: price.wrapped.currency.address,
    erc721: STAKING_CONTRACT[4],
    amount: '33',
    deadline: '1659139200',
    txHash: '0xEeEEeeEeeeeEeEEeeEeeeeEeEEeeEeeeeEeEEeeE',
  }

  const domain = {
    name: 'nftsupermarket.eth',
    version: '1',
    chainId: 4,
    verifyingContract: '0x67cB8469Ea1F689E149b2c4c245ba47E56cd6041',
  }

  const types = {
    NFT: [
      { name: 'action', type: 'string' },
      { name: 'tokenId', type: 'string' },
      { name: 'buyPrice', type: 'string' },
      { name: 'owner', type: 'string' },
      { name: 'erc20', type: 'string' },
      { name: 'amount', type: 'string' },
      { name: 'erc721', type: 'string' },
      { name: 'txHash', type: 'string' },
      { name: 'deadline', type: 'string' },
    ],
  }

  const { signTypedDataAsync } = useSignTypedData({
    types,
    domain,
    value,
  })

  const create = () => {
    console.log
    console.log({
      types,
      domain,
      value,
    })
    signTypedDataAsync()
      .then(async (data) => {
        console.log('data', data)
        const signature = data.substring(2)
        console.log('signature', signature)
        const r = `0x${signature.substring(0, 64)}`
        const s = `0x${signature.substring(64, 128)}`
        const v = parseInt(signature.substring(128, 130), 16)
        const signerAddress = verifyTypedData(domain, types, value, {
          r,
          s,
          v,
        })
        console.log('signerAddress', signerAddress)
        console.log({
          r,
          s,
          v,
        })
      })
      .catch(console.error)
  }

  const handleMethod = () => {
    /**
     * Uncomment to enable auctions
     * setMethod((old) => (old === 'Auction' ? 'Sale' : 'Auction'))
     */
  }

  return {
    method,
    setDeadline,
    deadline,
    position: marketItemState.marketItem.data.position,
    marketItem: marketItemState.marketItem.data,
    price,
    setPrice,
    handleMethod,
    create,
  }
}

export const ListPositionForSale = ({
  listForSaleState,
}: {
  listForSaleState: ListForSaleState
}) => {
  console.log(`ListPositionForSale`)
  return (
    <VStack direction={'column'} gap={1} pt={8} px={8} pb={0}>
      <Type state={listForSaleState} />
      <Info
        label="Current value:"
        value={truncateNumber(listForSaleState.position.currentValue)}
      ></Info>

      <CurrencySelector state={listForSaleState}></CurrencySelector>
      <BuyNowPrice state={listForSaleState} />
      <ListenPrice state={listForSaleState} />
      <Deadline state={listForSaleState} />
      {/* <Info
        label="Discount:"
        value={
          ``
          // formatFixed(
          //   listForSaleState.offer.calculateDiscount?.(listForSaleState.marketItem.position),
          //   { decimals: 2 },
          // ) + '%'
        }
      ></Info> */}

      {/* {!listForSaleState.offer.isValid && (
        <Text mr="auto" fontSize="sm" color="#c32417" fontWeight="medium">
          {listForSaleState.method === 'Sale' ? 'Invalid sell price' : 'Invalid reserve price'}
        </Text>
      )} */}
      <Flex pt={4} justifyContent="center">
        <ChooseButton
          onClick={listForSaleState.create}
          // disabled={!listForSaleState.offer.isValid}
          title={`List`}
          backgroundType="blue"
        />
      </Flex>
    </VStack>
  )
}

const Deadline = (props: { state: ListForSaleState }) => {
  const { marketItem, setPrice } = props.state
  const chainId = useCurrentSupportedNetworkId()
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        Deadline:
      </Text>
      <Box width={'full'}>
        <Input
          width={'full'}
          height={'30px'}
          padding={2}
          borderRadius="full"
          type="date"
          onChange={({ target }) => {
            props.state.setDeadline(
              BigNumber.from(`` + (target.valueAsDate.getTime() / 1000).toPrecision()),
            )
          }}
        ></Input>
      </Box>
    </HStack>
  )
}
const Type = ({ state }: { state: ListForSaleState }) => {
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} width={'full'} textAlign={'right'} fontWeight="bold">
        Type:
      </Text>
      <Box width={'full'}>
        <Button
          width={'110px'}
          height={'30px'}
          shadow={'Up Small'}
          onClick={state.handleMethod}
          rounded={'2xl'}
          fontWeight="bold"
          cursor={'not-allowed'}
        >
          {state.method}
        </Button>
      </Box>
    </HStack>
  )
}

const ListenPrice = (props: { state: ListForSaleState }) => {
  const { marketItem, setPrice } = props.state
  const chainId = useCurrentSupportedNetworkId()
  if (props.state.method === 'Sale') {
    return <></>
  }
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        Starting price:
      </Text>
      <Box width={'full'}>
        <NumericInput
          width={'full'}
          shadow={'Down Big'}
          borderRadius={'full'}
          p={1}
          pl={4}
          onValueChange={(values, sourceInfo) => {
            if (sourceInfo.source === 'prop') return
            const value = values.value || '0'
            setPrice(toAmount(value, CNV[chainId]))
          }}
        />
      </Box>
    </HStack>
  )
}
const BuyNowPrice = (props: { state: ListForSaleState }) => {
  const { marketItem, setPrice } = props.state
  const chainId = useCurrentSupportedNetworkId()
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        Price:
      </Text>
      <Box width={'full'}>
        <NumericInput
          width={'full'}
          shadow={'Down Big'}
          borderRadius={'full'}
          value={props.state.price.toSignificant(5)}
          p={1}
          pl={4}
          onValueChange={(values, sourceInfo) => {
            if (sourceInfo.source === 'prop') return
            const value = values.value || '0'
            setPrice(toAmount(value, props.state.price.currency))
          }}
        />
      </Box>
    </HStack>
  )
}
const CurrencySelector = (props: { state: ListForSaleState }) => {
  const { marketItem, setPrice } = props.state
  const chainId = useCurrentSupportedNetworkId()
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        Currency:
      </Text>
      <Box width={'full'}>
        <SelectAMMCurrency
          selected={props.state.price.currency}
          onSelect={(token) => {
            props.state.setPrice(CurrencyAmount.fromRawAmount(token, `0`))
          }}
        ></SelectAMMCurrency>
      </Box>
    </HStack>
  )
}

const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        {label}
      </Text>

      <Box width={'full'}>
        <Flex
          width={'full'}
          // shadow={'Up Small'}
          borderRadius={'full'}
          p={1}
          pl={4}
          align="center"
          fontWeight="bold"
        >
          {value}
        </Flex>
      </Box>
    </HStack>
  )
}
