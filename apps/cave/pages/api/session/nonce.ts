import { NextApiRequest, NextApiResponse } from 'next'
import { generateNonce } from 'siwe'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== 'GET')
    return res.setHeader('Allow', ['GET']).status(405).end(`Method ${method} Not Allowed`)
  return res.send({ nonce: generateNonce() })
}

export default handler
