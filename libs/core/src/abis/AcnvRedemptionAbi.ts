export const ACNV_REDEMPTION_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_CNV', type: 'address' },
      { internalType: 'address', name: '_aCNV', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'redeemer', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'output', type: 'uint256' },
    ],
    name: 'Redemption',
    type: 'event',
  },
  {
    inputs: [],
    name: 'CNV',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'aCNV',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
    name: 'redeem',
    outputs: [{ internalType: 'uint256', name: 'output', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
