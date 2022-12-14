import { Modal, useDisclosure } from '@concave/ui'
import { createContext, ReactNode, useState } from 'react'
import { ReportErrorModal } from './ErrorModal'

type TransactionError = {
  reason: string
  method: string
  code: string
  transaction: { from: string; to: string }
} | "Failed or Rejected Request"
type ErrorModalContextType = {
  isOpen: boolean
  extra?:Record<string, string>,
  onOpen: (e: unknown, extra?:Record<string, string>) => void
  onClose: () => void
  error: Partial<TransactionError>
}

export const ErrorModalContext = createContext<ErrorModalContextType>({} as ErrorModalContextType)

const useErrorHandle = () => {
  const modalInfo = useDisclosure()
  const [error, setError] = useState<Partial<TransactionError>>()
  const [extra, setExtraInfo] = useState<Record<string, string>>()
  const onOpen = (e: TransactionError, extra?: Record<string, string>) => {
    if ( typeof e === "string" && e.includes("Failed or Rejected Request")) return
    const { host, pathname } = location
    setError(e)
    setExtraInfo({ ...extra, host, pathname })
    modalInfo.onOpen()
  }
  return {
    error,
    extra,
    ...modalInfo,
    onOpen,
    isOpen: modalInfo.isOpen,
  }
}

export const ErrorModalProvider = ({ children }: { children: ReactNode }) => {
  const errorHandle = useErrorHandle()
  return (
    <ErrorModalContext.Provider value={errorHandle}>
      <ReportErrorModal />      
      {children}
    </ErrorModalContext.Provider>
  )
}
