import { useState, useCallback, useMemo } from 'react'
import { Currency, TradeType, CNV, DAI } from 'gemswap-sdk'
import { useTrade } from './useTrade'
import { parseInputAmount } from '../utils/parseInputAmount'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useEffect } from 'react'

export const useSwapState = () =>
{
  const networkId = useCurrentSupportedNetworkId()

  const [ currencyIn, setCurrencyIn ] = useState<Currency>( DAI[ networkId ] )
  const [ currencyOut, setCurrencyOut ] = useState<Currency>( CNV[ networkId ] )

  useEffect( () =>
  {
    setCurrencyIn( DAI[ networkId ] )
    setCurrencyOut( CNV[ networkId ] )
  }, [ networkId ] )

  /*
    we only need the value of the input the user typed in, 
    the other input value is then derived from it, simulating the 'trade'
  */
  const [ exactValue, setExactValue ] = useState<string>( '' )

  /*
    when user type in the input field, we set TradeType to Exact Input
    on the output field we set TradeType to Exact Output
    
    it basically tells which field the user is typing in
  */
  const [ tradeType, setTradeType ] = useState<TradeType>( TradeType.EXACT_INPUT )

  const updateField = ( fieldTradeType: TradeType ) => ( amount ) =>
  {
    setExactValue( amount )
    setTradeType( fieldTradeType )
  }

  /*
    on switching currencies by clicking the middle arrow button,
    we want to 'send' the input value to the output field,
    and derive the input from the output, so set trade type to Exact Output
  */
  const switchCurrencies = useCallback( () =>
  {
    setCurrencyIn( currencyOut )
    setCurrencyOut( currencyIn )
    setTradeType( TradeType.EXACT_OUTPUT )
  }, [ currencyIn, currencyOut ] )

  /*
    if you set on the output field the same currency already set on the input,
    it should switch them, but not as `switchCurrencies`, it won't enforce the trade type
  */
  const setOrSwitchCurrency = useCallback(
    ( otherCurrency: Currency, setCurrency ) => ( currency: Currency ) =>
      otherCurrency?.equals( currency )
        ? ( setCurrencyIn( currencyOut ), setCurrencyOut( currencyIn ) )
        : setCurrency( currency ),
    [ currencyIn, currencyOut ],
  )

  /*
    grab the exact currency amount and the other one to simulate the trade
  */
  const [ exactCurrencyAmount, otherCurrency ] =
    tradeType === TradeType.EXACT_INPUT
      ? [ parseInputAmount( exactValue, currencyIn ), currencyOut ]
      : [ parseInputAmount( exactValue, currencyOut ), currencyIn ]

  const { data: trade, error: tradeError } = useTrade( exactCurrencyAmount, otherCurrency.wrapped, {
    tradeType,
    maxHops: 3,
  } )

  /*
    grab the input field value and output field value based on the trade type
    one is the user inputted and the other the one derived from the trade simulation
  */
  const [ currencyAmountIn, currencyAmountOut ] =
    tradeType === TradeType.EXACT_INPUT
      ? [ exactCurrencyAmount, trade?.outputAmount ]
      : [ trade?.inputAmount, exactCurrencyAmount ]

  return useMemo(
    () => ( {
      trade,
      tradeError,
      currencyIn,
      currencyOut,
      currencyAmountIn,
      currencyAmountOut,
      tradeType,
      updateInputValue: updateField( TradeType.EXACT_INPUT ),
      updateOutputValue: updateField( TradeType.EXACT_OUTPUT ),
      updateCurrencyIn: setOrSwitchCurrency( currencyOut, setCurrencyIn ),
      updateCurrencyOut: setOrSwitchCurrency( currencyIn, setCurrencyOut ),
      switchCurrencies,
    } ),
    [
      trade,
      tradeError,
      currencyAmountIn,
      currencyAmountOut,
      currencyIn,
      currencyOut,
      setOrSwitchCurrency,
      switchCurrencies,
      tradeType,
    ],
  )
}
