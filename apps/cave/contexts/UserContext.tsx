import React, { createContext, useContext } from 'react'
import { useQuery } from 'react-query'

const authFetch = (path: string, options?: RequestInit) =>
  fetch(`/api/session/${path}`, options).then((res) => res.json())

interface UserValue {
  user: { address: string }
  isLoading: boolean
  isSuccess: boolean
}

const UserContext = createContext({} as UserValue)

export const UserProvider: React.FC = ({ children }) => {
  const user = useQuery('me', () => authFetch('me'), { refetchOnWindowFocus: true })
  return (
    <UserContext.Provider value={{ user: user.data, ...user }}>{children}</UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

export default UserContext
