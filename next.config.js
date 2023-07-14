/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    API_KEY: process.env.APIKEY,
    AUTH_DOMAIN: process.env.AUTHDOMAIN,
    PROJECT_ID: process.env.PROJECTID,
    STORAGEBUCKET: process.env.STORAGEBUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGINGSENDERID,
    APP_ID: process.env.APPID,
  },
}

module.exports = nextConfig
