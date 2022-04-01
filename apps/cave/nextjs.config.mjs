/** * @type {import('next').NextConfig} **/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
