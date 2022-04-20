/** * @type {import('next').NextConfig} **/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [{ source: '/', destination: '/swap' }]
  },
}

export default nextConfig
