const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');
const withImages = require('next-images');

const nextConfig = {
  publicRuntimeConfig: {
    // baseUrl: process.env.SERVER_ADDRESS || 'https://sit.kian.digital',
    // analyticId: process.env.ANALYTIC_ID,
    // auth: {
    //   clientId: process.env.AUTH_CLIENT_ID || 'login-app',
    //   baseUrl:
    //     process.env.AUTH_BASEURL ||
    //     'https://keycloak-crm.sit.kian.digital/auth/realms/master/protocol/openid-connect',
    // },
    // sentryDsn: process.env.SENTRY_DSN,
  },
};

const lessNextConfig = {
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      loader: 'file-loader',
      options: {
        outputPath: 'images',
      },
    });
    return config;
  }
};
const sassNextConfig = {
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: '[path]___[local]___[hash:base64:5]',
  }
};
module.exports = withPlugins([
  [withLess, lessNextConfig],
  [withSass, sassNextConfig],
  [withImages],
], nextConfig);
