import { encryptSession } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import logoutHandler from 'pages/api/session/logout'
import { createMocks } from 'node-mocks-http'
import { parse } from 'cookie'

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

describe('/api/session/logout', () => {
  it('should erase session cookie on GET request', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      cookies: { session: encryptSession(session) },
    })

    await logoutHandler(req, res)

    expect(res.statusCode).toBe(200)
    expect(parse(res.getHeader('Set-Cookie')).session).toBeFalsy()
  })
})
