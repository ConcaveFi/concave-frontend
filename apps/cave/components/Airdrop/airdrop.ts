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

export const isWhitelisted = (address: string): boolean =>
  address && !!whitelist[getAddress(address)]
export const getAirdropClaimableAmount = (address: string): number =>
  address && whitelist[getAddress(address)]

export const airdropToken = USDC[ChainId.ETHEREUM]

const leafOf = (address: string) => {
  if (!address) return null
  const claimableQuantiy = getAirdropClaimableAmount(address)
  return Buffer.from(
    solidityKeccak256(
      ['address', 'uint256'],
      [
        getAddress(address), // normalizes to checksum address
        parseUnits(claimableQuantiy.toString(), airdropToken.decimals).toString(), // parse claimable amount to token decimals
      ],
    ).slice(2),
    'hex',
  )
}
const merkleTree = new MerkleTree(Object.keys(whitelist)?.map(leafOf), keccak256, {
  sortPairs: true,
})

export const getProof = (userAddress: string) => merkleTree.getHexProof(leafOf(userAddress) || '')
