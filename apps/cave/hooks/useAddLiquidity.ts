import { usePair, usePairs } from 'components/AMM/hooks/usePair'
import { useTrade } from 'components/AMM/hooks/useTrade'
import { parseInputAmount } from 'components/AMM/utils/parseInputAmount'
import { Hash } from 'crypto'
import { ethers } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { CNV, Token, DAI, CurrencyAmount, ROUTER_ADDRESS, Currency } from 'gemswap-sdk'
import { contractABI } from 'lib/contractoABI'
import { concaveProvider } from 'lib/providers'
import { useCallback, useEffect, useState } from 'react'
import { UseQueryResult } from 'react-query'
import { chain, useSigner } from 'wagmi'
import { useConversion } from './useConversion'
import { useCurrentSupportedNetworkId } from './useCurrentSupportedNetworkId'

export enum FieldType
{
  INPUT, OUTPUT
}

export const useAddLiquidity = ( selectedChain = chain.ropsten, userAddress ) =>
{
  const networkId = useCurrentSupportedNetworkId()
  const [ tokenA, setTokenA ] = useState<Token>( DAI[ networkId ] )
  const [ tokenB, setTokenB ] = useState<Token>( CNV[ networkId ] )
  const [ { data, error, loading }, getSigner ] = useSigner()
  const [ hash, setHash ] = useState<string>( null )
  const [ tradeType, setTradeType ] = useState( FieldType.INPUT )
  const [ exactValue, setExactValue ] = useState<string>( '' )
  const [ fieldType, setFieldType ] = useState<FieldType>( FieldType.INPUT )
  const contractInstance = new ethers.Contract(
    ROUTER_ADDRESS[ selectedChain.id ],
    contractABI,
    concaveProvider( selectedChain.id ),
  )

  const setOrSwitchCurrency = useCallback(
    ( otherCurrency: Currency, setCurrency ) => ( currency: Currency ) =>
      otherCurrency?.equals( currency )
        ? ( setTokenA( tokenB ), setTokenB( tokenA ) )
        : setCurrency( currency ),
    [ tokenA, tokenB ],
  )

  const updateField = ( fieldInputType: FieldType ) => ( value: string ) =>
  {
    setFieldType( fieldInputType )
    setExactValue( value )
  }

  const { amountADesired, amountBDesired } = useConversion( tokenA, tokenB, exactValue, fieldType )


  const clear = () =>
  {
    setTokenA( null )
    setTokenB( null )
    setHash( '' )
  }
  const call = async () =>
  {
    const contractSigner = contractInstance.connect( data )
    const to = userAddress
    const provider = concaveProvider( chain.ropsten.id )
    const currentBlockNumber = await provider.getBlockNumber()
    const { timestamp } = await provider.getBlock( currentBlockNumber )
    const deadLine = timestamp + 86400
    contractSigner
      .addLiquidity(
        tokenA.address,
        tokenB.address,
        parseUnits( amountADesired.toFixed( tokenA.decimals ) ),
        parseUnits( amountBDesired.toFixed( tokenB.decimals ) ),
        parseUnits( `0`, tokenA.decimals ),
        parseUnits( `0`, tokenB.decimals ),
        to,
        deadLine,
        {
          gasLimit: 500000,
        },
      )
      .then( ( r ) =>
      {
        setHash( r.hash )
        return r
      } )
  }

  return [
    {
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      userAddress,
      hash,
    },
    {
      setTokenA,
      setTokenB,
      updateInputValue: updateField( FieldType.INPUT ),
      updateOutputValue: updateField( FieldType.OUTPUT ),
      updateTokenA: setOrSwitchCurrency( tokenB, setTokenA ),
      updateTokenB: setOrSwitchCurrency( tokenA, setTokenB ),
    },
    call,
    clear,
  ] as const
}

export interface UseAddLiquidityData
{
  tokenA: Token
  tokenB: Token
  amountADesired: any
  amountBDesired: any
  userAddress: string
}

