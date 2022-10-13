import { CurrencyAmount, Token } from '@concave/core'
import { Signer } from '@ethersproject/abstract-signer'
import { splitSignature } from '@ethersproject/bytes'
import { Contract } from '@ethersproject/contracts'
import { Wallet } from '@ethersproject/wallet'
interface PermitAllowedMessage {
  holder: string
  spender: string
  nonce: number
  expiry: number
  allowed?: boolean
}

interface PermitAmountMessage {
  owner: string
  spender: string
  value: number | string
  nonce: number | string
  deadline: number
}

interface Domain {
  name: string
  version: string
  chainId: number
  verifyingContract: string
}

const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
]

const EIP2612_TYPE = [
  { name: 'owner', type: 'address' },
  { name: 'spender', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'nonce', type: 'uint256' },
  { name: 'deadline', type: 'uint256' },
]

const PERMIT_ALLOWED_TYPE = [
  { name: 'holder', type: 'address' },
  { name: 'spender', type: 'address' },
  { name: 'nonce', type: 'uint256' },
  { name: 'expiry', type: 'uint256' },
  { name: 'allowed', type: 'bool' },
]

const createTypedAllowedData = (message: PermitAllowedMessage, domain: Domain) => ({
  types: { EIP712Domain, Permit: PERMIT_ALLOWED_TYPE },
  primaryType: 'Permit',
  domain,
  message,
})

const createTypedAmountData = (message: PermitAmountMessage, domain: Domain) => ({
  types: { EIP712Domain, Permit: EIP2612_TYPE },
  primaryType: 'Permit',
  domain,
  message,
})

export type SignedPermitAmount = PermitAmountMessage & RSV
export type SignedPermitAllowed = PermitAllowedMessage & RSV

export interface RSV {
  r: string
  s: string
  v: number
}

export const signData = async (
  signer: Wallet,
  fromAddress: string,
  typeData: any,
): Promise<RSV> => {
  const signerAddress = await signer.getAddress()
  if (signerAddress.toLowerCase() !== fromAddress.toLowerCase()) {
    throw new Error('Signer address does not match requested signing address')
  }

  const { EIP712Domain: _unused, ...types } = typeData.types
  console.log(signer)
  const signature = await signer._signTypedData(typeData.domain, types, typeData.message)
  const a = splitSignature(signature)
  const r = '0x' + signature.substring(2).substring(0, 64)
  const s = '0x' + signature.substring(2).substring(64, 128)
  const v = parseInt(signature.substring(2).substring(128, 130), 16)
  console.log(a.r === r, a.v === v, a.s === s)

  return { r, s, v: a.v }
}

const fetchTokenNameAndNonce = async (userAddress, tokenAddress, provider) => {
  const tokenContract = new Contract(
    tokenAddress,
    [
      'function nonces(address) public view returns (uint256)',
      'function name() external view returns (string)',
    ],
    provider,
  )
  const [name, nonce] = await Promise.all([tokenContract.name(), tokenContract.nonces(userAddress)])
  return { name, nonce }
}

export const signPermitAllowed = async (
  signer: Signer,
  currencyAmount: CurrencyAmount<Token>,
  spenderAddress: string,
  deadline: number,
): Promise<SignedPermitAllowed> => {
  const tokenAddress = currencyAmount.currency.address
  const [userAddress, chainId] = await Promise.all([signer.getAddress(), signer.getChainId()])
  const { name, nonce } = await fetchTokenNameAndNonce(userAddress, tokenAddress, signer.provider)
  const domain = { name, version: '1', chainId, verifyingContract: tokenAddress }

  const message: PermitAllowedMessage = {
    holder: userAddress,
    spender: spenderAddress,
    nonce,
    expiry: deadline,
    allowed: true,
  }

  const typedData = createTypedAllowedData(message, domain)
  const sig = await signData(signer as Wallet, userAddress, typedData)

  return { ...sig, ...message }
}

export const signPermitAmount = async (
  signer: Signer,
  currencyAmount: CurrencyAmount<Token>,
  spenderAddress: string,
  deadline: number,
): Promise<SignedPermitAmount> => {
  const tokenAddress = currencyAmount.currency.address
  const [userAddress, chainId] = await Promise.all([signer.getAddress(), signer.getChainId()])
  const value = currencyAmount.quotient.toString()
  const { name, nonce } = await fetchTokenNameAndNonce(userAddress, tokenAddress, signer.provider)
  const domain = { name, version: '1', chainId, verifyingContract: tokenAddress }

  const message: PermitAmountMessage = {
    owner: userAddress,
    spender: spenderAddress,
    nonce,
    deadline,
    value,
  }

  const typedData = createTypedAmountData(message, domain)
  const sig = await signData(signer as Wallet, userAddress, typedData)

  return { ...sig, ...message }
}
