import { NextApiRequest, NextApiResponse } from 'next'
import nonceHandler from 'pages/api/session/nonce'
import { createMocks } from 'node-mocks-http'
import { parse } from 'cookie'
import { decryptSession } from 'lib/session'

describe('/api/session/nonce', () => {
  it('return new nonce and set session cookie', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>()

    await nonceHandler(req, res)

    expect(res.statusCode).toBe(200)
    expect(decryptSession(parse(res.getHeader('Set-Cookie')).session).nonce).toBe(
      res._getJSONData().nonce,
    )
  })
})
