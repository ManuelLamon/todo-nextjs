/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com',"placeimg.com",'192.168.3.140'],
  },
  reactStrictMode: false,
  env: {
    API: 'http://192.168.3.140:8090',
  },
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
}

module.exports = nextConfig
