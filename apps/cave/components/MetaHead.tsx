import NextHead from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

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
  const currentRoute = router.route.substring(1, undefined)
  const meta: MetaProps = {
    title: metaData[currentRoute].title,
    description: metaData[currentRoute].description,
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
    </NextHead>
  )
}

const metaData = {
  addliquidity: {
    title: 'Concave | Add Liquidity',
    description: `Add liquidity to Concave's liquidity pool to earn fees.`,
  },
  dashboard: {
    title: 'Concave | Dashboard',
    description: `You can use the Dashboard to claim dividends and manage your Liquid NFT positions.`,
  },
  gemswap: {
    title: 'Concave | Gemswap (AMM)',
    description: `Concave's AMM allows LPs to deploy deep liquidity for different pairs and allows LPs to earn more with less capital. The AMM has cheaper gas fees and swap fees.`,
  },
  'liquid-staking': {
    title: `Concave | Liquid Staking`,
    description: `With Liquid Staking, positions receive boosted rewards based on term length. Investors in the longest-term positions will receive the highest returns.`,
  },
  marketplace: {
    title: 'Concave | NFT Marketplace',
    description: `Trade your Liquid Staking positions and other NFTs in Concave's marketplace.`,
  },
  pools: {
    title: 'Concave | Liquidity Pools',
    description: `View your Liquidity Pool Positions and add liquidity to Concave supported pools. It is a pool of two tokens that allows users to exchange between them.`,
  },
  'smart-bonding': {
    title: 'Concave | Bonding',
    description: `Concave's Smart Bonding offers capital efficient bonds for virtually any ERC20 token, pricing and issuance model, which is optimized by an off-chain algorithm.`,
  },
  treasury: {
    title: 'Concave | Treasury',
    description: `Concave has treasury strategies to take advantage of yield opportunities. It is broken down into Investment Research, Delta Neutral, and Stable Farm strategies.`,
  },
}
