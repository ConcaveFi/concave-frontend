import { Card } from '@concave/ui'
import { Input } from 'components/Swap/Input'
import { MaxAmount } from 'components/Swap/MaxAmount'
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
        // is this needed? interface is updated
        // token={stakedCoin}
        symbol={stakedCoin.symbol}
        maxAmount={stakedCoin.maxAmount}
        // onChangeValue={}
        tokenOptions={['CNV']}
        // onSelectToken={}
      >
        <MaxAmount
          label="Balance:"
          max={stakedCoin.maxAmount}
          // onClick={}
        />
      </Input>
    </Card>
  )
}

export default StakeInput
