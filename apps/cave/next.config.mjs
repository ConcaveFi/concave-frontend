import BundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** * @type {import('next').NextConfig} **/
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['cdn.jsdelivr.net', 'registry.walletconnect.org'],
  },
  // webpack: (config) => {
  //   config.plugins.push(new DuplicatePackageCheckerPlugin())
  //   return config
  // },
  productionBrowserSourceMaps: true,
  async rewrites() {
    return [
      { source: '/', destination: '/gemswap' },
      { source: '/swap', destination: '/gemswap' },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)
