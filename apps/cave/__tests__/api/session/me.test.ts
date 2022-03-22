import { encryptSession } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import meHandler from 'pages/api/session/me'
import { createMocks } from 'node-mocks-http'

const session = {
  user: {
    address: 'daqeqd1d',
    id: '1223',
  },
  siwe: {
    address: 'daqeqd1d',
    nonce: '213r14',
  },
  nonce: '213r14',
}

describe('/api/session/me', () => {
  it('should retrieve user from cookie', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      cookies: { session: encryptSession(session) },
    })

    await meHandler(req, res)

    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual(session.user)
  })

  it('should error when not loged in', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      cookies: { session: encryptSession({ nonce: '312312' }) },
    })

    await meHandler(req, res)

    expect(res.statusCode).toBe(401)
    expect(res._getJSONData().message).toBe(`You're not connected`)
  })
})
