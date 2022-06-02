import { Interface } from '@ethersproject/abi'

export const Erc20Abi = [
  'function totalSupply() view returns (uint256)',
  'function decimals() external pure returns (uint8)',
  'function symbol() external pure returns (string memory)',
  'function balanceOf(address account) view returns (uint256)',
  'function transfer(address recipient, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
]
