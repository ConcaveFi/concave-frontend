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

  return {
    lastBondSolds,
    revenueData: {
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
  }
}

export type LastBondSolds = {
  timesTamp: string
  inputAmount: string
  outputAmount: string
}[]
