import { useDisclosure } from '@concave/ui'
import { ConnectWalletModal } from 'components/ConnectWallet'
import { Signer } from 'ethers'
import { User } from 'lib/session'
import React, { createContext, useContext, useMemo } from 'react'
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
  /** pops up a modal with connector providers */
  connectWithModal: () => void
  user: User
  isWaitingForSignature: boolean
  isSignedIn: boolean
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

  const connectModal = useDisclosure()

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          signOut: signOut.mutateAsync,
          signIn: signIn.mutateAsync,
          connectWithModal: () => connectModal.onOpen(),
          // user can connect and not sign in, we want access to his addy thru here anyway
          user: { ...user.data, address: user.data?.address || account.data?.address },
          isWaitingForSignature: signIn.isLoading,
          isConnected: !account.loading && !!account.data?.address,
          isSignedIn: !!user.data,
          error: signIn.error || signOut.error,
          isErrored: !!(signIn.error || signOut.error),
        }),
        [user, account, signIn, signOut, connectModal],
      )}
    >
      <ConnectWalletModal isOpen={connectModal.isOpen} onClose={connectModal.onClose} />
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
