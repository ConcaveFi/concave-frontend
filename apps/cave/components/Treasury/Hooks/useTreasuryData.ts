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
  const seed = 600000
  const sumTotal = treasuryData.treasury.map((i: any) => i.total)
  const total = sumTotal.reduce((current, previus) => current + previus) + seed

  const marketCap = cnvData?.cnvData?.data.marketCap || 0
  const treasuryValuePerCNV = total / cnvData?.cnvData?.data?.totalSupply || 0
  const treasuryValue = total || 0
  const cnvTotalSupply = cnvData?.cnvData?.data?.totalSupply || 0

  const convexToken = treasuryData?.treasury?.find((token) => token.name === 'cvxDOLA3POOL')
  return {
    lastBondSolds,
    treasuryData: {
      firstRow: {
        marketCap: '$' + numberMask(marketCap),
        cnvPrice: '$' + cnvPrice?.toFixed(2) || ' 0',
        valuePerCNV: '$' + numberMask(treasuryValuePerCNV),
      },
      secondRow: {
        treasuryRevenue: 'Coming soon',
        treasuryValue: '$' + numberMask(treasuryValue),
        cnvTotalSupply: '$' + numberMask(cnvTotalSupply),
      },
    },
    isloading: false,
    assets: {
      tokens: treasuryData?.treasury?.filter(
        (token, index) => token.name !== 'cvxDOLA3POOL' && index !== 0,
      ),
      convex: {
        total: convexToken?.total || 0,
        tokenImage:
          'https://static.debank.com/image/eth_token/logo_url/0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b/be2a9b05a223d6dfca3dc88b1838fcd4.png',
        images: [
          convertGithubUrl(convexToken?.image || ''),
          convertGithubUrl(convexToken?.imageP1 || ''),
          convertGithubUrl(convexToken?.imageP2 || ''),
          convertGithubUrl(convexToken?.imageP3 || ''),
        ],
      },
    },
  }
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

const convertGithubUrl = (url: string) =>
  url.replace('github', 'raw.githubusercontent').replace('blob/', '')
