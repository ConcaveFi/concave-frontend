import { Signer } from 'ethers'
import { User } from 'lib/session'
import React, { createContext, useContext } from 'react'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import { SiweMessage } from 'siwe'
import { useAccount } from 'wagmi'

export const authFetch = (path: string, options?: RequestInit) =>
  fetch(`/api/session/${path}`, options).then(async (res) => {
    const data = await res.json()
    if (res.status !== 200) throw data.message
    return data
  })

const createSiweMessage = async (address: string, chainId: number) => {
  const { nonce } = await authFetch('nonce')
  return new SiweMessage({
    domain: window.location.host,
    address,
    statement: `Sign in to Concave`,
    uri: window.location.origin,
    version: '1',
    chainId,
    nonce,
  }).prepareMessage()
}

const verifySignature = async (message: string, signature: string) =>
  authFetch('verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })

interface AuthValue {
  error?: any
  signIn: () => Promise<any>
  signOut: () => Promise<any>
  user: User
  isWaitingForSignature: boolean
  isConnected: boolean
  isErrored: boolean
}

const AuthContext = createContext({} as AuthValue)

const siweSignIn = async (signer: Signer) => {
  const address = await signer.getAddress()
  const chainId = await signer.getChainId()

  // Create message
  const message = await createSiweMessage(address, chainId)

  // Sign message
  const signature = await signer.signMessage(message)

  // Verify signature
  const verification = await verifySignature(message, signature)
  if (!verification.ok) throw new Error('Error verifying message')

  return verification.user
}

export const AuthProvider: React.FC = ({ children }) => {
  const [account, disconnect] = useAccount()

  const queryClient = useQueryClient()

  const signIn = useMutation(
    async () => {
      const connector = account.data?.connector
      if (!account.data.connector) return

      const signer = await connector.getSigner()
      const user = await siweSignIn(signer)

      return user
    },
    {
      onSuccess: (user) => {
        queryClient.setQueryData('me', () => user)
        queryClient.invalidateQueries('me')
      },
    },
  )

  const signOut = useMutation(
    () => {
      disconnect()
      return authFetch('logout')
    },
    {
      onSuccess: async () => {
        await queryClient.cancelQueries('me')
        queryClient.setQueryData('me', () => null)
      },
    },
  )

  const user = useQuery('me', () => authFetch('me'), { retry: false, refetchOnWindowFocus: true })

  const isConnected = !account.loading && !!account.data?.address
  const error = signIn.error || signOut.error

  return (
    <AuthContext.Provider
      value={{
        signOut: signOut.mutateAsync,
        signIn: signIn.mutateAsync,
        user: user.data,
        error,
        isWaitingForSignature: signIn.isLoading,
        isConnected,
        isErrored: !!error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
