import { Interface } from '@ethersproject/abi'

/**
 * An ABI definition for ERC165.
 */
export const Erc165Abi = new Interface([
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
])

/**
 * A minimal ABI definition for an ERC721 (non-fungible) token.
 */
export const Erc721BaseAbi = new Interface([
  ...Erc165Abi.fragments,
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

export const Erc721MetadataAbi = new Interface([
  'function name() view returns (string memory)',
  'function symbol() view returns (string memory)',
  'function tokenURI(uint256 tokenId) view returns (string memory)',
])

/**
 * An ABI definition for enumerability of ERC721 tokens.
 */
export const Erc721EnumerableAbi = new Interface([
  'function totalSupply() view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256 tokenId)',
  'function tokenByIndex(uint256 index) view returns (uint256)',
])

/**
 * An ABI definition for an ERC721 (non-fungible) token.
 * This ABI includes common extensions for metadata, and enumerability.
 */
export const Erc721Abi = new Interface([
  ...Erc721BaseAbi.fragments,
  ...Erc721EnumerableAbi.fragments,
  ...Erc721MetadataAbi.fragments,
])
