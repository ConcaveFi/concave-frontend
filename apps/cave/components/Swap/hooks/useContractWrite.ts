import * as React from 'react'
import { CallOverrides, ethers } from 'ethers'
import { TransactionResponse } from '@ethersproject/providers'
import { ConnectorNotFoundError, UserRejectedRequestError } from 'wagmi-core'
import { useContract, useContext } from 'wagmi'

type Config = {
  /** Arguments to pass contract method */
  args?: any | any[]
  overrides?: CallOverrides
}

type State = {
  response?: TransactionResponse
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

type Callback = () => void

const useCancel = () => {
  const cancelCallback = React.useRef<Callback | null>(null)

  React.useEffect(() => {
    return () => cancelCallback.current?.()
  }, [])

  const cancel = React.useCallback((callback?: Callback) => {
    cancelCallback.current?.()
    if (callback) cancelCallback.current = callback
  }, [])

  return cancel
}

export const useContractWrite = <Contract extends ethers.Contract = ethers.Contract>(
  contractConfig,
  //   functionName: string,
  { args, overrides }: Config = {},
) => {
  const {
    state: { connector },
  } = useContext()

  const contract = useContract<Contract>(contractConfig)
  const [state, setState] = React.useState<State>(initialState)

  const cancelQuery = useCancel()
  const write = React.useCallback(
    async (
      functionName: string,
      config?: {
        args?: Config['args']
        overrides?: Config['overrides']
      },
    ) => {
      let didCancel = false
      cancelQuery(() => {
        didCancel = true
      })

      try {
        const config_ = config ?? { args, overrides }
        if (!connector) throw new ConnectorNotFoundError()
        const params = [
          ...(Array.isArray(config_.args) ? config_.args : config_.args ? [config_.args] : []),
          ...(config_.overrides ? [config_.overrides] : []),
        ]

        setState((x) => ({
          ...x,
          error: undefined,
          loading: true,
          response: undefined,
        }))
        const signer = await connector.getSigner()
        const contract_ = contract.connect(signer)
        const response = (await contract_[functionName](...params)) as TransactionResponse
        if (!didCancel) {
          setState((x) => ({ ...x, loading: false, response }))
        }
        return { data: response, error: undefined }
      } catch (error_) {
        let error: Error = <Error>error_
        if ((<ProviderRpcError>error_).code === 4001) error = new UserRejectedRequestError()
        if (!didCancel) {
          setState((x) => ({ ...x, error, loading: false }))
        }
        return { data: undefined, error }
      }
    },
    [args, cancelQuery, connector, contract, overrides],
  )

  return [
    {
      data: state.response,
      error: state.error,
      loading: state.loading,
    },
    write,
  ] as const
}
