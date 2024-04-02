const { WebUpdateNotificationPlugin } = require('@plugin-ofs-web-update-notification/webpack')
const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

const getRemotePromise = (url, name) => {
  return `promise new Promise(resolve => {
    // This part depends on how you plan on hosting and versioning your federated modules
    const remoteUrlWithVersion = '${url}.js?v=' + Date.now()
    const script = document.createElement('script')
    script.src = remoteUrlWithVersion
    script.onload = () => {
      // the injected script has loaded and is available on window
      // we can now resolve this Promise
      const proxy = {
        get: (request) => window.${name}.get(request),
        init: (arg) => {
          try {
            return window.${name}.init(arg)
          } catch(e) {
            console.log('remote container already initialized')
          }
        }
      }
      resolve(proxy)
    }
    // inject this script with the src set to the versioned remoteEntry.js
    document.head.appendChild(script);
  })
  `
}
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new WebUpdateNotificationPlugin({
        logVersion: true,
        locale: 'en_US',
      }),
      new ModuleFederationPlugin({
        name: 'app1',
        filename: 'app1.js',
        remotes: {
          // 供应商端
          // app2: getRemotePromise(
          //   'http://localhost:4177/remoteEntry',
          //   'app2',
          // ),
          app2: 'app2@http://localhost:4177/remoteEntry.js',
        },
      }),
    ],
  },
})
