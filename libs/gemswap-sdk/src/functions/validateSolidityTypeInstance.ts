import { ZERO } from '@concave/core'

import JSBI from 'jsbi'
import invariant from 'tiny-invariant'

const SOLIDITY_TYPE_MAXIMA = {
  uint8: JSBI.BigInt('0xff'),
  uint256: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
}

export function validateSolidityTypeInstance(
  value: JSBI,
  solidityType: keyof typeof SOLIDITY_TYPE_MAXIMA,
): void {
  invariant(JSBI.greaterThanOrEqual(value, ZERO), `${value} is not a ${solidityType}.`)
  invariant(
    JSBI.lessThanOrEqual(value, SOLIDITY_TYPE_MAXIMA[solidityType]),
    `${value} is not a ${solidityType}.`,
  )
}
