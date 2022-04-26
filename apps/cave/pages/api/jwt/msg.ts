import { getSession } from 'next-auth/react'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (session) {
    res.send({
      content: 'You can access this alfa 🚰 because you are signed in.',
    })
  } else {
    res.send({
      content: 'You must be signed in to view the private message.',
    })
  }
}

export default handler
