import { Currency, FIXED_ORDER_MARKET_CONTRACT } from '@concave/core'
import { FixedOrderMarketContract, MarketItem, StakingPosition } from '@concave/marketplace'
import { Box, Button, Flex, HStack, Modal, Text, VStack } from '@concave/ui'
import { SelectMarketCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { ChooseButton } from 'components/Marketplace/ChooseButton'
import { BigNumber, BigNumberish } from 'ethers'
import { concaveProvider } from 'lib/providers'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { formatFixed } from 'utils/formatFixed'
import { chain, useSignTypedData } from 'wagmi'
import { BigNumberField } from './BigNumberField'
import { ConfirmSignature } from './ConfirmSignature'
import { ConfirmUnlist } from './ConfirmUnlist'
import { EpochDateField } from './EpochDateField'
import { Info } from './Info'
import { usePositionDiscount } from './usePositionDiscount'

type ListForSaleState = ReturnType<typeof useListeForSaleState>

export const SaleModal = ({
  market,
  staking,
  state,
  setMarket,
  onClose,
}: {
  onClose: VoidFunction
  staking: StakingPosition
  market: MarketItem
  state: `` | 'list' | 'unlist'
  setMarket: Dispatch<SetStateAction<MarketItem>>
}) => {
  const listForSaleState = useListeForSaleState({ market, setMarket })
  return (
    <Modal
      bluryOverlay
      title=""
      size={'xs'}
      isOpen={state != ''}
      onClose={onClose}
      isCentered
      hideClose
      bodyProps={{
        minW: 350,
        p: 0,
        rounded: '2xl',
        shadow: 'up',
        variant: 'primary',
      }}
    >
      {state === 'list' && (
        <ListPositionForSale
          {...listForSaleState}
          onClose={onClose}
          setMarket={setMarket}
          staking={staking}
        />
      )}
      {state === 'unlist' && (
        <ConfirmUnlist
          {...listForSaleState}
          onClose={onClose}
          setMarket={setMarket}
          staking={staking}
        />
      )}
    </Modal>
  )
}

export type UseListeForSaleState = ReturnType<typeof useListeForSaleState>
export const useListeForSaleState = ({
  market,
  setMarket,
}: {
  market: MarketItem
  setMarket: Dispatch<SetStateAction<MarketItem>>
}) => {
  const { signTypedDataAsync } = useSignTypedData({
    domain: {
      name: 'Cavemart',
      version: '1',
      chainId: chain.rinkeby.id,
      verifyingContract: FIXED_ORDER_MARKET_CONTRACT[chain.rinkeby.id],
    },
    types: {
      Swap: [
        { name: 'seller', type: 'address' },
        { name: 'erc721', type: 'address' },
        { name: 'erc20', type: 'address' },
        { name: 'tokenId', type: 'uint256' },
        { name: 'startPrice', type: 'uint256' },
        { name: 'endPrice', type: 'uint256' },
        { name: 'start', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ],
    },
    value: {
      seller: market.seller,
      erc721: market.erc721,
      erc20: market.erc20,
      tokenId: market.tokenId.toString(),
      startPrice: market.startPrice.toString(),
      endPrice: market.endPrice.toString(),
      start: market.start.toString(),
      deadline: market.deadline.toString(),
    },
  })

  const create = async () => {
    try {
      const data = await signTypedDataAsync()
      const signature = data.substring(2)
      const cavemart = new FixedOrderMarketContract(concaveProvider(chain.rinkeby.id))
      const computedSigner = await cavemart.computeSigner(market.new({ signature }))
      if (computedSigner !== market.seller) {
        throw `Invalid signature`
      }
      setMarket(market.new({ signature }))
    } catch (e) {
      console.error(e)
    }
  }
  const setCurrency = useCallback((currency: Currency) => setMarket((m) => m.new({ currency })), [])

  const setPrice = useCallback(
    (startPrice: BigNumber) => setMarket((m) => m.new({ startPrice })),
    [],
  )
  const setDeadline = useCallback(
    (deadline: BigNumberish) => setMarket((m) => m.new({ deadline })),
    [],
  )

  return {
    market,
    create,
    setCurrency,
    setPrice,
    setDeadline,
  }
}

export const ListPositionForSale = ({
  market,
  staking,
  setMarket,
  onClose,
  create,
  setCurrency,
  setPrice,
  setDeadline,
}: ListForSaleState & {
  staking: StakingPosition
  onClose: VoidFunction
  setMarket: Dispatch<SetStateAction<MarketItem>>
}) => {
  const discount = usePositionDiscount(staking, market)

  if (market.signature) {
    return (
      <ConfirmSignature market={market} staking={staking} setMarket={setMarket} onClose={onClose} />
    )
  }
  return (
    <VStack direction={'column'} gap={1} pt={8} px={8} pb={0}>
      <Type />
      <Info label="Current value:" value={formatFixed(staking.currentValue) + ' CNV'}></Info>
      <CurrencySelector value={market.currency} onChange={setCurrency} />
      <BigNumberField
        label="Price:"
        currency={market.currency}
        defaultValue={staking.currentValue}
        onChange={setPrice}
        decimalScale={4}
      />
      <EpochDateField
        label="Deadline:"
        onChange={setDeadline}
        minDate={Date.now() / 1000}
        maxDate={staking.maturity}
        date={market.deadline.toNumber()}
      />
      {discount.isSuccess && (
        <Info
          label="Discount:"
          value={formatFixed(discount.discount, { decimals: 2 }) + '%'}
        ></Info>
      )}
      <Flex pt={4} justifyContent="center">
        <ChooseButton onClick={create} title={`List`} backgroundType="blue" />
      </Flex>
    </VStack>
  )
}
const Type = () => {
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
          rounded={'2xl'}
          fontWeight="bold"
          cursor={'not-allowed'}
        >
          Sale
        </Button>
      </Box>
    </HStack>
  )
}

const CurrencySelector = ({
  value,
  onChange,
}: {
  value: Currency
  onChange: (currency: Currency) => void
}) => {
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        Currency:
      </Text>
      <Box width={'full'}>
        <SelectMarketCurrency selected={value} onSelect={onChange} />
      </Box>
    </HStack>
  )
}
