const mix = require("laravel-mix");
// const LiveReloadPlugin = require('webpack-livereload-plugin');
const TerserPlugin = require("terser-webpack-plugin");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */
// for prod mix.js("frontend/index.tsx", "public/manager-assets/js")
// for dev mix.js("frontend/index.tsx", "public/js")
const isProduction = mix.inProduction();
mix.webpackConfig((webpack) => {
  return {
    plugins: [
      new webpack.EnvironmentPlugin({
        MODE: "development",
        DEBUG: false,
        PG_UI__PGV__ICONS_PUBLIC_PATH:
        "/manager-assets/images"
      }),
    ],
  };
});

mix
  .js("frontend/index.tsx", "manager-assets/js")
  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx", ".png"],
    },
    // optimization: {
    //   minimize: true,
    //   minimizer: [
    //     new TerserPlugin({
    //       parallel: true,
    //       terserOptions: {
    //         mangle: true,
    //         format: {
    //           comments: false,
    //         },
    //         compress: {
    //           drop_console: isProduction,
    //           unsafe_math: isProduction,
    //           keep_fargs: !isProduction,
    //           typeofs: !isProduction,
    //           dead_code: !isProduction,
    //         },
    //       },
    //       extractComments: false,
    //     }),
    //   ],
    // },
  })
  .options({ assetModules: true });

