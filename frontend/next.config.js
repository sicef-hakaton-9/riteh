/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: [
      "cdn.weatherapi.com",
      "www.shutterstock.com",
      "m.hak.hr",
      "sicef-hackathon-tickets.s3.eu-central-1.amazonaws.com"
    ]
  },
  reactStrictMode: false
};
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts"
);

module.exports = withNextIntl(nextConfig);
