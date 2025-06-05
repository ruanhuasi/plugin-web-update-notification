interface Options {
    /**
     * support 'git_commit_hash' | 'svn_revision_number' | 'pkg_version' | 'build_timestamp' | 'custom'
     * * if repository type is 'Git', default is 'git_commit_hash'
     * * if repository type is 'SVN', default is 'svn_revision_number'
     * * if repository type is 'unknown', default is 'build_timestamp'
     * */
    versionType?: VersionType;
    /**
     * custom version, if versionType is 'custom', this option is required
     */
    customVersion?: string;
    /** polling interval(ms).
     * if set to 0, it will not polling
     * @default 10 * 60 * 1000
     */
    checkInterval?: number;
    /**
     * check update when window focus
     * @default true
     */
    checkOnWindowFocus?: boolean;
    /**
     * check update immediately after page loaded
     * @default true
     */
    checkImmediately?: boolean;
    /**
     * check update when load js file error
     * @default true
     */
    checkOnLoadFileError?: boolean;
    /**
     * whether to output version in console
     *
     * you can also pass a function to handle the version
     * ```ts
     * logVersion: (version) => {
     *  console.log(`version: %c${version}`, 'color: #1890ff') // this is the default behavior
     * }
     * ```
     * @default true
     */
    logVersion?: boolean | ((version: string) => void);
    /**
     * whether to silence the notification.
     * such as when local version is v1.0, you can set this option to true and build a new version v1.0.1, then the notification will not show
     */
    silence?: boolean;
    /**
     * @deprecated
     */
    customNotificationHTML?: string;
    /** notificationProps have higher priority than locale */
    notificationProps?: NotificationProps;
    notificationConfig?: NotificationConfig;
    /**
     * preset: zh_CN | zh_TW | en_US
     * @default 'zh_CN'
     * */
    locale?: string;
    /**
     * custom locale data
     * @link default data: https://github.com/GreatAuk/plugin-web-update-notification/blob/master/packages/core/src/locale.ts
     */
    localeData?: LocaleData;
    /**
     * Whether to hide the default notification, if you set it to true, you need to custom behavior by yourself
     * ```ts
      document.body.addEventListener('plugin_web_update_notice', (e) => {
        const { version, options } = e.detail
        // write some code, show your custom notification and etc.
        alert('System update!')
      })
     * ```
     * @default false
     */
    hiddenDefaultNotification?: boolean;
    /**
     * Whether to hide the dismiss button
     * @default false
     */
    hiddenDismissButton?: boolean;
    /**
     * After version 1.2.0, you not need to set this option, it will be automatically detected from the base of vite config、publicPath of webpack config or publicPath of umi config
     *
     * Base public path for inject file, Valid values include:
     * * Absolute URL pathname, e.g. /foo/
     * * Full URL, e.g. https://foo.com/
     * * Empty string(default) or ./
     *
     * !!! Don't forget / at the end of the path
    */
    injectFileBase?: string;
    /**
     * check ModuleFederation main application version
     */
    moduleFederationList?: ModuleFederationApplication[];
}
interface ModuleFederationApplication {
    fileBase: string;
    name: string;
}
type VersionType = 'git_commit_hash' | 'svn_revision_number' | 'pkg_version' | 'build_timestamp' | 'custom';
interface NotificationConfig {
    /**
     * refresh button color
     * @default '#1677ff'
    */
    primaryColor?: string;
    /**
     * dismiss button color
     * @default 'rgba(0,0,0,.25)'
    */
    secondaryColor?: string;
    /** @default 'bottomRight' */
    placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}
interface NotificationProps {
    title?: string;
    description?: string;
    /** refresh button text */
    buttonText?: string;
    /** dismiss button text */
    dismissButtonText?: string;
}
type LocaleData = Record<string, NotificationProps>;

