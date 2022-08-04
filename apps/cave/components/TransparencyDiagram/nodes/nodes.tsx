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
import { CircleNode } from './Circle'
import { CylinderNode } from './Cylinder'
import { DiamondNode } from './Diamond'
import { FolderNode } from './Folder'
import { RectangleNode } from './Rectangle'
import { TriangleNode } from './Triangle'

export const nodeTypes = {
  CircleNode: CircleNode,
  CylinderNode: CylinderNode,
  DiamondNode: DiamondNode,
  FolderNode: FolderNode,
  RectangleNode: RectangleNode,
  TriangleNode: TriangleNode,
}

const enum NodeTypeEnum {
  CircleNode = 'CircleNode',
  CylinderNode = 'CylinderNode',
  DiamondNode = 'DiamondNode',
  FolderNode = 'FolderNode',
  RectangleNode = 'RectangleNode',
  TriangleNode = 'TriangleNode',
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
  type: NodeTypeEnum.CircleNode,
})

const bbtCNV = (x: number, y: number): Node => ({
  id: 'bbtCNV',
  data: {
    label: 'bbtCNV',
    addressType: AddressTypeEnum.TOKEN,
    address: BBTCNV_ADDRESS[1],
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.TriangleNode,
})

const aCNV = (x: number, y: number): Node => ({
  id: 'aCNV',
  data: { label: 'aCNV', addressType: AddressTypeEnum.TOKEN, address: ACNV_ADDRESS[1] },
  position: { x: x, y: y },
  type: NodeTypeEnum.TriangleNode,
})

const cnv = (x: number, y: number): Node => ({
  id: 'CNV',
  data: { label: 'CNV', addressType: AddressTypeEnum.TOKEN, address: CNV_ADDRESS[1] },
  position: { x: x, y: y },
  type: NodeTypeEnum.TriangleNode,
})
const pCNV = (x: number, y: number): Node => ({
  id: 'pCNV',
  data: { label: 'pCNV', addressType: AddressTypeEnum.TOKEN, address: PCNV_ADDRESS[1] },
  position: { x: x, y: y },
  type: NodeTypeEnum.TriangleNode,
})

const lsdCNV = (x: number, y: number): Node => ({
  id: 'lsdCNV',
  data: { label: 'lsdCNV', addressType: AddressTypeEnum.TOKEN, address: STAKING_CONTRACT[1] },
  position: { x: x, y: y },
  type: NodeTypeEnum.TriangleNode,
})

const concaveTreasury = (x: number, y: number): Node => ({
  id: 'Concave Treasury',
  data: {
    label: 'Concave Treasury',
    addressType: AddressTypeEnum.MULTISIG,
    address: '0x226e7AF139a0F34c6771DeB252F9988876ac1Ced',
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.RectangleNode,
})

const coopTreasury = (x: number, y: number): Node => ({
  id: 'CO-OP Treasury',
  data: {
    label: 'CO-OP Treasury',
    addressType: AddressTypeEnum.MULTISIG,
    address: '0x93249d69636124ab311798f047dc1a8a94dd0a9e',
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.RectangleNode,
})

const policyMultisig = (x: number, y: number): Node => ({
  id: 'Policy Multisig',
  data: {
    label: 'Policy Multisig',
    addressType: AddressTypeEnum.MULTISIG,
    address: '0x4461f141a47e2858B49e7A3572E08Acb6b43F8a9',
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.RectangleNode,
})

const proxyAdmin = (x: number, y: number): Node => ({
  id: 'Proxy Admin',
  data: {
    label: 'Proxy Admin',
    addressType: AddressTypeEnum.CONTRACT,
    address: '0xe2E552EF2f99400d93f25C2A7B3692eE1548B66D',
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.DiamondNode,
})
const accrualBondsV1Proxy = (x: number, y: number): Node => ({
  id: 'AccrualBondsV1 (Proxy)',
  data: {
    label: 'AccrualBondsV1 (Proxy)',
    addressType: AddressTypeEnum.CONTRACT,
    address: BOND_ADDRESS[1],
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.DiamondNode,
})

const stakingV1Proxy = (x: number, y: number): Node => ({
  id: 'StakingV1 (Proxy)',
  data: {
    label: 'StakingV1 (Proxy)',
    addressType: AddressTypeEnum.CONTRACT,
    address: STAKING_CONTRACT[1],
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.DiamondNode,
})
const accrualBondsV1Impl = (x: number, y: number): Node => ({
  id: 'AccrualBondsV1 (Impl)',
  data: {
    label: 'AccrualBondsV1 (Impl)',
    addressType: AddressTypeEnum.CONTRACT,
    address: '0x9Eb0ad4eEC37CE219081b94Cc41290AbfB58ee5a',
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.DiamondNode,
})
const stakingV1Impl = (x: number, y: number): Node => ({
  id: 'StakingV1 (Impl)',
  data: {
    label: 'StakingV1 (Impl)',
    addressType: AddressTypeEnum.CONTRACT,
    address: '0xd3a72248298739e52b0fd01fd753025fe98493c7',
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.DiamondNode,
})

const valueShuttle = (x: number, y: number): Node => ({
  id: 'ValueShuttle',
  data: {
    label: 'ValueShuttle',
    addressType: AddressTypeEnum.CONTRACT,
    address: '0x8f639597f658691c2f500156486631a1b163d238',
  },
  position: { x: x, y: y },
  type: NodeTypeEnum.CylinderNode,
})

const crossChainContainer = (x: number, y: number): Node => ({
  id: 'crossChainContainer',
  data: null,
  position: { x: x, y: y },
  style: {
    border: 'dashed',
    borderColor: 'orange',
    backgroundColor: 'transparent',
    borderWidth: '2px',
    borderRadius: '8px',
    width: 180,
    height: 180,
  },
  type: 'group',
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
  type: NodeTypeEnum.RectangleNode,
  parentNode: 'crossChainContainer',
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
  type: NodeTypeEnum.RectangleNode,
  parentNode: 'crossChainContainer',
})

export const generalNodes = [
  bbtCNV(0, 0),
  aCNV(125, 0),
  cnv(250, 0),
  pCNV(375, 0),
  lsdCNV(700, 0),
  concaveTreasury(0, 200),
  coopTreasury(0, 300),
  policyMultisig(0, 400),
  proxyAdmin(550, 0),
  accrualBondsV1Proxy(450, 145),
  accrualBondsV1Impl(450, 400),
  stakingV1Proxy(650, 230),
  stakingV1Impl(650, 400),
  valueShuttle(325, 600),
  crossChainContainer(40, 500),
  bscSafe(20, 15),
  avaxSafe(20, 105),
]

export const stakingNodes = [
  cnv(15, 0),
  lsdCNV(500, 250),
  concaveTreasury(0, 200),
  policyMultisig(0, 300),
  coopTreasury(0, 400),
  proxyAdmin(250, 50),
  stakingV1Proxy(250, 250),
  stakingV1Impl(375, 425),
  user(500, 550),
  valueShuttle(150, 500),
]

export const bondingNodes = [
  cnv(15, 0),
  concaveTreasury(0, 200),
  policyMultisig(0, 300),
  coopTreasury(0, 400),
  proxyAdmin(400, 0),
  accrualBondsV1Proxy(400, 150),
  accrualBondsV1Impl(300, 350),
  user(450, 450),
  valueShuttle(225, 500),
]
