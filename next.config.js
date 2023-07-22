/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // output: 'export',
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
