import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body) return res.status(200).json([])
  const body = buildBody(JSON.parse(req.body))
  const result = await sendToDiscord(JSON.stringify(body))
  res.status(200).json(result)
}

export type ReportBody = { userDescription?: string; error: string, extra: Record<string, string> }

const buildBody = ({ extra, error }: ReportBody) => {
  const content = `User reported an error
  \`\`\`
  ${error}
  \`\`\`  
  `
  const entry = Object.entries(extra)
  const fields = entry.filter(a => a[1]).map((a) => ({ name: a[0], value: a[1] }))
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
  }
}
const sendToDiscord = async (body: string) => {
  const discordWebhook = `https://discord.com/api/v10/webhooks/${process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_ID}/${process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_TOKEN}?wait=true`
  const request = await fetch(discordWebhook, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body,
    method: 'POST',
  })
  const data = await request.json()
  return data
}

export default handler
