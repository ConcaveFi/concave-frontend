/**
 * A minimal ABI definition for an ERC20 token.
 */
export const ERC20_ABI = Object.freeze([
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
])

/**
 * A minimal ABI definition for an ERC20 LP token.
 */
export const ERC20_PAIR_ABI = Object.freeze([
  ...ERC20_ABI,
  'function DOMAIN_SEPARATOR() external view returns (bytes32)',
  'function PERMIT_TYPEHASH() external view returns (bytes32)',
  'function nonces(address owner) external view returns (uint)',
  'function factory() external view returns (address)',
  'function name() external pure returns (string memory)',
  'function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external',
  'function token0() external view returns (address)',
  'function token1() external view returns (address)',
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
  'function price0CumulativeLast() external view returns (uint)',
  'function price1CumulativeLast() external view returns (uint)',
  'function kLast() external view returns (uint)',
  'function sync() external',
  'function skim(address to) external',
  'function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external',
  // "function transfer(address to, uint value) external returns (bool)",
  // "function transferFrom(address from, address to, uint value) external returns (bool)",
  'event Mint(address indexed sender, uint amount0, uint amount1)',
])

/**
 * An ABI definition for ERC165.
 */
export const ERC165_ABI = Object.freeze([
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
])

/**
 * A minimal ABI definition for an ERC721 (non-fungible) token.
 */
export const ERC721_BASE_ABI = Object.freeze([
  ...ERC165_ABI,
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)',
  'event ApprovalForAll(address indexed owner, address indexed operator, bool approved)',
  'function balanceOf(address owner) view returns (uint256 balance)',
  'function ownerOf(uint256 tokenId) view returns (address owner)',
  'function safeTransferFrom(address from, address to, uint256 tokenId)',
  'function transferFrom(address from, address to, uint256 tokenId)',
  'function approve(address to, uint256 tokenId)',
  'function getApproved(uint256 tokenId) view returns (address operator)',
  'function setApprovalForAll(address operator, bool _approved)',
  'function isApprovedForAll(address owner, address operator) view returns (bool)',
  'function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data)',
])

export const ERC721_METADATA_ABI = Object.freeze([
  'function name() view returns (string memory)',
  'function symbol() view returns (string memory)',
  'function tokenURI(uint256 tokenId) view returns (string memory)',
])

/**
 * An ABI definition for enumerability of ERC721 tokens.
 */
export const ERC721_ENUMERABLE_ABI = Object.freeze([
  'function totalSupply() view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256 tokenId)',
  'function tokenByIndex(uint256 index) view returns (uint256)',
])

/**
 * An ABI definition for an ERC721 (non-fungible) token.
 * This ABI includes common extensions for metadata, and enumerability.
 */
export const ERC721_ABI = Object.freeze([
  ...ERC721_BASE_ABI,
  ...ERC721_ENUMERABLE_ABI,
  ...ERC721_METADATA_ABI,
])
