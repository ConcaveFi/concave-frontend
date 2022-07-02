/** * @type {import('next').NextConfig} **/
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
}

export default nextConfig
