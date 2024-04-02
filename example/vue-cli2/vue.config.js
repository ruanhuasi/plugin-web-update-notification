const { WebUpdateNotificationPlugin } = require('@plugin-ofs-web-update-notification/webpack')
const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new WebUpdateNotificationPlugin({
        logVersion: true,
        locale: 'en_US',
      }),
      new ModuleFederationPlugin({
        name: 'app2', // 模块名称
        filename: 'remoteEntry.js',
        exposes: {
          './HelloWorld': './src/components/HelloWorld.vue',
        },
      }),
    ],
  },
})
