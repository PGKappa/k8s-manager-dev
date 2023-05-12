const { patchWebpackConfig } = require('next-global-css')
const webpackNodeExternals = require('webpack-node-externals')

module.exports = {
  // output: 'standalone',
  distDir: '../.next',
  assetPrefix: "/manager",
  basePath: "/manager",
  swcMinify: false, // added for the minifying react-joyride and giving the issue of undefined "o"
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
  },
  env: {
    PG_UI__PGV__ICONS_PUBLISH_PATH: "/var/www/public/assets",
    PG_UI__PGV__ICONS_PUBLIC_PATH: "/manager",
    FRONTEND_VERSION: "3.0.28",
  },
  reactStrictMode: true,
  webpack: (config, options) => {
    patchWebpackConfig(config, options)

    if (options.isServer) {
      config.externals = webpackNodeExternals({
        allowlist: [/@pg-ui/],
      })
    }

    return config
  }, 
}
