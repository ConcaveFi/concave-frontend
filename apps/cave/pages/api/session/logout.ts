import { destroySession } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== 'GET')
    return res.setHeader('Allow', ['GET']).status(405).end(`Method ${method} Not Allowed`)

  destroySession(res)

  res.send({ ok: true })
}

export default handler
