import { usePair } from "components/AMM/hooks/usePair"
import { parseInputAmount } from "components/AMM/utils/parseInputAmount"
import { CurrencyAmount, Pair, Token } from "gemswap-sdk"
import { useEffect, useState } from "react"
import { FieldType } from "./useAddLiquidity"


export const useConversion = ( currencyIn: Token, currencyOut: Token, value: string, fieldType: FieldType ) =>
{
    const [ reserveA, setReserveA ] = useState( null )
    const [ reserveB, setReserveB ] = useState( null )
    const [ tokenA, setTokenA ] = useState( null )
    const [ TokenB, setTokenB ] = useState( null )

    const { data: pair } = usePair( currencyIn, currencyOut )

    useEffect( () =>
    {
        if ( pair !== undefined )
        {
            setReserveA( pair[ 0 ].reserve0.toExact() )
            setReserveB( pair[ 0 ].reserve1.toExact() )
            setTokenA( pair[ 0 ].token0 )
            setTokenB( pair[ 0 ].token1 )
        }
    }, [ pair ] )

    function calculateOutputAmount (): CurrencyAmount<Token> 
    {
        const sameTokenOfOutPut = TokenB?.address === currencyOut?.address
        const diference = sameTokenOfOutPut ? ( reserveB / reserveA ) : ( reserveA / reserveB )
        const amount = ( +value * diference ).toString()

        return parseInputAmount( amount, currencyOut )
    }
    function calculateInputAmount (): CurrencyAmount<Token> 
    {
        const sameTokenOfInput = tokenA?.address === currencyIn?.address
        const diference = sameTokenOfInput ? ( reserveA / reserveB ) : ( reserveB / reserveA )
        const amount = ( +value * diference ).toString()
        console.log( reserveA )
        console.log( reserveB )
        return parseInputAmount( amount, currencyIn )


    }

    const [ amountADesired, amountBDesired ]: [ CurrencyAmount<Token>, CurrencyAmount<Token> ] = (
        fieldType === FieldType.INPUT
            ? [ parseInputAmount( value, currencyIn ), calculateOutputAmount() ]
            : [ calculateInputAmount(), parseInputAmount( value, currencyOut ) ]
    )

    return {
        amountADesired,
        amountBDesired
    }
}