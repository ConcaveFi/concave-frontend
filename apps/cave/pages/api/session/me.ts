import { getSessionCookie } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== 'GET')
    return res.setHeader('Allow', ['GET']).status(405).end(`Method ${method} Not Allowed`)

  const user = getSessionCookie(req)?.user
  if (!user) return res.status(401).json({ message: `You're not connected` })

  res.json(user)
}

export default handler
