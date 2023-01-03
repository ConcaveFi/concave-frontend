import { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body) return res.status(200).json([])
  const payload: ReportBody = JSON.parse(req.body)
  const body = buildBody(payload)
  const [webhookKey, webhookToken] = getWebhookConfig(payload.extra.pathname)
  const result = await sendToDiscord(body, webhookKey, webhookToken)
  res.status(200).json(result)
}

const discord_channel_webhook = {
  "/gemswap": [env.NEXT_PUBLIC_DISCORD_GEMSWAP_ID, env.NEXT_PUBLIC_DISCORD_GEMSWAP_TOKEN],
  "/smart-bonding": [env.NEXT_PUBLIC_DISCORD_SMART_BONDING_ID, env.NEXT_PUBLIC_DISCORD_SMART_BONDING_TOKEN],
  "/liquid-stake-positions": [env.NEXT_PUBLIC_DISCORD_LIQUID_STAKING_POSITIONS_ID, env.NEXT_PUBLIC_DISCORD_LIQUID_STAKING_POSITIONS_TOKEN],
  "/marketplace": [env.NEXT_PUBLIC_DISCORD_MARKETPLACE_ID, env.NEXT_PUBLIC_DISCORD_MARKETPLACE_TOKEN],
  "/addliquidity": [env.NEXT_PUBLIC_DISCORD_ADDLIQUIDITY_ID, env.NEXT_PUBLIC_DISCORD_ADDLIQUIDITY_TOKEN],
  "/pools": [env.NEXT_PUBLIC_DISCORD_POOLS_ID, env.NEXT_PUBLIC_DISCORD_POOLS_TOKEN],
  "/liquid-staking": [env.NEXT_PUBLIC_DISCORD_LIQUID_STAKING_ID, env.NEXT_PUBLIC_DISCORD_LIQUID_STAKING_TOKEN]
}

const getWebhookConfig = (pathname: string) => {
  return discord_channel_webhook[pathname] || [
    env.NEXT_PUBLIC_DISCORD_WEBHOOK_ID,
    env.NEXT_PUBLIC_DISCORD_WEBHOOK_TOKEN
  ]
}
export type ReportBody = { userDescription?: string; error: string, extra: Record<string, string> }
export type DiscordPayload = ReturnType<typeof buildBody>
const buildBody = ({ extra, error }: ReportBody) => {
  const content = `User reported an error
  \`\`\`
  ${error}
  \`\`\`  
  `
  const entry = Object.entries(extra)
  const fields = entry.filter(([, value]) => value).map(([name, value]) => ({ name, value }))
  return {
    content,
    embeds: [
      {
        color: 5814783,
        fields,
        author: {
          name: 'Concave Frontend',
        },
      },
    ],
    username: 'Frontend problem',
    avatar_url: 'https://app.concave.lol/assets/concave/logomark.svg',
    attachments: [],
  } as const
}

const sendToDiscord = async (body: DiscordPayload, webhookKey: string, webhookToken: string) => {
  const discordWebhook = `https://discord.com/api/v10/webhooks/${webhookKey}/${webhookToken}?wait=true`
  const request = await fetch(discordWebhook, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
    method: 'POST',
  })
  const data = await request.json()
  return data
}

export default handler
