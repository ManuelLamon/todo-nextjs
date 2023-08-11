/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp'],
  },
  reactStrictMode: false,
  env: {
    API: 'http://localhost:8090',
    API2: 'http://localhost:8090/api'
  },
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
}

module.exports = nextConfig
