const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    output: 'export',
    env: {
        NEXT_PUBLIC_I18N: i18n,
    },
    images: { unoptimized: true },
};

module.exports = nextConfig;
