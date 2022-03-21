import { ethers } from 'ethers'
import { decryptSession, encryptSession, getSessionCookie, serializeSession } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import verifyHandler, { InvalidNonceError } from 'pages/api/session/verify'
import { ErrorTypes, SiweMessage } from 'siwe'
import { createMocks } from 'node-mocks-http'
import nock from 'nock'
import { parse } from 'cookie'

const createSiweMessage = ({ address, nonce }: { nonce: string; address: string }) =>
  new SiweMessage({
    domain: 'concave.lol',
    address,
    statement: `Sign in to Concave`,
    uri: 'https://concave.lol',
    version: '1',
    chainId: 1,
    nonce,
  })

const interceptHasura = (operationName) =>
  nock(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT).post('', (b) => b.operationName === operationName)

describe('/api/session/verify', () => {
  beforeAll(() => nock.disableNetConnect())
  afterAll(() => nock.enableNetConnect())
  afterEach(() => nock.cleanAll())

  it('fails on wrong nonce', async () => {
    const wallet = ethers.Wallet.createRandom()
    const siweMessage = createSiweMessage({ address: wallet.address, nonce: '1asd31eaws' })
    const message = siweMessage.prepareMessage()
    const signature = await wallet.signMessage(message)

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      cookies: {
        session: encryptSession({ nonce: `${siweMessage.nonce}2edwqa` /* wrong nonce */ }),
      },
      body: { message, signature },
    })

    await verifyHandler(req, res)

    expect(res.statusCode).toBe(422)
    expect(res._getJSONData()).toEqual({ ok: false, message: InvalidNonceError.message })
  })

  it('fails on wrong signature', async () => {
    const wallet1 = ethers.Wallet.createRandom()
    const wallet2 = ethers.Wallet.createRandom()
    const siweMessage = createSiweMessage({ address: wallet1.address, nonce: '1asd31eaws' })
    const message = siweMessage.prepareMessage()
    const signature = await wallet2.signMessage(message)

    /*
      generates message with wallet1 address and signs it with wallet2
    */

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      cookies: { session: encryptSession({ nonce: siweMessage.nonce }) },
      body: { message, signature },
    })

    await verifyHandler(req, res)

    expect(res.statusCode).toBe(422)
    expect(res._getJSONData()).toEqual({
      ok: false,
      message: `${ErrorTypes.INVALID_SIGNATURE}: ${wallet2.address} !== ${wallet1.address}`,
    })
  })

  it('return user and set session cookie when message, signature & nonce matches', async () => {
    const wallet = ethers.Wallet.createRandom()
    const siweMessage = createSiweMessage({ address: wallet.address, nonce: '1asd31eaws' })
    const message = siweMessage.prepareMessage()
    const signature = await wallet.signMessage(message)

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      cookies: { session: encryptSession({ nonce: siweMessage.nonce }) },
      body: { message, signature },
    })

    const user = { id: 'asda', address: wallet.address }
    interceptHasura('UserByAddress').reply(200, { data: { user: [user] } })

    await verifyHandler(req, res)

    expect(res.statusCode).toBe(200)
    expect(decryptSession(parse(res.getHeader('Set-Cookie')).session)).toEqual({
      ...getSessionCookie(req),
      siwe: await siweMessage.validate(signature),
      user,
    })
    expect(res._getJSONData()).toEqual({ ok: true, user })
  })

  it('create user when it does not exist', async () => {
    const wallet = ethers.Wallet.createRandom()
    const siweMessage = createSiweMessage({ address: wallet.address, nonce: '1asfa13eaws' })
    const message = siweMessage.prepareMessage()
    const signature = await wallet.signMessage(message)

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      cookies: { session: encryptSession({ nonce: siweMessage.nonce }) },
      body: { message, signature },
    })

    const user = { id: 'asda', address: wallet.address }
    interceptHasura('UserByAddress').reply(200, { data: { user: [] } }) // return empty array === user not found
    interceptHasura('InsertUser').reply(200, { data: { insert_user_one: user } }) // return new user

    await verifyHandler(req, res)

    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ ok: true, user })
  })
})
