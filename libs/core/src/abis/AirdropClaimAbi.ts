export const AIRDROP_CLAIM_ABI = [
  'error CallerNotCreator()',
  'error InvalidProof()',
  'event Claim(address account, uint256 amount)',
  'event Recovered(address to)',
  'function asset() pure returns (address)',
  'function claim(bytes32[] proof, uint256 value)',
  'function claimed(address) view returns (bool)',
  'function creator() pure returns (address)',
  'function merkleRoot() pure returns (bytes32)',
  'function recover(address token, address to)',
]
