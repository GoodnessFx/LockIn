const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Reduce worker processes to avoid spawn UNKNOWN issues on some Windows setups
config.maxWorkers = 1;

module.exports = config;
