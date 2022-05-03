/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ['res.cloudinary.com'] },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/resume',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
