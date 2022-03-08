const makeCurrencyFormat = (language: string | string[], currency: string) =>
  new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

type UseCurrencyParams = {
  /**
   * navigator.language
   */
  language?: string
  currency?: 'JPY' | 'USD' | 'EUR' | 'BRL'
}

const defaultValues: UseCurrencyParams = {
  language: 'en-US',
  currency: 'USD',
}

export const useCurrency = (value: number, props: UseCurrencyParams = defaultValues) => {
  return makeCurrencyFormat(props.language, props.currency).format(value || 0)
}
