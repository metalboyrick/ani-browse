/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
        'graphql.anilist.co',
        's4.anilist.co'
    ]
  }
}

module.exports = nextConfig;
