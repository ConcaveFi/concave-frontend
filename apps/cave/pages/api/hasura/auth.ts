import { decryptSession } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  // TODO: add cors for only hasura

  if (method !== 'GET')
    return res.setHeader('Allow', ['GET']).status(405).end(`Method ${method} Not Allowed`)

  const encryptedSiwe = req.headers.authorization
  const session = decryptSession(encryptedSiwe)
  if (!session) return res.status(401).json({ message: `You're not connected` })

  const { role, id } = session.hasura

  res.json({
    'X-Hasura-Role': role || 'user',
    'X-Hasura-User-Id': id,
  })
}

export default handler
