import { Percent } from '@concave/gemswap-sdk'

export const toPercent = (input: number) =>
  !!input ? new Percent(Math.floor(input * 100), 10_000) : new Percent(0)
