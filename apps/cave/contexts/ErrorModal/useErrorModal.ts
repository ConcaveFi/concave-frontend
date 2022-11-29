import { useContext } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { ErrorModalContext } from './ErrorModalContext'
import { sendReport } from './sendReport'
import { detect } from 'detect-browser'
import { info } from 'console'

export const useErrorModal = () => {
  const errorContext = useContext(ErrorModalContext)
  const { name, os, version } = detect();
  const chain = useNetwork()
  const account = useAccount()
  const error = errorContext.error || {}
  const infos = {
    Address: account?.address,
    Wallet: account?.connector?.name,
    OS: os,
    Browser: `${name} ${version}`,
    Chain: chain.chain?.name,
    Contract: error.transaction?.to || '',
    Method: error.method,
    Reason: error.reason,
    Code: error.code,
  }
  return {
    infos,
    error,
    isOpen: errorContext.isOpen,
    onOpen: errorContext.onOpen,
    onClose: errorContext.onClose,
    onConfirm: (report: { userDescription: string, extra: Record<string, string> }) => {
      sendReport({
        userDescription: report.userDescription,
        extra: { ...errorContext.extra, error: JSON.stringify(error), ...infos, ...report.extra }
      })
      errorContext.onClose()
    },
  }
}
