/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '*/**'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/payment/:path*',
        destination: 'https://pay.payos.vn/:path*',
        permanent: false
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/payment/:path*',
        destination: 'https://pay.payos.vn/:path*'
      }
    ]
  }
}

export default nextConfig
