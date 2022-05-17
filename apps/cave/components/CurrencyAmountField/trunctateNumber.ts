import { UseCurrencyBalanceData } from 'hooks/useCurrencyBalance'

export const trunctateNumber = (balance: UseCurrencyBalanceData) => {
  if (balance.isSuccess) {
    const truncatedBalance = parseFloat(
      (+balance?.data?.numerator.toString() / 10 ** 18).toString().match(/^-?\d+(?:.\d{0,2})?/)[0],
    ).toLocaleString()

    return truncatedBalance
  }
}
