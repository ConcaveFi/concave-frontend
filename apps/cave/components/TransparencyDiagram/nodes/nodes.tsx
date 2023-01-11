import {
  ACNV_ADDRESS,
  BBTCNV_ADDRESS,
  BOND_ADDRESS,
  CNV_ADDRESS,
  PCNV_ADDRESS,
  STAKING_CONTRACT,
} from '@concave/core'
import type { Node } from 'react-flow-renderer'
import { ChainEnum } from '../types'
import { Bond } from './CustomShapes/Bond'
import { Multisig } from './CustomShapes/Multisig'
import { ProxyAdmin } from './CustomShapes/ProxyAdmin'
import { Stake } from './CustomShapes/Stake'
import { Token } from './CustomShapes/Token'
import { User } from './CustomShapes/User'
import { ValueShuttle } from './CustomShapes/ValueShuttle'

export const nodeTypes = {
  Bond: Bond,
  Multisig: Multisig,
  ProxyAdmin: ProxyAdmin,
  Token: Token,
  Stake: Stake,
  User: User,
  ValueShuttle: ValueShuttle,
}

const enum NodeTypeEnum {
  Bond = 'Bond',
  Multisig = 'Multisig',
  ProxyAdmin = 'ProxyAdmin',
  Stake = 'Stake',
  Token = 'Token',
  User = 'User',
  ValueShuttle = 'ValueShuttle',
}

export const enum AddressTypeEnum {
  TOKEN = 'token',
  CONTRACT = 'address',
  MULTISIG = 'address',
}

