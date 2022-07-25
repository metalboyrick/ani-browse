/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

const nextConfig = withPWA(
    {
        reactStrictMode: true,
        swcMinify: true,
        images: {
          domains: [
              's4.anilist.co'
          ]
        },
        pwa:  {
            dest: "public",
            register: true,
            skipWaiting: true,
        }
    }
);

module.exports = nextConfig;
