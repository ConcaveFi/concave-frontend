import { useDisclosure } from '@concave/ui'
import { useRouter } from 'next/router'
import { createContext, useContext } from 'react'

interface AirdropContextProps {
  onOpen: VoidFunction
}
const AirdropContext = createContext<AirdropContextProps>({
  onOpen: () => {},
})

export function AirdropProvider({ children }) {
  const router = useRouter()

  return (
    <AirdropContext.Provider
      value={{
        onOpen: () => router.push({ pathname: `/user-dashboard`, query: { view: 'Airdrop' } }),
      }}
    >
      {children}
    </AirdropContext.Provider>
  )
}
export const useAirdrop = () => useContext(AirdropContext)
