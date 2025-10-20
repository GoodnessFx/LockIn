const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');
const fs = require('node:fs');
const { FileStore } = require('metro-cache');
const { reportErrorToRemote } = require('./__create/report-error-to-remote');
const {
  handleResolveRequestError,
  VIRTUAL_ROOT,
  VIRTUAL_ROOT_UNRESOLVED,
} = require('./__create/handle-resolve-request-error');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Improve Hermes compatibility
config.transformer = {
  ...config.transformer,
  hermesParser: true,
  minifierConfig: {
    ...config.transformer.minifierConfig,
    keep_fnames: true,
    mangle: {
      keep_fnames: true,
    },
  },
};

const NATIVE_ALIASES = {
  './Libraries/Components/TextInput/TextInput': path.resolve(
    __dirname,
    './polyfills/native/texinput.native.jsx'
  ),
};

const SHARED_ALIASES = {
  'expo-image': path.resolve(__dirname, './polyfills/shared/expo-image.tsx'),
};

// Ensure virtual root directories exist
try {
  if (!fs.existsSync(VIRTUAL_ROOT)) {
    fs.mkdirSync(VIRTUAL_ROOT, { recursive: true });
  }
  if (!fs.existsSync(VIRTUAL_ROOT_UNRESOLVED)) {
    fs.mkdirSync(VIRTUAL_ROOT_UNRESOLVED, { recursive: true });
  }
} catch (err) {
  console.warn('Warning: Failed to create virtual root folders', err.message);
}

config.watchFolders = [...config.watchFolders, VIRTUAL_ROOT, VIRTUAL_ROOT_UNRESOLVED];

// Add native-specific alias configuration through resolveRequest
config.resolver.resolveRequest = (context, moduleName, platform) => {
  try {
    if (
      context.originModulePath.startsWith(`${__dirname}/polyfills/native`) ||
      context.originModulePath.startsWith(`${__dirname}/polyfills/shared`)
    ) {
      return context.resolveRequest(context, moduleName, platform);
    }

    if (moduleName.startsWith('@expo-google-fonts/') && moduleName !== '@expo-google-fonts/dev') {
      return context.resolveRequest(context, '@expo-google-fonts/dev', platform);
    }

    if (SHARED_ALIASES[moduleName] && !moduleName.startsWith('./polyfills/')) {
      return context.resolveRequest(context, SHARED_ALIASES[moduleName], platform);
    }

    if (NATIVE_ALIASES[moduleName] && !moduleName.startsWith('./polyfills/')) {
      return context.resolveRequest(context, NATIVE_ALIASES[moduleName], platform);
    }

    return context.resolveRequest(context, moduleName, platform);
  } catch (error) {
    return handleResolveRequestError({ error, context, platform, moduleName });
  }
};

const cacheDir = path.join(__dirname, 'caches');

config.cacheStores = () => [
  new FileStore({
    root: path.join(cacheDir, '.metro-cache'),
  }),
];

config.resetCache = false;

config.reporter = {
  ...config.reporter,
  update: (event) => {
    config.reporter?.update(event);
    const reportableErrors = [
      'error',
      'bundling_error',
      'cache_read_error',
      'hmr_client_error',
      'transformer_load_failed',
    ];
    for (const errorType of reportableErrors) {
      if (event.type === errorType) {
        reportErrorToRemote({ error: event.error }).catch(() => {});
      }
    }
    return event;
  },
};

module.exports = config;
