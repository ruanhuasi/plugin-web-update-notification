import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import WebUpdateNotificationPlugin from '@plugin-ofs-web-update-notification/rspack';

export default defineConfig({
  plugins: [pluginVue()],
  tools: {
    rspack: (originalConfig, { rspack }) => {
      const config = { ...originalConfig }
      config.plugins?.push(new WebUpdateNotificationPlugin({
        logVersion: true,
        versionType: 'build_timestamp',
        injectFileBase: '/',
      }));
      return config;
    },
  }
});
