import { ChainId, PCNV, USDC } from '@concave/core'
import { getAddress, parseUnits, solidityKeccak256 } from 'ethers/lib/utils'
import keccak256 from 'keccak256'
import MerkleTree from 'merkletreejs'
import _whitelist from './whitelist.json'

const normalizeWhitelist = (whitelist) => {
  return Object.entries(whitelist).reduce(
    (acc, [address, amount]) => ({ ...acc, [getAddress(address)]: amount }),
    {},
  )
}

const whitelist = normalizeWhitelist(_whitelist)

export const isWhitelistedPCNV = (address: string): boolean =>
  address && !!whitelist[getAddress(address)]
export const getPCNVClaimableAmount = (address: string): number =>
  address && whitelist[getAddress(address)]

const claimToken = PCNV[ChainId.ETHEREUM]

const leafOf = (address: string) => {
  if (!address) return null
  const claimableQuantiy = getPCNVClaimableAmount(address)
  return Buffer.from(
    solidityKeccak256(
      ['address', 'uint256'],
      [
        getAddress(address), // normalizes to checksum address
        parseUnits(claimableQuantiy?.toString() || '0', claimToken.decimals).toString(), // parse claimable amount to token decimals
      ],
    ).slice(2),
    'hex',
  )
}
const merkleTree = new MerkleTree(Object.keys(whitelist)?.map(leafOf), keccak256, {
  sortPairs: true,
})

export const getPCNVClaimProof = (userAddress: string) =>
  merkleTree.getHexProof(leafOf(userAddress) || '')
