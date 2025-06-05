import { Options } from '@plugin-ofs-web-update-notification/core';
import { Compiler } from '@rspack/core';

type PluginOptions = Options & {
    /** index.html file path, by default, we will look up path.resolve(webpackOutputPath, './index.html') */
    indexHtmlFilePath?: string;
};
declare class WebUpdateNotificationPlugin {
    options: PluginOptions;
    constructor(options: PluginOptions);
    apply(compiler: Compiler): void;
}

export { WebUpdateNotificationPlugin };
