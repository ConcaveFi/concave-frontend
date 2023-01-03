import { detect } from 'detect-browser'
import { useContext, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { ErrorModalContext } from './ErrorModalContext'
import { sendReport } from './sendReport'

export const useErrorModal = () => {
  const errorContext = useContext(ErrorModalContext)
  const { name, os, version } = detect()
  const chain = useNetwork()
  const account = useAccount()
  const [username, setUsername] = useState('anonymous')
  const error = errorContext.error || {}
  const infos = {
    Address: account?.address,
    Wallet: account?.connector?.name,
    OS: os,
    Browser: `${name} ${version}`,
    Chain: chain.chain?.name,
    Discord: username,
  }
  return {
    infos,
    error,
    username,
    isOpen: errorContext.isOpen,
    setUsername,
    onOpen: errorContext.onOpen,
    onClose: errorContext.onClose,
    onConfirm: (report: { userDescription: string; extra: Record<string, string> }) => {
      sendReport({
        userDescription: report.userDescription,
        error: JSON.stringify(error),
        extra: { ...errorContext.extra, ...infos, ...report.extra },
      })
      errorContext.onClose()
    },
  }
}
