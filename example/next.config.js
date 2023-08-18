/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true
    },
    images: {
        domains: ['picsum.photos'],
        deviceSizes: [640, 1080, 1920, 3840]
    }

}

module.exports = nextConfig