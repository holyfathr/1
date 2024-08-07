const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
const { i18n } = require("./next-i18next.config")

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    domains: ["storage.yandexcloud.net"],
  },
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  i18n,
})