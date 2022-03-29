import { Card } from '@concave/ui'
import { Input } from 'components/Swap/Input'
import { MaxAmount } from 'components/Swap/MaxAmount'
import { gCNV } from 'lib/tokens'
import React from 'react'

interface Token {
  symbol: string
  maxAmount: number
  amount: number | string
  price: number
}

const stakedCoin: Token = {
  symbol: 'CNV',
  maxAmount: 42690,
  amount: 333,
  price: 69,
}

const stakedOptions: Token[] = [stakedCoin]

function StakeInput() {
  return (
    <Card w="350px">
      <Input
        onSelectToken={console.log}
        price={stakedCoin.price}
        selected={gCNV}
        value={stakedCoin.symbol}
        onChangeValue={console.log}
        commonBases={[]}
      >
        <MaxAmount label="Balance:" max={stakedCoin.maxAmount} onClick={console.log} />
      </Input>
    </Card>
  )
}

export default StakeInput
