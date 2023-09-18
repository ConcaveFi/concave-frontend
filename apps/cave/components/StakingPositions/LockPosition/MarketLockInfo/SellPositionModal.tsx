import { Currency, DAI, FRAX, MARKETPLACE_CONTRACT, NATIVE, USDC } from '@concave/core'
import { DownIcon } from '@concave/icons'
import { FixedOrderMarketContract, MarketItem, StakingPosition } from '@concave/marketplace'
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  Text,
  VStack,
} from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { ChooseButton } from 'components/Marketplace/ChooseButton'
import { BigNumber, BigNumberish } from 'ethers'
import { useInsert_Marketplace_ListingMutation } from 'graphql/generated/graphql'
import { useApproveForAll } from 'hooks/useApprove'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useState } from 'react'
import { formatFixed } from 'utils/bigNumberMask'
import { Address, useAccount, useProvider, useSignTypedData } from 'wagmi'
import { BigNumberField } from './BigNumberField'
import { ConfirmSignature } from './ConfirmSignature'
import { ConfirmUnlist } from './ConfirmUnlist'
import { EpochDateField } from './EpochDateField'
import { Info } from './Info'

export const SaleModal = ({
  staking,
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: VoidFunction
  staking: StakingPosition
}) => {
  const market = staking.market
  const isListed =
    market?.isListed &&
    market?.signature &&
    market.deadline.gte(0) &&
    market?.deadline.mul(1000).gt(Date.now())

  return (
    <Modal
      bluryOverlay
      title=""
      size={'xs'}
      isOpen={isOpen}
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
      {!isListed && <ListPositionForSale onClose={onClose} staking={staking} />}
      {isListed && <ConfirmUnlist onClose={onClose} staking={staking} />}
    </Modal>
  )
}

export const useListeForSaleState = ({ staking }: { staking: StakingPosition }) => {
  const { address } = useAccount()
  const insertMarketplace = useInsert_Marketplace_ListingMutation()
  const [signature, setSignature] = useState(``)

  const [market, setMarket] = useState(generateDefaultMarket(staking, address))
  const chainId = useCurrentSupportedNetworkId()
  const { signTypedDataAsync, isLoading } = useSignTypedData({
    domain: {
      name: 'Marketplace',
      version: '1',
      chainId,
      verifyingContract: MARKETPLACE_CONTRACT[chainId],
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
      tokenId: market.tokenId,
      startPrice: market.startPrice,
      endPrice: market.endPrice,
      start: market.start,
      deadline: market.deadline,
    },
  })

  const provider = useProvider()

  const sign = async () => {
    try {
      const signature = await signTypedDataAsync()
      const marketplaceContract = new FixedOrderMarketContract(provider)
      const computedSigner = await marketplaceContract.computeSigner(market.new({ signature }))
      if (computedSigner !== market.seller) throw `Invalid signature`
      setSignature(signature)
    } catch (e) {}
  }

  const submitSignature = async (callback: () => void) => {
    await insertMarketplace.mutateAsync({
      tokenID: market.tokenId.toString(),
      signatureHash: signature,
      endPrice: market.endPrice.toString(),
      start: market.start.toString(),
      startPrice: market.startPrice.toString(),
      tokenOwner: market.seller,
      tokenIsListed: true,
      deadline: market.deadline.toString(),
      tokenOption: market.erc20,
    })
    callback()
  }

  const clearSignature = async (callback: () => void) => {
    await insertMarketplace.mutateAsync({
      tokenID: market.tokenId.toString(),
      signatureHash: ``,
      endPrice: market.endPrice.toString(),
      start: market.start.toString(),
      startPrice: market.startPrice.toString(),
      tokenOwner: market.seller,
      tokenIsListed: false,
      deadline: market.deadline.toString(),
      tokenOption: market.erc20,
    })

    callback()
  }

  const setCurrency = (currency: Currency) => setMarket((m) => m.new({ currency }))
  const setPrice = (startPrice: BigNumber) => setMarket((m) => m.new({ startPrice }))
  const setDeadline = (deadline: BigNumberish) => setMarket((m) => m.new({ deadline }))

  return {
    isLoading,
    market,
    signature,
    sign,
    submitSignature,
    clearSignature,
    setCurrency,
    setPrice,
    setDeadline,
  }
}

