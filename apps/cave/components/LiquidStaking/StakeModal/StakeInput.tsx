import { Card } from '@concave/ui'
// import { TokenBalance } from 'components/Swap/TokenBalance'
// import { TokenInput } from 'components/Swap/TokenInput'
import { Token } from 'constants/routing'
import React from 'react'
import { chain } from 'wagmi'

export const stakedCoin = new Token({
  chainId: chain.ropsten.id,
  address: '0x2b8e79cbd58418ce9aeb720baf6b93825b93ef1f',
  decimals: 18,
  logoURI: '/assets/tokens/cnv.svg',
  name: 'Concave',
  symbol: 'CNV',
})

function StakeInput() {
  return (
    <Card w="350px">
      {/* <TokenInput
        onChangeCurrency={console.log}
        currency={stakedCoin}
        value={stakedCoin.symbol}
        onChangeValue={console.log}
      >
        <TokenBalance value={'42690'} onClick={console.log} />
      </TokenInput> */}
    </Card>
  )
}

export default StakeInput
