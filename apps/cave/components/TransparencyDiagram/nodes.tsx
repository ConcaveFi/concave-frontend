import {
  ACNV_ADDRESS,
  BBTCNV_ADDRESS,
  BOND_ADDRESS,
  CNV_ADDRESS,
  PCNV_CONTRACT,
  STAKING_CONTRACT,
} from '@concave/core'

export const nodes = [
  {
    id: 'bbtCNV',
    data: {
      label: 'bbtCNV',
      address: BBTCNV_ADDRESS[1],
    },
    position: { x: 0, y: 0 },
    type: 'TriangleNode',
  },
  {
    id: 'aCNV',
    data: { label: 'aCNV', address: ACNV_ADDRESS[1] },
    position: { x: 125, y: 0 },
    type: 'TriangleNode',
  },
  {
    id: 'CNV',
    data: { label: 'CNV', address: CNV_ADDRESS[1] },
    position: { x: 250, y: 0 },
    type: 'TriangleNode',
  },
  {
    id: 'pCNV',
    data: { label: 'pCNV', address: PCNV_CONTRACT[1] },
    position: { x: 375, y: 0 },
    type: 'TriangleNode',
  },
  {
    id: 'lsdCNV',
    data: { label: 'lsdCNV', address: STAKING_CONTRACT[1] },
    position: { x: 700, y: 0 },
    type: 'TriangleNode',
  },

  {
    id: 'Concave Treasury',
    data: {
      label: 'Concave Treasury',
      address: '0x226e7AF139a0F34c6771DeB252F9988876ac1Ced',
    },
    position: { x: 0, y: 200 },
    type: 'RectangleNode',
  },

  {
    id: 'CO-OP Treasury',
    data: {
      label: 'CO-OP Treasury',
      address: '0x93249d69636124ab311798f047dc1a8a94dd0a9e',
    },
    position: { x: 0, y: 300 },
    type: 'RectangleNode',
  },
  {
    id: 'Policy Multisig',
    data: {
      label: 'Policy Multisig',
      address: '0x0000000000000000000000000000000000000000',
    },
    position: { x: 0, y: 400 },
    type: 'RectangleNode',
  },

  {
    id: 'Proxy Admin',
    data: {
      label: 'Proxy Admin',
      address: '0xe2E552EF2f99400d93f25C2A7B3692eE1548B66D',
    },
    position: { x: 550, y: 0 },
    type: 'DiamondNode',
  },
  {
    id: 'AccrualBondsV1 (Proxy)',
    data: {
      label: 'AccrualBondsV1 (Proxy)',
      address: BOND_ADDRESS[1],
    },
    position: { x: 450, y: 200 },
    type: 'DiamondNode',
  },
  {
    id: 'StakingV1 (Proxy)',
    data: {
      label: 'StakingV1 (Proxy)',
      address: STAKING_CONTRACT[1],
    },
    position: { x: 650, y: 200 },
    type: 'DiamondNode',
  },

  {
    id: 'AccrualBondsV1 (Impl)',
    data: {
      label: 'AccrualBondsV1 (Impl)',
      address: '0x9Eb0ad4eEC37CE219081b94Cc41290AbfB58ee5a',
    },
    position: { x: 450, y: 350 },
    type: 'DiamondNode',
  },
  {
    id: 'StakingV1 (Impl)',
    data: {
      label: 'StakingV1 (Impl)',
      address: '0xd3a72248298739e52b0fd01fd753025fe98493c7',
    },
    position: { x: 650, y: 350 },
    type: 'DiamondNode',
  },

  {
    id: 'ValueShuttle',
    data: {
      label: 'ValueShuttle',
      address: '0x8f639597f658691c2f500156486631a1b163d238',
    },
    position: { x: 325, y: 600 },
    type: 'CylinderNode',
  },
]
