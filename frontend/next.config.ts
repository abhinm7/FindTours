// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  turbo: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
