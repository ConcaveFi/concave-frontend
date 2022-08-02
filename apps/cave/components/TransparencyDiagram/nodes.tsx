import {
  ACNV_ADDRESS,
  BBTCNV_ADDRESS,
  BOND_ADDRESS,
  CNV_ADDRESS,
  PCNV_ADDRESS,
  STAKING_CONTRACT,
} from '@concave/core'

export const enum AddressTypeEnum {
  TOKEN = 'token',
  CONTRACT = 'address',
  MULTISIG = 'address',
}

export const nodes = [
  {
    id: 'bbtCNV',
    data: {
      label: 'bbtCNV',
      addressType: AddressTypeEnum.TOKEN,
      address: BBTCNV_ADDRESS[1],
    },
    position: { x: 0, y: 0 },
    type: 'TriangleNode',
  },
  {
    id: 'aCNV',
    data: { label: 'aCNV', addressType: AddressTypeEnum.TOKEN, address: ACNV_ADDRESS[1] },
    position: { x: 125, y: 0 },
    type: 'TriangleNode',
  },
  {
    id: 'CNV',
    data: { label: 'CNV', addressType: AddressTypeEnum.TOKEN, address: CNV_ADDRESS[1] },
    position: { x: 250, y: 0 },
    type: 'TriangleNode',
  },
  {
    id: 'pCNV',
    data: { label: 'pCNV', addressType: AddressTypeEnum.TOKEN, address: PCNV_ADDRESS[1] },
    position: { x: 375, y: 0 },
    type: 'TriangleNode',
  },
  {
    id: 'lsdCNV',
    data: { label: 'lsdCNV', addressType: AddressTypeEnum.TOKEN, address: STAKING_CONTRACT[1] },
    position: { x: 700, y: 0 },
    type: 'TriangleNode',
  },

  {
    id: 'Concave Treasury',
    data: {
      label: 'Concave Treasury',
      addressType: AddressTypeEnum.MULTISIG,
      address: '0x226e7AF139a0F34c6771DeB252F9988876ac1Ced',
    },
    position: { x: 0, y: 200 },
    type: 'RectangleNode',
  },

  {
    id: 'CO-OP Treasury',
    data: {
      label: 'CO-OP Treasury',
      addressType: AddressTypeEnum.MULTISIG,
      address: '0x93249d69636124ab311798f047dc1a8a94dd0a9e',
    },
    position: { x: 0, y: 300 },
    type: 'RectangleNode',
  },
  {
    id: 'Policy Multisig',
    data: {
      label: 'Policy Multisig',
      addressType: AddressTypeEnum.MULTISIG,
      address: '0x4461f141a47e2858B49e7A3572E08Acb6b43F8a9',
    },
    position: { x: 0, y: 400 },
    type: 'RectangleNode',
  },

  {
    id: 'Proxy Admin',
    data: {
      label: 'Proxy Admin',
      addressType: AddressTypeEnum.CONTRACT,
      address: '0xe2E552EF2f99400d93f25C2A7B3692eE1548B66D',
    },
    position: { x: 550, y: 0 },
    type: 'DiamondNode',
  },
  {
    id: 'AccrualBondsV1 (Proxy)',
    data: {
      label: 'AccrualBondsV1 (Proxy)',
      addressType: AddressTypeEnum.CONTRACT,
      address: BOND_ADDRESS[1],
    },
    position: { x: 450, y: 150 },
    type: 'DiamondNode',
  },
  {
    id: 'StakingV1 (Proxy)',
    data: {
      label: 'StakingV1 (Proxy)',
      addressType: AddressTypeEnum.CONTRACT,
      address: STAKING_CONTRACT[1],
    },
    position: { x: 650, y: 230 },
    type: 'DiamondNode',
  },

  {
    id: 'AccrualBondsV1 (Impl)',
    data: {
      label: 'AccrualBondsV1 (Impl)',
      addressType: AddressTypeEnum.CONTRACT,
      address: '0x9Eb0ad4eEC37CE219081b94Cc41290AbfB58ee5a',
    },
    position: { x: 450, y: 400 },
    type: 'DiamondNode',
  },
  {
    id: 'StakingV1 (Impl)',
    data: {
      label: 'StakingV1 (Impl)',
      addressType: AddressTypeEnum.CONTRACT,
      address: '0xd3a72248298739e52b0fd01fd753025fe98493c7',
    },
    position: { x: 650, y: 400 },
    type: 'DiamondNode',
  },

  {
    id: 'ValueShuttle',
    data: {
      label: 'ValueShuttle',
      addressType: AddressTypeEnum.CONTRACT,
      address: '0x8f639597f658691c2f500156486631a1b163d238',
    },
    position: { x: 325, y: 600 },
    type: 'CylinderNode',
  },
]
