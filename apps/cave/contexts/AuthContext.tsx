import React, { createContext, useContext } from 'react'
import { useMutation, useQuery } from 'react-query'
import { SiweMessage } from 'siwe'
import { Connector, useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi'

const authFetch = (path: string, options?: RequestInit) =>
  fetch(`/api/session/${path}`, options).then((res) => res.json())

const createSiweMessage = async (address: string, chainId: number) => {
  const { nonce } = await authFetch('nonce')
  console.log(nonce)
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
  error?: any
  signIn: (connector: Connector) => Promise<any>
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
  const signature = await signMessage(message)
  // if (signature.error) throw signature.error

  console.log(signature)

  // Verify signature
  const verification = await verifySignature(message, signature)
  if (!verification.ok) throw new Error('Error verifying message')
}

export const AuthProvider: React.FC = ({ children }) => {
  const [account, disconnect] = useAccount()
  const [, connect] = useConnect()

  const signIn = useMutation(async (connector: Connector) => {
    // const connector = account.data.connector

    const res = await connect(connector)
    if (!res.data) throw res.error ?? new Error('Something went wrong')

    const signer = await connector.getSigner()
    await siweSignIn({
      address: res.data.account,
      chainId: res.data.chain.id,
      signMessage: (m) => signer.signMessage(m),
    })
  })
  const signOut = useMutation(() => {
    disconnect()
    return authFetch('logout')
  })

  const isSignedIn = signIn.isSuccess
  const isConnected = !account.loading && !!account.data?.address
  const error = signIn.error || signOut.error

  return (
    <AuthContext.Provider
      value={{
        signOut: signOut.mutateAsync,
        signIn: signIn.mutateAsync,
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
