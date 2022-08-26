import { formatDistanceStrict } from 'date-fns'
import {
  useGet_Accrualbondv1_Last10_SoldQuery,
  useGet_Amm_Cnv_InfosQuery,
  useGet_TreasuryQuery,
} from 'graphql/generated/graphql'
import { useCNVPrice } from 'hooks/useCNVPrice'
import { numberMask } from 'utils/numberMask'

const useLastBondSolds = () => {
  const { data } = useGet_Accrualbondv1_Last10_SoldQuery()

  const lastBondSoldsData = data?.logAccrualBondsV1_BondSold
  const lastBondSolds = lastBondSoldsData
    ?.map((sold) => ({
      timesTamp: formatDistanceStrict(sold.timestamp * 1000, new Date().getTime()) + ' ago',
      inputAmount: numberMask(+sold?.inputAmount),
      outputAmount: numberMask(+sold?.output),
    }))
    .splice(0, 3)
  return {
    lastBondSolds,
  }
}

export const useTreasuryData = () => {
  const { isLoading: isLoadingTreasury, data: treasuryData } = useGet_TreasuryQuery()
  const { isLoading: isLoadingCNV, data: cnvData } = useGet_Amm_Cnv_InfosQuery()
  const { price: cnvPrice } = useCNVPrice()
  const { lastBondSolds } = useLastBondSolds()

  if (isLoadingTreasury || isLoadingCNV) {
    return {
      revenueData: {},
      isLoading: true,
    }
  }
  // get total Treasury
  const SEED_ROUND = 600000
  const sumTotal = treasuryData?.treasury?.map((i: any) => i.total)
  const total = sumTotal.reduce((current, previous) => current + previous) + SEED_ROUND

  const marketCap = cnvData?.cnvData?.data.marketCap || 0
  const treasuryValuePerCNV = total / cnvData?.cnvData?.data?.totalSupply || 0
  const treasuryValue = total || 0
  const cnvTotalSupply = cnvData?.cnvData?.data?.totalSupply || 0

  const convexToken = treasuryData?.treasury?.find((token) => token.name === 'cvxDOLA3POOL')

  return {
    lastBondSolds,
    treasuryData: {
      marketCap: marketCap,
      cnvPrice: +cnvPrice?.toFixed(2),
      valuePerCNV: treasuryValuePerCNV,
      treasuryRevenue: 0,
      treasuryValue: treasuryValue,
      cnvTotalSupply: cnvTotalSupply,
    },
    isloading: false,
    assets: {
      tokens: treasuryData?.treasury?.filter(
        (token, index) => token.name !== 'cvxDOLA3POOL' && index !== 0,
      ),
      convex: {
        total: convexToken?.total || 0,
        tokenImage:
          'https://cdn.jsdelivr.net/gh/concavefi/assets@latest/blockchains/ethereum/assets/0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B/logo.png',
        images: [
          convertToJsDelivrPath(convexToken?.image || ''),
          convertToJsDelivrPath(convexToken?.imageP1 || ''),
          convertToJsDelivrPath(convexToken?.imageP2 || ''),
          convertToJsDelivrPath(convexToken?.imageP3 || ''),
        ],
      },
    },
  }
}

export type TreasuryData = {
  marketCap: number
  cnvPrice: number
  valuePerCNV: number
  treasuryRevenue: number
  treasuryValue: number
  cnvTotalSupply: number
}

export type TreasuryTokenInfo = {
  __typename?: 'treasury'
  updated_at: any
  contract: string
  chainId?: string
  name?: string
  amount?: any
  value?: any
  rewards?: any
  total?: any
  image?: string
  isLP?: boolean
  imageP1?: string
  imageP2?: string
  imageP3?: string
}

export type LastBondSolds = {
  timesTamp: string
  inputAmount: string
  outputAmount: string
}[]

// url.slice(48) will cut the string to get only the image path on github page.
const convertToJsDelivrPath = (url: string) =>
  'https://cdn.jsdelivr.net/gh/concavefi/assets@latest/' + url.slice(48)
