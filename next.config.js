/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ik.imagekit.io',
            port: '',
            pathname: '/5is75rwdb/**',
          },
        ],
      },
}

module.exports = nextConfig
