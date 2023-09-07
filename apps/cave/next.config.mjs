import BundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} **/
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      { source: '/', destination: '/gemswap' },
      { source: '/swap', destination: '/gemswap' },
    ]
  },
  async redirects() {
    return [{ source: '/treasury', destination: '/transparency', permanent: true }]
  },
  transpilePackages: [
    '@concave/core',
    '@concave/gemswap-sdk',
    '@concave/marketplace',
    '@concave/icons',
    '@concave/ui',
  ],
}

export default withBundleAnalyzer(nextConfig)
