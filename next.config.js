/** @type {import('next').NextConfig} */
const nextConfig = {
  
  output: 'export',
  reactStrictMode: true,
  basePath: "/money-kit-ui",
  images: {
    unoptimized: true,
    domains: ['avatars.githubusercontent.com'],
  },
  webpack: (config) => {
    config.experiments = { 
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true
    }
    return config
  },
    env:{
    BLOCKFROST_KEY: process.env.BLOCKFROST_KEY,
    API_URL: process.env.API_URL,
    NETWORK: process.env.NETWORK
  }
}

module.exports = nextConfig
