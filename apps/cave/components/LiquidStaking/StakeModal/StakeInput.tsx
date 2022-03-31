import { Card } from '@concave/ui'
import { Token } from '@uniswap/sdk-core'
import { MaxAmount } from 'components/Swap/MaxAmount'
import { TokenInput } from 'components/Swap/TokenInput'
import { TokenType } from 'lib/tokens'
import React from 'react'
import { chain } from 'wagmi'

export const stakedCoin = new Token(
  chain.ropsten.id,
  '0x2b8e79cbd58418ce9aeb720baf6b93825b93ef1f',
  18,
  'CNV',
  'Concave',
) as TokenType
stakedCoin.logoURI = '/assets/tokens/gncv.svg'

const stakedOptions: Token[] = [stakedCoin]

function StakeInput() {
  return (
    <Card w="350px">
      <TokenInput
        onSelectToken={console.log}
        price={69}
        selected={stakedCoin}
        value={stakedCoin.symbol}
        onChangeValue={console.log}
      >
        <MaxAmount label="Balance:" max={42690} onClick={console.log} />
      </TokenInput>
    </Card>
  )
}

export default StakeInput
