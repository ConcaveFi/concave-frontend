import { ERC20_ABI } from 'constants/abi'
import { Contract } from 'ethers'
import { concaveProvider } from 'lib/providers'
import { useState, useEffect } from 'react'
import { CHAIN_NAME } from 'gemswap-sdk'

interface injectedToken {
  tokenAddress: string
  tokenChainId: number
  tokenImage?: string
}

export interface injectedTokenResponse {
  data: boolean
  loading: boolean
  error: boolean
  addingToWallet: () => void
}

/**
 * tool to transform a number to a hex value for chain Id
 */
export const toHex = (num: number) => {
  return '0x' + num.toString(16)
}

/**
 * useAddToken({injectedToken}) to let the user add a token to his wallet.
 * You need to triger the onClick with "adding" and provide an object of injectedToken
 * it will check on chain the tokenAddress/tokenchainId to get symbol/decimals.
 * will also check for token image on ConcaveFi/assets from blochain/token-address
 */
const useAddTokenToWallet = ({ tokenAddress, tokenChainId, tokenImage }: injectedToken) => {
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [addingIndex, setAddingIndex] = useState(0)

  const addingToWallet = () => setAddingIndex((prevAddingIndex) => prevAddingIndex + 1)

  useEffect(() => {
    if (addingIndex >= 1) {
      setLoading(true)
      const addToken = async () => {
        if (typeof window.ethereum === 'undefined') return
        try {
          const getToken = async () => {
            const fetcher = concaveProvider(tokenChainId)
            const contractInstance = new Contract(tokenAddress, ERC20_ABI, fetcher)
            return contractInstance
          }

          const getTokenInfo: any = async () => {
            try {
              const token = await getToken()
              const [symbol, decimals] = await Promise.all([
                token.symbol() as string,
                token.decimals() as string,
              ])
              return { symbol, decimals } as any
            } catch (error) {
              console.log(`This token doesn't exist on chain id ${tokenChainId}`)
            }
            return { symbol, decimals } as any
          }

          const { symbol, decimals } = await getTokenInfo()
          if (symbol === undefined) return

          const chainIdUser = await window.ethereum?.request({
            method: 'eth_chainId',
          })

          const switchNetwork = async () => {
            await window.ethereum?.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: toHex(tokenChainId) }],
            })
          }

          const image = `https://raw.githubusercontent.com/ConcaveFi/assets/master/blockchains/${CHAIN_NAME[tokenChainId]}/assets/${tokenAddress}/logo.png`

          const addToWallet = async (symbol: string, decimals: number) => {
            await window.ethereum?.request({
              method: 'wallet_watchAsset',
              params: {
                type: 'ERC20',
                options: {
                  address: tokenAddress,
                  symbol,
                  decimals,
                  image,
                },
              },
            })
          }

          if (chainIdUser !== toHex(tokenChainId)) await switchNetwork()
          await addToWallet(symbol, decimals)

          setLoading(false)
          setData(true)
        } catch (error: any) {
          setLoading(false)
          setError(!!error)
          setData(false)
          if (error.code === 4902) {
            alert("It'seems you don't have a Web3 wallet!")
          }
        }
      }
      addToken()
    }
  }, [addingIndex, tokenAddress, tokenChainId, tokenImage])

  return { data, loading, error, addingToWallet } as injectedTokenResponse
}

export default useAddTokenToWallet
