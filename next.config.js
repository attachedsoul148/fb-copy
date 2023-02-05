/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['platform-lookaside.fbsbx.com', 'firebasestorage.googleapis.com', 'i.pinimg.com'],
  },
}

module.exports = nextConfig