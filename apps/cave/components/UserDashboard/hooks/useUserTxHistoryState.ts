import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'
import { DashItem } from '../Summary/TxHistory/DashItem.type'

export const useUserTxHistoryState = () => {
  const { address } = useAccount()
  return useQuery('userTxHistoryState', async () => await fetchData({ address: address }))
}

async function fetchData(bodyData: object) {
  const response = await fetch('https://devcnv-userdashboard.vercel.app/api/get-tx', {
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  })
  const responseJson = await response.json()
  const data = responseJson.data
  if (data.status === 400) {
    throw new Error(data.msg)
  }
  return data as DashItem[]
}
