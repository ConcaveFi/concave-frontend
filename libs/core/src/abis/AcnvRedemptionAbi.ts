export const ACNV_REDEMPTION_ABI = [
  'constructor(address _CNV, address _aCNV)',
  'event Redemption(address indexed redeemer, uint256 output)',
  'function CNV() view returns (address)',
  'function aCNV() view returns (address)',
  'function redeem(address to) returns (uint256 output)',
]
