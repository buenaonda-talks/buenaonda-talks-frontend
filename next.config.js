const { withSentryConfig } = require('@sentry/nextjs');

const { protocol, hostname, port, pathname } = new URL(
    process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
);

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                // protocol: protocol.slice(0, -1),
                hostname,
                // port,
                // pathname: `${pathname}/**`,
            },
            {
                protocol: 'https',
                hostname: 'secure.gravatar.com',
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    rewrites: async () => [
        {
            source: '/graphql',
            destination: `${process.env.API_HOST}/graphql`,
        },
        {
            source: '/admin',
            destination: `${process.env.API_HOST}/admin`,
        },
        {
            source: '/admin/login',
            destination: `${process.env.API_HOST}/admin/login`,
        },
    ],
};

module.exports = nextConfig;

// Injected content via Sentry wizard below
// module.exports = withSentryConfig(
//     nextConfig,
//     {
//         // For all available options, see:
//         // https://github.com/getsentry/sentry-webpack-plugin#options

//         // Suppresses source map uploading logs during build
//         silent: true,
//         org: 'ignacio-guzman',
//         project: 'javascript-nextjs',
//     },
//     {
//         // For all available options, see:
//         // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

//         // Upload a larger set of source maps for prettier stack traces (increases build time)
//         widenClientFileUpload: true,

//         // Transpiles SDK to be compatible with IE11 (increases bundle size)
//         transpileClientSDK: true,

//         // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
//         tunnelRoute: '/monitoring',

//         // Hides source maps from generated client bundles
//         hideSourceMaps: true,

//         // Automatically tree-shake Sentry logger statements to reduce bundle size
//         disableLogger: true,

//         // Enables automatic instrumentation of Vercel Cron Monitors.
//         // See the following for more information:
//         // https://docs.sentry.io/product/crons/
//         // https://vercel.com/docs/cron-jobs
//         automaticVercelMonitors: true,
//     },
// );
