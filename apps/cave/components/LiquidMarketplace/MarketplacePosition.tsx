import {
  Box,
  Flex,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { CurrencyAmount, FIXED_ORDER_MARKET_CONTRACT, NATIVE } from '@concave/core'
import { FixedOrderMarketContract, StakingPosition } from '@concave/marketplace'
import { Button } from '@concave/ui'
import { useCurrencyButtonState } from 'components/CurrencyAmountButton/CurrencyAmountButton'
import { format, formatDistanceToNowStrict } from 'date-fns'
import { useTransaction } from 'hooks/TransactionsRegistry/useTransaction'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useFetchTokenData } from 'hooks/useTokenList'
import { concaveProvider } from 'lib/providers'
import { useMemo } from 'react'
import { formatFixed } from 'utils/formatFixed'
import { useSigner } from 'wagmi'

type MarketplacePositionProps = { stakingPosition: StakingPosition }
export const MarketplacePosition: React.FC<MarketplacePositionProps> = ({ stakingPosition }) => {
  const currentValue = formatFixed(stakingPosition?.currentValue)
  const discount = formatFixed(stakingPosition.calculateDiscount(), { decimals: 2 })
  const positionDate = new Date(stakingPosition.maturity * 1000)
  const relativePositionTime = formatDistanceToNowStrict(positionDate, { unit: 'day' })
  const percent = Math.abs(positionDate.getTime() / new Date().getTime())

  return (
    <Flex
      width={'full'}
      h="114px"
      rounded={'2xl'}
      shadow="up"
      apply="background.metalBrighter"
      direction={'column'}
      px={1}
      py={2}
      justify="space-between"
    >
      <Flex align="center" maxH={'95px'} gap={1} width={'full'} justify="space-between">
        <ImageContainer stakePeriod={stakingPosition?.poolID} />
        <Info title="Current value" info={`${currentValue}`} />
        <Info title="Discount" info={`${discount}%`} />
        <Info title="Token id" info={stakingPosition.tokenId.toString()} />
        <BuyContainer stakingPosition={stakingPosition} />
      </Flex>
      <LoadBard
        date={format(positionDate, 'mm/dd/yyyy')}
        relativeDate={relativePositionTime}
        percent={percent}
      />
    </Flex>
  )
}
type ImageContainerProps = { stakePeriod: number }
const ImageContainer: React.FC<ImageContainerProps> = ({ stakePeriod }) => (
  <Flex
    align={'center'}
    height={'76px'}
    w="196px"
    rounded={'2xl'}
    shadow="Down Medium"
    px={'2'}
    justify="space-around"
  >
    <Info info={stakeDayPeriod[stakePeriod]} title="Stake period" />
    <Image
      width={{ base: '90px', lg: '70px' }}
      height={{ base: '90px', lg: '70px' }}
      src={`/assets/marketplace/${stakeImage[stakePeriod]}`}
    />
  </Flex>
)

type BuyContainerProps = { stakingPosition: StakingPosition; onSucess?: () => void }
const BuyContainer = ({ stakingPosition, onSucess }: BuyContainerProps) => {
  const chainId = useCurrentSupportedNetworkId()
  const tokenId = stakingPosition.tokenId
  const currency = useFetchTokenData(chainId, stakingPosition.market.erc20)
  const price = CurrencyAmount.fromRawAmount(
    currency.data || NATIVE[chainId],
    stakingPosition.market.startPrice.toString(),
  )
  const { data: signer } = useSigner()

  const swap = useTransaction(
    async () => {
      const contract = new FixedOrderMarketContract(concaveProvider(stakingPosition.chainId))
      return contract.swap(signer, stakingPosition.market)
    },
    { meta: { type: 'offer marketplace', tokenId: +tokenId.toString() } },
  )

  const useCurrencyState = useCurrencyButtonState(price, FIXED_ORDER_MARKET_CONTRACT[chainId])
  const buttonProps = useMemo(() => {
    if (swap.isWaitingForConfirmation)
      return { loadingText: 'Confirm', isLoading: true, minWidth: '45%' }

    if (swap.isWaitingTransactionReceipt)
      return { loadingText: 'Waiting', isLoading: true, minWidth: '45%' }

    if (swap.isSucess) {
      return { children: 'Bought', minWidth: '45%' }
    }
    if (swap.isError) {
      return { children: 'Unavailable', minWidth: '45%' }
    }
    if (useCurrencyState.approved) {
      return { onClick: swap.sendApproveTx, variant: 'primary', children: 'Buy', minWidth: '45%' }
    }
    return {
      ...useCurrencyState.buttonProps,
      minWidth: useCurrencyState.state === 'default' ? '45%' : '100%',
    }
  }, [
    swap.isError,
    swap.isSucess,
    swap.isWaitingForConfirmation,
    swap.isWaitingTransactionReceipt,
    swap.sendApproveTx,
    useCurrencyState.approved,
    useCurrencyState.buttonProps,
    useCurrencyState.state,
  ])

  return (
    <Box p={'2px'} bg="linear-gradient(90deg, #72639B 0%, #44B9DE 100%)" rounded={'2xl'}>
      <Flex
        w="152px"
        h="49px"
        rounded={'2xl'}
        shadow="up"
        apply="background.metalBrighter"
        justify="end"
      >
        {buttonProps.minWidth === '45%' && (
          <Flex flex={1} align="center" justify="center">
            <Info title="Price" info={price.toSignificant()} infoSize={12} />
          </Flex>
        )}
        {!currency.isLoading && (
          <Button
            shadow={'up'}
            textOverflow={'ellipsis'}
            px={2}
            height="full"
            rounded={'2xl'}
            {...buttonProps}
          />
        )}
      </Flex>
    </Box>
  )
}

type LoadBarProps = { percent: number; date: string; relativeDate: string }
const LoadBard = ({ percent, date, relativeDate }: LoadBarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex
      w={'95%'}
      mx="auto"
      h="12px"
      rounded={'2xl'}
      shadow="down"
      p={'3px'}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <Popover isOpen={isOpen}>
        <PopoverTrigger>
          <Box
            width={`${percent}%`}
            height="full"
            bg={'linear-gradient(90deg, #375FC2 0%, #46CFF3 100%)'}
            rounded="2xl"
          />
        </PopoverTrigger>

        <PopoverContent width={'100px'}>
          <Flex
            direction={'column'}
            w={'140px'}
            h="85px"
            rounded="inherit"
            apply={'background.glass'}
            shadow="up"
            fontWeight="bold"
          >
            <Text mx={'auto'} mt={2} color="text.low">
              Redeem date:
            </Text>
            <Text>{date}</Text>
            <Flex justify={'center'} gap={2}>
              <Text color={'text.low'}>in</Text>
              <Text color={'text.accent'}>{relativeDate}</Text>
            </Flex>
          </Flex>
        </PopoverContent>
      </Popover>
    </Flex>
  )
}
type InfoProps = { title: string; info: string; infoSize?: number }
const Info = ({ info, infoSize, title }: InfoProps) => (
  <Flex direction={'column'} align="center" fontWeight={'bold'}>
    <Text fontSize={'12px'} color="text.low">
      {title}
    </Text>
    <Text fontSize={infoSize || 16}>{info}</Text>
  </Flex>
)
const stakeImage = {
  0: '12mposition.png',
  1: '6mposition.png',
  2: '3mposition.png',
  3: '1mposition.png',
}

const stakeDayPeriod = {
  0: '360 Days',
  1: '180 Days',
  2: '90 Days',
  3: '45 Days',
}
const stakeNumberPeriod = {
  0: 360,
  1: 180,
  2: 90,
  3: 45,
}