declare global {
  interface Window {
    /** version number */
    pluginWebUpdateNotice_version: string
    /**
     * don't call this function in manual。
     */
    __checkUpdateSetup__: (options: Options) => void
    pluginWebUpdateNotice_: {
      locale?: string;
      /**
       * set language.
       * preset: zh_CN、zh_TW、en_US
      */
      setLocale: (locale: string) => void
      /**
       * manual check update, a function wrap by debounce(5000ms)
       */
      checkUpdate: () => void
      /** dismiss current update and close notification, same behavior as dismiss the button */
      dismissUpdate: () => void
      /** close notification */
      closeNotification: () => void
      /**
       * refresh button click event, if you set it, it will cover the default event (location.reload())
       */
      onClickRefresh?: (version: string) => void
      /**
       * dismiss button click event, if you set it, it will cover the default event (dismissUpdate())
       */
      onClickDismiss?: (version: string) => void
    }
  }
  interface GlobalEventHandlersEventMap {
    plugin_web_update_notice: CustomEvent<{ version: string; options: Options }>;
  }
}

declare const DIRECTORY_NAME = "pluginWebUpdateNotice";
declare const JSON_FILE_NAME = "web_version_by_plugin";
declare const INJECT_STYLE_FILE_NAME = "webUpdateNoticeInjectStyle";
/** .global is iife suffix */
declare const INJECT_SCRIPT_FILE_NAME = "webUpdateNoticeInjectScript.global";
declare const CUSTOM_UPDATE_EVENT_NAME = "plugin_web_update_notice";
declare const NOTIFICATION_ANCHOR_CLASS_NAME = "plugin-web-update-notice-anchor";
/** refresh button class name */
declare const NOTIFICATION_REFRESH_BTN_CLASS_NAME = "plugin-web-update-notice-refresh-btn";
/** dismiss button class name */
declare const NOTIFICATION_DISMISS_BTN_CLASS_NAME = "plugin-web-update-notice-dismiss-btn";
declare const LOCAL_STORAGE_PREFIX = "web_update_check_dismiss_version_";
declare const NOTIFICATION_POSITION_MAP: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
};

declare const pkgName: string;
/**
 * It returns the directory name of the current file.
 * @returns __dirname
 */
declare function get__Dirname(): string;
/**
 * The function returns the first 8 characters of the MD5 hash of a given string.
 * @param {string} fileString - a string that represents the content of a file.
 * @returns the first 8 characters of the MD5 hash of the file
 */
declare function getFileHash(fileString: string): string;
/**
 * It returns the version of the host project's package.json file
 * @returns The version of the package.json file in the root of the project.
 */
declare function getHostProjectPkgVersion(): string;
/**
 * If the current directory is a git repository, return the current commit hash
 * @returns The git commit hash of the current branch.
 */
declare function getGitCommitHash(): string;
/**
 * get SVN revision number
 * @returns The SVN revision number.
 */
declare function getSVNRevisionNumber(): string;
/**
 * It returns the current timestamp
 * @returns The current time in milliseconds.
 */
declare function getTimestamp(): string;
declare function getCustomVersion(version?: string): string;
/**
 * It returns the version of the current project.
 * @param {VersionType} [versionType=git_commit_hash] - The version type
 * @param {string} [customVersion] - The custom version
 * @returns The version by the plugin.
 */
declare function getVersion(): string;
declare function getVersion(versionType: 'custom', customVersion: string): string;
declare function getVersion(versionType: Exclude<VersionType, 'custom'>): string;
/**
 * generate json file content for version
 * @param {string} version - git commit hash or packaging time
 * @returns A string
 */
declare function generateJSONFileContent(version: string, silence?: boolean): string;
declare function generateJsFileContent(fileSource: string, version: string, options: Options): string;
declare function logVersionDefault(version: string, releaseTime: number): void;

export { CUSTOM_UPDATE_EVENT_NAME, DIRECTORY_NAME, INJECT_SCRIPT_FILE_NAME, INJECT_STYLE_FILE_NAME, JSON_FILE_NAME, LOCAL_STORAGE_PREFIX, NOTIFICATION_ANCHOR_CLASS_NAME, NOTIFICATION_DISMISS_BTN_CLASS_NAME, NOTIFICATION_POSITION_MAP, NOTIFICATION_REFRESH_BTN_CLASS_NAME, Options, generateJSONFileContent, generateJsFileContent, getCustomVersion, getFileHash, getGitCommitHash, getHostProjectPkgVersion, getSVNRevisionNumber, getTimestamp, getVersion, get__Dirname, logVersionDefault, pkgName };
