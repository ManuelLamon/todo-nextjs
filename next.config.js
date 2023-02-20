/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com',"placeimg.com"],
  },
  reactStrictMode: false,
  env: {
    API: 'http://127.0.0.1:8090',
  },
}

module.exports = nextConfig
