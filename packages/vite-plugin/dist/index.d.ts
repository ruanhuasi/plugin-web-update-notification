import { Plugin } from 'vite';
import { Options } from '@plugin-ofs-web-update-notification/core';

declare function webUpdateNotice(options?: Options): Plugin;

export { webUpdateNotice };