function addDays(date: Date, days: number) {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const ListPositionForSale = ({
  onClose,
  staking,
}: {
  staking: StakingPosition
  onClose: VoidFunction
}) => {
  const {
    isLoading,
    signature,
    market,
    sign,
    submitSignature,
    clearSignature,
    setCurrency,
    setPrice,
    setDeadline,
  } = useListeForSaleState({ staking })
  const tomorrow = addDays(new Date(), 1)
  const disabled = market.deadline?.mul(1000).lt(Date.now()) || market.startPrice.eq(0)
  const chainId = useCurrentSupportedNetworkId()

  const approveContractInfo = useApproveForAll({
    erc721: staking.address,
    operator: MARKETPLACE_CONTRACT[chainId],
  })

  if (!approveContractInfo.approved) {
    return (
      <VStack direction={'column'} w={`400px`} max-w={`full`} gap={4} p={4}>
        <Text fontSize={`xl`} textAlign={'center'} fontWeight="bold" width={'full'}>
          Empower Marketplace
        </Text>
        <Text>
          Empower our{' '}
          <Link
            target={`_blank`}
            href="https://etherscan.io/address/0x4Da0E49363e796cba0c3E57114858E05260E705a#code"
          >
            marketplace
          </Link>{' '}
          to handle your Liquid Staked CNV (lsdCNV) collection.
        </Text>
        <HStack w={'full'} gap={2}>
          <Button
            w={'full'}
            isLoading={
              approveContractInfo.isWaitingForConfirmation ||
              approveContractInfo.isWaitingTransactionReceipt
            }
            loadingText={
              approveContractInfo.isWaitingForConfirmation ? 'Approve in wallet' : 'Waiting receipt'
            }
            onClick={() => {
              approveContractInfo.sendTx()
            }}
            variant={`primary`}
            size={`md`}
          >
            Approve
          </Button>
          <Button w={'full'} onClick={onClose} variant={`secondary`} size={`md`}>
            Cancel
          </Button>
        </HStack>
      </VStack>
    )
  }

  if (signature) {
    return (
      <ConfirmSignature
        market={market}
        staking={staking}
        onSubmit={() => submitSignature(onClose)}
        onCancel={() => clearSignature(onClose)}
      />
    )
  }
  return (
    <VStack direction={'column'} justifyContent={'space-between'} gap={1} pt={8} px={8} pb={0}>
      <Type />
      <Info label="Current value:" value={formatFixed(staking.currentValue) + ' CNV'}></Info>
      <CurrencySelector value={market.currency} onChange={setCurrency} />
      <BigNumberField
        label="Price:"
        currency={market.currency}
        onChange={setPrice}
        decimalScale={4}
      />
      <EpochDateField
        label="Deadline:"
        onChange={setDeadline}
        minDate={tomorrow.getTime() / 1000}
        maxDate={1864645261}
      />
      <Text textColor={'text.low'} as="em" fontSize={'xs'}>
        1.5% sale fee
      </Text>
      <Flex pt={3} justifyContent="center">
        <ChooseButton
          onClick={sign}
          isLoading={isLoading}
          isDisabled={disabled}
          disabled={disabled}
          loadingText={'Confirm on wallet'}
          title={`List`}
        />
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
      <SelectMarketCurrency selected={value} onSelect={onChange} />
    </HStack>
  )
}

export const SelectMarketCurrency = ({
  selected,
  onSelect,
}: {
  selected?: Currency
  onSelect: (token: Currency) => void
}) => {
  const networkId = useCurrentSupportedNetworkId()
  const currencies = [DAI, NATIVE, USDC, FRAX].map((c) => c[networkId]).filter((c) => c)
  return (
    <Menu>
      <MenuButton
        width={'full'}
        shadow={'Up Big'}
        borderRadius={'full'}
        _active={{
          shadow: 'Down Big',
        }}
        px={4}
        py={1.5}
        as={Button}
        rightIcon={<DownIcon w={`16px`} />}
      >
        <HStack>
          <CurrencyIcon size="xs" currency={selected} />
          <span>{selected.symbol}</span>
        </HStack>
      </MenuButton>
      <MenuList>
        {currencies.map((c) => {
          return (
            <MenuItem key={c.symbol} onClick={() => onSelect(c)} gap={2}>
              <CurrencyIcon size="xs" currency={c} />
              <span>{c.symbol}</span>
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}

const generateDefaultMarket = (staking: StakingPosition, seller: Address) => {
  return new MarketItem({
    seller,
    erc721: staking.address,
    currency: DAI[staking.chainId],
    tokenId: staking.tokenId.toString(),
    startPrice: 0,
    endPrice: 0,
    start: 0,
    deadline: 1861966861,
    isListed: false,
    signature: '',
  })
}
