/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force dynamic rendering since app uses client-side features (dark mode, localStorage)
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig
