/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n:{
    defaultLocale: "cs",
    locales: ["cs"]
  }
}

module.exports = nextConfig
