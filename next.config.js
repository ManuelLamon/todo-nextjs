/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com',"placeimg.com",'127.0.0.1'],
  },
  reactStrictMode: false,
  env: {
    API: 'http://127.0.0.1:8090',
  },
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
}

module.exports = nextConfig