const user = (x: number, y: number): Node => ({
  id: 'user',
  data: {
    label: 'User',
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.User,
})

const bbtCNV = (x: number, y: number): Node => ({
  id: 'bbtCNV',
  data: {
    label: 'bbtCNV',
    addressType: AddressTypeEnum.TOKEN,
    address: BBTCNV_ADDRESS[1],
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.Token,
})

const aCNV = (x: number, y: number): Node => ({
  id: 'aCNV',
  data: { label: 'aCNV', addressType: AddressTypeEnum.TOKEN, address: ACNV_ADDRESS[1] },
  position: { x: x, y: y },
  type: NodeTypeEnum.Token,
})

const cnv = (x: number, y: number): Node => ({
  id: 'CNV',
  data: { label: 'CNV', addressType: AddressTypeEnum.TOKEN, address: CNV_ADDRESS[1] },
  position: { x: x, y: y },
  type: NodeTypeEnum.Token,
})
const pCNV = (x: number, y: number): Node => ({
  id: 'pCNV',
  data: { label: 'pCNV', addressType: AddressTypeEnum.TOKEN, address: PCNV_ADDRESS[1] },
  position: { x: x, y: y },
  type: NodeTypeEnum.Token,
})

const lsdCNV = (x: number, y: number): Node => ({
  id: 'lsdCNV',
  data: { label: 'lsdCNV', addressType: AddressTypeEnum.TOKEN, address: STAKING_CONTRACT[1] },
  position: { x: x, y: y },
  type: NodeTypeEnum.Token,
})

const concaveTreasury = (x: number, y: number): Node => ({
  id: 'Concave Treasury',
  data: {
    label: 'Concave Treasury',
    addressType: AddressTypeEnum.MULTISIG,
    address: '0x226e7AF139a0F34c6771DeB252F9988876ac1Ced',
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.Multisig,
})

const coopTreasury = (x: number, y: number): Node => ({
  id: 'CO-OP Treasury',
  data: {
    label: 'CO-OP Treasury',
    addressType: AddressTypeEnum.MULTISIG,
    address: '0x93249d69636124ab311798f047dc1a8a94dd0a9e',
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.Multisig,
})

const policyMultisig = (x: number, y: number): Node => ({
  id: 'Policy Multisig',
  data: {
    label: 'Policy Multisig',
    addressType: AddressTypeEnum.MULTISIG,
    address: '0x4461f141a47e2858B49e7A3572E08Acb6b43F8a9',
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.Multisig,
})

const proxyAdmin = (x: number, y: number): Node => ({
  id: 'Proxy Admin',
  data: {
    label: 'Proxy Admin',
    addressType: AddressTypeEnum.CONTRACT,
    address: '0xe2E552EF2f99400d93f25C2A7B3692eE1548B66D',
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.ProxyAdmin,
})
const accrualBondsV1Proxy = (x: number, y: number): Node => ({
  id: 'AccrualBondsV1 (Proxy)',
  data: {
    label: 'AccrualBondsV1 (Proxy)',
    addressType: AddressTypeEnum.CONTRACT,
    address: BOND_ADDRESS[1],
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.Bond,
})

const stakingV1Proxy = (x: number, y: number): Node => ({
  id: 'StakingV1 (Proxy)',
  data: {
    label: 'StakingV1 (Proxy)',
    addressType: AddressTypeEnum.CONTRACT,
    address: STAKING_CONTRACT[1],
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.Stake,
})
const accrualBondsV1Impl = (x: number, y: number): Node => ({
  id: 'AccrualBondsV1 (Impl)',
  data: {
    label: 'AccrualBondsV1 (Impl)',
    addressType: AddressTypeEnum.CONTRACT,
    address: '0x9Eb0ad4eEC37CE219081b94Cc41290AbfB58ee5a',
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.Bond,
})
const stakingV1Impl = (x: number, y: number): Node => ({
  id: 'StakingV1 (Impl)',
  data: {
    label: 'StakingV1 (Impl)',
    addressType: AddressTypeEnum.CONTRACT,
    address: '0xd3a72248298739e52b0fd01fd753025fe98493c7',
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.Stake,
})

const valueShuttle = (x: number, y: number): Node => ({
  id: 'ValueShuttle',
  data: {
    label: 'ValueShuttle',
    addressType: AddressTypeEnum.CONTRACT,
    address: '0x8f639597f658691c2f500156486631a1b163d238',
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.ValueShuttle,
})

const bscSafe = (x: number, y: number): Node => ({
  id: 'BSC CO-OP Treasury',
  data: {
    label: 'BSC CO-OP Treasury',
    addressType: AddressTypeEnum.MULTISIG,
    address: '0xf7d8Ccb4c3FAAc9e893B444d502d246556601D14',
    chain: ChainEnum.BSC,
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.Multisig,
})

const avaxSafe = (x: number, y: number): Node => ({
  id: 'AVAX CO-OP Treasury',
  data: {
    label: 'AVAX CO-OP Treasury',
    addressType: AddressTypeEnum.MULTISIG,
    address: '0x58d041206e3659960DD9778bDeb32D2CF1AC0fC4',
    chain: ChainEnum.AVAX,
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.Multisig,
})

const arbitrumSafe = (x: number, y: number): Node => ({
  id: 'Arbitrum CO-OP Treasury',
  data: {
    label: 'Arbitrum CO-OP Treasury',
    addressType: AddressTypeEnum.MULTISIG,
    address: '0x966C0c73ACa434158FABdB9628277a8725C0337d',
    chain: ChainEnum.ARBI,
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.Multisig,
})

export const generalNodes = [
  bbtCNV(650, 400),
  aCNV(385, 600),
  cnv(650, 600),
  pCNV(385, 400),
  lsdCNV(385, 1010),
  concaveTreasury(975, 480),
  coopTreasury(1225, 480),
  policyMultisig(1475, 480),
  proxyAdmin(0, 500),
  accrualBondsV1Proxy(975, 20),
  accrualBondsV1Impl(1300, 20),
  stakingV1Proxy(760, 1000),
  stakingV1Impl(1150, 1000),
  valueShuttle(1650, 1019),
  bscSafe(100, 0),
  avaxSafe(375, 0),
  arbitrumSafe(675, 0),
]

/**
 * every node has 230 by default
 * this chart has 6 lines, 6 x 230 = 1380
 */
export const generalNodesMobile = [
  //sidebar
  bbtCNV(580, 230),
  aCNV(580, 460),
  cnv(580, 690),
  pCNV(580, 920),
  lsdCNV(580, 0),

  //line 1
  bscSafe(0, 0),
  avaxSafe(150, 0),
  arbitrumSafe(300, 0),

  //line 2
  valueShuttle(0, 402 + 20),
  stakingV1Proxy(365, 383 + 20),
  stakingV1Impl(219, 383 + 20),

  //line 3
  policyMultisig(0, 767 + 10),
  coopTreasury(155, 767 + 10),
  concaveTreasury(310, 767 + 10),

  //line 4
  accrualBondsV1Proxy(280, 1150),
  accrualBondsV1Impl(0, 1150),
  proxyAdmin(565, 1160),
]

export const bondingNodes = [
  user(688, 0),
  proxyAdmin(900, 0),
  cnv(1200, 0),
  coopTreasury(0, 400),
  valueShuttle(300, 425),
  accrualBondsV1Proxy(600, 400),
  concaveTreasury(1200, 400),
  accrualBondsV1Impl(607, 800),
  policyMultisig(1200, 800),
]

export const bondingNodesMobile = [
  user(660, 0),
  proxyAdmin(863, 0),
  cnv(1100, 0),
  coopTreasury(645, 1000),
  valueShuttle(620, 720),
  accrualBondsV1Proxy(593, 358),
  concaveTreasury(1100, 350),
  accrualBondsV1Impl(826, 705),
  policyMultisig(1100, 700),
]

export const stakingNodes = [
  lsdCNV(0, 20),
  proxyAdmin(570, 20),
  concaveTreasury(900, 0),
  cnv(1200, 24),
  user(17, 400),
  valueShuttle(250, 420),
  stakingV1Proxy(600, 400),
  policyMultisig(900, 392),
  stakingV1Impl(600, 800),
  coopTreasury(900, 800),
]

export const stakingNodesMobile = [
  valueShuttle(225, 50),
  user(510, 29),
  lsdCNV(722, 41),

  stakingV1Impl(260, 400),
  stakingV1Proxy(504, 400),
  proxyAdmin(710, 410),

  coopTreasury(250, 800),
  policyMultisig(492, 800),
  concaveTreasury(724, 800),

  cnv(500, 1100),
]
