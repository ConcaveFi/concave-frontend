import { ChainId, USDC } from '@concave/core'
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

export const isWhitelistedQ4 = (address: string): boolean =>
  address && !!whitelist[getAddress(address)]
export const getAirdropQ4ClaimableAmount = (address: string): number =>
  address && whitelist[getAddress(address)]

export const airdropToken = USDC[ChainId.ETHEREUM]

const leafOf = (address: string) => {
  if (!address) return null
  const claimableQuantiy = getAirdropQ4ClaimableAmount(address)
  return Buffer.from(
    solidityKeccak256(
      ['address', 'uint256'],
      [
        getAddress(address), // normalizes to checksum address
        parseUnits(claimableQuantiy?.toString() || '0', airdropToken.decimals).toString(), // parse claimable amount to token decimals
      ],
    ).slice(2),
    'hex',
  )
}
const merkleTree = new MerkleTree(Object.keys(whitelist)?.map(leafOf), keccak256, {
  sortPairs: true,
})

export const getQ4Proof = (userAddress: string) => merkleTree.getHexProof(leafOf(userAddress) || '')
