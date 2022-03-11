import React, { createContext, useContext } from 'react'
import { useMutation, useQuery } from 'react-query'
import { SiweMessage } from 'siwe'
import { Connector, useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi'

const authFetch = (path: string, options?: RequestInit) =>
  fetch(`/api/session/${path}`, options).then((res) => res.json())

const createSiweMessage = async (address: string, chainId: number) => {
  const { nonce } = await authFetch('nonce')
  return new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign in to concave',
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
  user?: { address: string }
  error?: any
  signIn: () => Promise<any>
  signOut: () => Promise<any>
  isSignedIn: boolean
  isConnected: boolean
  isErrored: boolean
}

const AuthContext = createContext({} as AuthValue)

const siweSignIn = async ({ address, chainId, signMessage }) => {
  // Create message
  const message = await createSiweMessage(address, chainId)

  // Sign message
  const signature = await signMessage({ message })
  if (signature.error) throw signature.error

  // Verify signature
  const verification = await verifySignature(message, signature.data)
  if (!verification.ok) throw new Error('Error verifying message')
}

export const AuthProvider: React.FC = ({ children }) => {
  const [account, disconnect] = useAccount()

  const signIn = useMutation(async () => {
    const connector = account.data.connector
    const signer = await connector.getSigner()
    await siweSignIn({
      address: await signer.getAddress(),
      chainId: await connector.getChainId(),
      signMessage: signer.signMessage,
    })
  })
  const signOut = useMutation(() => {
    disconnect()
    return authFetch('logout')
  })

  const user = useQuery('me', () => authFetch('me'), { refetchOnWindowFocus: true })

  const isSignedIn = user.data || signIn.isSuccess
  const isConnected = !account.loading && !!account.data?.address
  const error = user.error || signIn.error || signOut.error

  return (
    <AuthContext.Provider
      value={{
        signOut: signOut.mutateAsync,
        signIn: signIn.mutateAsync,
        user: user.data,
        error,
        isSignedIn,
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
