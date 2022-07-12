import NextHead from 'next/head'
import { useRouter } from 'next/router'

export const HOST_URL = 'https://app.concave.lol/app'
export const TWITTER_USER = '@concavefi'

export interface MetaProps {
  description?: string
  image?: string
  title: string
  type?: string
}

export const MetaHead = ({ meta: _meta }: { meta?: MetaProps }): JSX.Element => {
  const router = useRouter()
  const meta: MetaProps = {
    title: 'Concave | Exchange (AMM)',
    description:
      'A capital efficient, low slippage and high liquidity AMM, Concave Exchange offers traders deeper liquidity and allows liquidity providers to earn more with less capital investment.',
    image: `${HOST_URL}/assets/concave/ConcavePreview.png`,
    type: 'website',
    ..._meta,
  }

  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${HOST_URL}${router.asPath}`} />
      <link rel="canonical" href={`${HOST_URL}${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Concave" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_USER} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      <link rel="shortcut icon" href="/assets/tokens/cnv.svg" />
      <meta name="theme-color" content="#141414" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    </NextHead>
  )
}
