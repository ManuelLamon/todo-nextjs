/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['todo.alocashfintech.com', 'images.unsplash.com'],
  },
  reactStrictMode: false,
  env: {
    API: 'http://todo.alocashfintech.com',
    API2: 'http://todo.alocashfintech.com/api'
  },
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
}

module.exports = nextConfig
